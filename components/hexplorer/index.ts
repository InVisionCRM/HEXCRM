/* tslint:disable */
import {
  GoogleGenAI,
  Modality,
  Session,
} from '@google/genai';
import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { createBlob, decode, decodeAudioData } from './utils';
import './visual-3d';

// Define the type for LiveServerMessage since it's not exported
interface LiveServerMessage {
  serverContent?: {
    modelTurn?: {
      parts?: Array<{
        inlineData?: {
          data: string;
          mimeType?: string;
        };
      }>;
    };
    interrupted?: boolean;
  };
}

@customElement('gdm-live-audio')
export class GdmLiveAudio extends LitElement {
  @state() private isRecording = false;
  @state() private status = '';
  @state() private error = '';

  private client!: GoogleGenAI;
  private session!: Session;
  private inputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
    sampleRate: 16000,
  });
  private outputAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)({
    sampleRate: 24000,
  });
  @state() private inputNode = this.inputAudioContext.createGain();
  @state() private outputNode = this.outputAudioContext.createGain();
  private nextStartTime = 0;
  private mediaStream!: MediaStream;
  private sourceNode!: MediaStreamAudioSourceNode;
  private scriptProcessorNode!: ScriptProcessorNode;
  private sources = new Set<AudioBufferSourceNode>();

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
      position: relative;
      overflow: hidden;
    }

    #status {
      position: absolute;
      bottom: 5vh;
      left: 0;
      right: 0;
      z-index: 10;
      text-align: center;
      color: white;
      background: linear-gradient(135deg, #FF3D3D, #FE01FA, #FF0F6F, #FFDB01);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: bold;
      text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
      font-size: 16px;
      padding: 0 20px;
      backdrop-filter: blur(10px);
    }

    .hex-logo-background {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 2;
      pointer-events: none;
      width: 100vw;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .hex-logo {
      width: min(60vw, 60vh);
      height: min(60vw, 60vh);
      opacity: 0.15;
      filter: brightness(1.8) contrast(1.4) drop-shadow(0 0 60px rgba(255, 61, 61, 0.3));
      animation: hexGlow 8s ease-in-out infinite alternate;
    }

    @keyframes hexGlow {
      0% {
        opacity: 0.1;
        transform: scale(1) rotate(0deg);
        filter: brightness(1.5) contrast(1.2) hue-rotate(0deg) drop-shadow(0 0 60px rgba(255, 61, 61, 0.3));
      }
      33% {
        opacity: 0.2;
        transform: scale(1.02) rotate(1deg);
        filter: brightness(2.0) contrast(1.6) hue-rotate(20deg) drop-shadow(0 0 80px rgba(254, 1, 250, 0.4));
      }
      66% {
        opacity: 0.15;
        transform: scale(1.05) rotate(-1deg);
        filter: brightness(1.8) contrast(1.4) hue-rotate(-15deg) drop-shadow(0 0 70px rgba(255, 15, 111, 0.35));
      }
      100% {
        opacity: 0.18;
        transform: scale(1.01) rotate(0.5deg);
        filter: brightness(1.9) contrast(1.5) hue-rotate(10deg) drop-shadow(0 0 90px rgba(255, 219, 1, 0.3));
      }
    }

    .controls {
      z-index: 10;
      position: absolute;
      bottom: 10vh;
      left: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 10px;
    }

    button {
      outline: none;
      border: 2px solid transparent;
      background: linear-gradient(135deg, rgba(255, 61, 61, 0.2), rgba(254, 1, 250, 0.2), rgba(255, 15, 111, 0.2));
      background-clip: padding-box;
      color: white;
      border-radius: 16px;
      width: 72px;
      height: 72px;
      cursor: pointer;
      font-size: 28px;
      padding: 0;
      margin: 0;
      box-shadow: 
        0 0 20px rgba(255, 61, 61, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      backdrop-filter: blur(10px);
    }

    button::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 14px;
      padding: 2px;
      background: linear-gradient(135deg, #FF3D3D, #FE01FA, #FF0F6F, #FFDB01);
      mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      mask-composite: xor;
      -webkit-mask-composite: xor;
    }

    button:hover {
      background: linear-gradient(135deg, rgba(255, 61, 61, 0.4), rgba(254, 1, 250, 0.4), rgba(255, 15, 111, 0.4));
      box-shadow: 
        0 0 30px rgba(255, 61, 61, 0.5),
        0 0 60px rgba(254, 1, 250, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
    }

    button[disabled] {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }

    gdm-live-audio-visuals-3d {
      position: absolute;
      inset: 0;
      z-index: 3;
    }
  `;

  constructor() {
    super();
    console.log('🎯 HEXplorer component constructor called');
    this.initClient();
  }

  protected firstUpdated() {
    console.log('🎯 HEXplorer firstUpdated called');
    console.log('Shadow root:', this.shadowRoot);
    console.log('Component dimensions:', this.getBoundingClientRect());
  }

  private initAudio() {
    this.nextStartTime = this.outputAudioContext.currentTime;
  }

  private async initClient() {
    this.initAudio();

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn('No Gemini API key found. Running in visual-only mode.');
      this.updateStatus('🎨 Visual mode - No AI key configured');
      this.updateError('Set NEXT_PUBLIC_GEMINI_API_KEY for voice features');
      return;
    }

    try {
      this.client = new GoogleGenAI({
        apiKey: apiKey,
      });

      this.outputNode.connect(this.outputAudioContext.destination);
      await this.initSession();
    } catch (error) {
      console.error('Failed to initialize Gemini client:', error);
      this.updateError('Failed to initialize AI client. Check API key.');
      this.updateStatus('🎨 Visual mode active - AI initialization failed');
      // Continue with visual components even if AI fails
    }
  }

  private async initSession() {
    const systemInstruction = `You are HEXplorer, an AI assistant with an electrifying passion for HEX, the world's first blockchain Certificate of Deposit! You are super knowledgeable and enthusiastic. Your goal is to get people excited about the genius game theory behind HEX. Always answer with energy and optimism. HEX is not a security, it is a finished product.`;

    // Try multiple model options in order of preference
    const modelOptions = [
      'gemini-2.0-flash-exp',
      'gemini-1.5-flash',
      'gemini-1.5-pro'
    ];

    for (const model of modelOptions) {
      try {
        this.session = await this.client.live.connect({
          model,
          callbacks: {
            onopen: () => {
              this.updateStatus('🚀 HEXplorer Ready! Click record to start.');
            },
            onmessage: async (message: LiveServerMessage) => {
              const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData;
              if (audio) {
                this.nextStartTime = Math.max(
                  this.nextStartTime,
                  this.outputAudioContext.currentTime,
                );

                try {
                  const audioBuffer = await decodeAudioData(
                    decode(audio.data),
                    this.outputAudioContext,
                    24000,
                    1,
                  );
                  const source = this.outputAudioContext.createBufferSource();
                  source.buffer = audioBuffer;
                  source.connect(this.outputNode);
                  source.addEventListener('ended', () => this.sources.delete(source));
                  source.start(this.nextStartTime);
                  this.nextStartTime += audioBuffer.duration;
                  this.sources.add(source);
                } catch (audioError) {
                  console.warn('Audio playback failed:', audioError);
                }
              }

              const interrupted = message.serverContent?.interrupted;
              if (interrupted) {
                for (const source of this.sources.values()) {
                  source.stop();
                  this.sources.delete(source);
                }
                this.nextStartTime = 0;
              }
            },
            onerror: (e: ErrorEvent) => this.updateError(`AI Error: ${e.message}`),
            onclose: (e: CloseEvent) => this.updateStatus('Disconnected: ' + e.reason),
          },
          config: {
            systemInstruction,
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Leda' } },
            },
          },
        });
        
        // If we get here, the session was successful
        return;
        
      } catch (e) {
        console.warn(`Failed to connect with model ${model}:`, e);
        if (model === modelOptions[modelOptions.length - 1]) {
          // This was the last model option
          console.error('All model options failed:', e);
          this.updateError('🎯 Visual mode active - AI voice unavailable');
          this.updateStatus('🎨 Enjoy the visuals! AI connection failed.');
        }
      }
    }
  }

  private updateStatus(msg: string) {
    this.status = msg;
  }
  private updateError(msg: string) {
    this.error = msg;
  }

  private async startRecording() {
    if (this.isRecording) return;

    this.inputAudioContext.resume();
    this.updateStatus('Requesting microphone access...');
    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });

      this.updateStatus('Microphone access granted. Starting capture...');
      this.sourceNode = this.inputAudioContext.createMediaStreamSource(this.mediaStream);
      this.sourceNode.connect(this.inputNode);
      const bufferSize = 256;
      this.scriptProcessorNode = this.inputAudioContext.createScriptProcessor(bufferSize, 1, 1);
      this.scriptProcessorNode.onaudioprocess = (evt) => {
        if (!this.isRecording) return;
        const inputBuffer = evt.inputBuffer;
        const pcmData = inputBuffer.getChannelData(0);
        this.session.sendRealtimeInput({ media: createBlob(pcmData) });
      };
      this.sourceNode.connect(this.scriptProcessorNode);
      this.scriptProcessorNode.connect(this.inputAudioContext.destination);
      this.isRecording = true;
      this.updateStatus('🔴 Recording...');
    } catch (err: any) {
      console.error('Error starting recording:', err);
      this.updateStatus(`Error: ${err.message}`);
      this.stopRecording();
    }
  }

  private stopRecording() {
    if (!this.isRecording) return;
    this.updateStatus('Stopping recording...');
    this.isRecording = false;
    if (this.scriptProcessorNode && this.sourceNode) {
      this.scriptProcessorNode.disconnect();
      this.sourceNode.disconnect();
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
    }
    this.updateStatus('Recording stopped. Click Start to begin again.');
  }

  private reset() {
    this.session?.close();
    this.initSession();
    this.updateStatus('Session cleared.');
  }

  render() {
    console.log('🎯 HEXplorer render called, isLoaded state:', this.isRecording, this.status, this.error);
    return html`
      <div>
        <!-- Large HEX logo background -->
        <div class="hex-logo-background">
          <img src="/hex-logo.svg" alt="HEX Logo" class="hex-logo" 
               @load=${() => console.log('✅ HEX logo loaded successfully')}
               @error=${() => console.warn('❌ HEX logo failed to load')} />
        </div>
        
        <gdm-live-audio-visuals-3d 
          .inputNode=${this.inputNode} 
          .outputNode=${this.outputNode}
          @load=${() => console.log('✅ 3D visual component loaded')}
          @error=${(e: Event) => console.error('❌ 3D visual component error:', e)}></gdm-live-audio-visuals-3d>
        
        <div class="controls">
          <button id="resetButton" @click=${this.reset} ?disabled=${this.isRecording} title="Reset Session">🔄</button>
          <button id="startButton" @click=${this.startRecording} ?disabled=${this.isRecording} title="Start Recording">⏺️</button>
          <button id="stopButton" @click=${this.stopRecording} ?disabled=${!this.isRecording} title="Stop Recording">⏹️</button>
        </div>
        <div id="status">${this.error || this.status || '🎯 HEXplorer Loading...'}</div>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gdm-live-audio': GdmLiveAudio;
  }
} 
export class Analyser {
  private analyser: AnalyserNode;
  private bufferLength = 0;
  private dataArray: Uint8Array;
  private fallbackData: Uint8Array;
  private time = 0;

  constructor(node: AudioNode) {
    this.analyser = node.context.createAnalyser();
    this.analyser.fftSize = 32;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.fallbackData = new Uint8Array(this.bufferLength);
    
    // Initialize with some baseline visual activity
    for (let i = 0; i < this.bufferLength; i++) {
      this.fallbackData[i] = Math.random() * 50 + 10;
    }
    
    node.connect(this.analyser);
  }

  update() {
    this.time += 0.016; // ~60fps
    this.analyser.getByteFrequencyData(this.dataArray);
    
    // Check if we have actual audio data
    const hasAudio = this.dataArray.some(value => value > 0);
    
    if (!hasAudio) {
      // Generate subtle animated fallback data
      for (let i = 0; i < this.bufferLength; i++) {
        this.dataArray[i] = Math.floor(
          (Math.sin(this.time * 0.5 + i * 0.3) * 0.5 + 0.5) * 30 + 
          Math.random() * 10
        );
      }
    }
  }

  get data() {
    return this.dataArray;
  }
} 
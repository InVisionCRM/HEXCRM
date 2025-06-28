"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Bot,
  Send,
  User,
  Copy,
  RefreshCw,
  Sparkles,
  BookOpen,
  TrendingUp,
  Lock,
  Coins,
  Clock,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Zap,
  ShieldCheck,
  Calculator,
  BarChart3,
  ArrowLeft,
  Search,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  isLoading?: boolean
  grounded?: boolean
  searchQueries?: string[]
}

interface QuickQuestion {
  id: string
  question: string
  category: string
  icon: any
  description: string
}

export default function HexAIBot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `## Welcome to HEX AI Assistant

## My Knowledge Base
I have comprehensive understanding from:

**HEX Whitepaper** 
**HEX Audit by Coinfabrik** 
**HEX Finacial Audit by Coinfabrik** 
**HEX Smart Contract Full Code**
**Community Input from Reddit, Discord, Telegram, and more**

**PulseChain Network** *(pulsechain.com)*
• Lower fees & faster transactions 
• HEX integration benefits
• Network mechanics & features

## How Can I Help?
Ask me anything about HEX mechanics, staking strategies, or PulseChain benefits!`,
      timestamp: new Date(),
    },
  ])
  
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const quickQuestions: QuickQuestion[] = [
    {
      id: "what-is-hex",
      question: "HEX AI: What is HEX and how does it work?",
      category: "Basics",
      icon: HelpCircle,
      description: "Learn about HEX fundamentals and core mechanics"
    },
    {
      id: "staking-rewards",
      question: "HEX AI: How do HEX staking rewards work?",
      category: "Staking",
      icon: TrendingUp,
      description: "Understand staking mechanics and reward calculations"
    },
    {
      id: "claim-btc",
      question: "HEX AI: How do I claim HEX with my Bitcoin?",
      category: "Claiming",
      icon: Coins,
      description: "Learn about the BTC claiming process and bonuses"
    },
    {
      id: "pulsechain-benefits",
      question: "HEX AI: What are the benefits of HEX on PulseChain?",
      category: "PulseChain",
      icon: Zap,
      description: "Discover PulseChain advantages over Ethereum"
    },
    {
      id: "transform-lobbies",
      question: "HEX AI: What are Transform Lobbies?",
      category: "Advanced",
      icon: BarChart3,
      description: "Understand the ETH to HEX transformation process"
    },
    {
      id: "risks-security",
      question: "HEX AI: What are the risks and security considerations?",
      category: "Security",
      icon: ShieldCheck,
      description: "Learn about potential risks and how to stay safe"
    },
    {
      id: "calculate-returns",
      question: "HEX AI: How can I calculate my potential returns?",
      category: "Calculator",
      icon: Calculator,
      description: "Understand return calculations and projections"
    },
    {
      id: "unstaking-penalties",
      question: "HEX AI: What are the unstaking penalties?",
      category: "Staking",
      icon: Clock,
      description: "Learn about early and late unstaking consequences"
    }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question)
    sendMessage(question)
  }

  const sendMessage = async (messageText?: string) => {
    const text = messageText || inputMessage.trim()
    if (!text) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      timestamp: new Date(),
    }

    const loadingMessage: Message = {
      id: Date.now().toString() + "_loading",
      role: "assistant",
      content: "Analyzing your question with AI...",
      timestamp: new Date(),
      isLoading: true,
    }

    setMessages(prev => [...prev, userMessage, loadingMessage])
    setInputMessage("")
    setIsLoading(true)

    try {
      const response = await fetch('/api/hex-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      
      setMessages(prev => {
        const newMessages = prev.filter(msg => msg.id !== loadingMessage.id)
        return [...newMessages, {
          id: Date.now().toString(),
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
          grounded: data.grounded,
          searchQueries: data.searchQueries
        }]
      })
    } catch (error) {
      console.error('AI API Error:', error)
      setMessages(prev => {
        const newMessages = prev.filter(msg => msg.id !== loadingMessage.id)
        return [...newMessages, {
          id: Date.now().toString(),
          role: "assistant",
          content: "I apologize, but I'm experiencing technical difficulties. Please try again in a moment or check that your Gemini API key is properly configured.",
          timestamp: new Date(),
        }]
      })
    } finally {
      setIsLoading(false)
    }
  }



  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  // Custom component to render formatted AI responses
  const FormattedResponse = ({ content }: { content: string }) => {
    // Split content by lines and process each line
    const lines = content.split('\n')
    
    return (
      <div className="space-y-3">
        {lines.map((line, index) => {
          // Handle ## headings
          if (line.startsWith('##')) {
            const text = line.replace(/^##\s*/, '')
            return (
              <h3 key={index} className="text-xl font-bold text-slate-800 mt-4 mb-2">
                {text}
              </h3>
            )
          }
          
          // Handle regular lines with **bold** text
          if (line.trim()) {
            const parts = line.split(/(\*\*[^*]+\*\*)/)
            return (
              <p key={index} className="text-sm leading-relaxed">
                {parts.map((part, partIndex) => {
                  if (part.startsWith('**') && part.endsWith('**')) {
                    const boldText = part.replace(/\*\*/g, '')
                    return (
                      <span key={partIndex} className="text-base font-bold text-slate-900">
                        {boldText}
                      </span>
                    )
                  }
                  return <span key={partIndex}>{part}</span>
                })}
              </p>
            )
          }
          
          // Empty lines for spacing
          return <div key={index} className="h-2" />
        })}
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: "linear-gradient(135deg, #FF3D3D 0%, #FE01FA 25%, #FF0F6F 50%, #FFDB01 100%)"
      }}
    >
      {/* Animated gradient overlay */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: `
            linear-gradient(45deg, 
              #FF3D3D 0%, 
              #FE01FA 20%, 
              #FF0F6F 40%, 
              #FFDB01 60%, 
              #FF3D3D 80%, 
              #FE01FA 100%
            )`,
          backgroundSize: '400% 400%',
          animation: 'gradientShift 8s ease-in-out infinite'
        }}
      />
      
      {/* Floating orbs for extra visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #FE01FA 0%, transparent 70%)',
            top: '10%',
            left: '10%',
            animation: 'float 12s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #FFDB01 0%, transparent 70%)',
            top: '60%',
            right: '10%',
            animation: 'float 10s ease-in-out infinite reverse'
          }}
        />
        <div 
          className="absolute w-64 h-64 rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #FF0F6F 0%, transparent 70%)',
            bottom: '10%',
            left: '30%',
            animation: 'float 14s ease-in-out infinite'
          }}
        />
      </div>

      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-white hover:text-white/80">
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm">Back to CRM</span>
              </Link>
              <Separator orientation="vertical" className="h-6 bg-white/30" />
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">HEX AI Assistant</h1>
                  <p className="text-sm text-white/80">Powered by Gemini 1.5 • HEX Whitepaper Knowledge</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge className="bg-white/20 text-white border-white/30">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white/30 bg-white/10 hover:bg-white/20"
                asChild
              >
                <a href="https://hex.com/_assets/docs/HEX_whitepaper.pdf" target="_blank" rel="noopener noreferrer">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Whitepaper
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white/30 bg-white/10 hover:bg-white/20"
                asChild
              >
                <Link href="/hexplorer">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Launch HExplorer
                  <ExternalLink className="w-3 h-3 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)]">
          
          {/* Quick Questions Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Quick Questions
                </CardTitle>
                <CardDescription className="text-white/70">
                  Popular HEX topics to get you started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-20rem)]">
                  <div className="space-y-3">
                    {quickQuestions.map((item) => (
                      <Button
                        key={item.id}
                        variant="outline"
                        className="w-full h-auto p-3 text-left bg-white/5 border-white/20 hover:bg-white/10 text-white justify-start whitespace-normal"
                        onClick={() => handleQuickQuestion(item.question)}
                        disabled={isLoading}
                      >
                        <div className="flex items-start gap-3 w-full">
                          <item.icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium leading-tight whitespace-normal break-words">{item.question}</p>
                            <p className="text-xs text-white/60 mt-1">{item.category}</p>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-full bg-white/10 backdrop-blur-md border-white/20 flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="text-white flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-white" />
                  </div>
                  Chat with HEX AI
                </CardTitle>
                <CardDescription className="text-white/70">
                  Ask anything about HEX, staking, PulseChain, or cryptocurrency concepts
                </CardDescription>
              </CardHeader>
              
              {/* Messages */}
              <CardContent className="flex-1 flex flex-col min-h-0">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-6">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        {message.role === "assistant" && (
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                            {message.isLoading ? (
                              <RefreshCw className="w-4 h-4 text-white animate-spin" />
                            ) : (
                              <Bot className="w-4 h-4 text-white" />
                            )}
                          </div>
                        )}
                        
                        <div
                          className={`max-w-[80%] rounded-lg p-4 ${
                            message.role === "user"
                              ? "bg-white/20 text-white ml-auto"
                              : "bg-white/90 text-slate-800"
                          }`}
                        >
                          <div className="prose prose-sm max-w-none">
                            {message.isLoading ? (
                              <div className="flex items-center gap-2">
                                <RefreshCw className="w-4 h-4 animate-spin" />
                                <span>Analyzing your question...</span>
                              </div>
                            ) : message.role === "assistant" ? (
                              <FormattedResponse content={message.content} />
                            ) : (
                              <div className="whitespace-pre-wrap">{message.content}</div>
                            )}
                          </div>
                          
                          {!message.isLoading && (
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-current/20">
                              <div className="flex items-center gap-2">
                                <span className={`text-xs ${message.role === "user" ? "text-white/60" : "text-slate-500"}`}>
                                  {message.timestamp.toLocaleTimeString()}
                                </span>

                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className={`h-6 px-2 ${message.role === "user" ? "text-white/60 hover:text-white" : "text-slate-500 hover:text-slate-700"}`}
                                onClick={() => copyMessage(message.content)}
                              >
                                <Copy className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        {message.role === "user" && (
                          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
                
                {/* Input Area */}
                <div className="flex-shrink-0 mt-4 pt-4 border-t border-white/20">
                  <div className="flex gap-3">
                    <Textarea
                      ref={textareaRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask me anything about HEX, staking, PulseChain, or crypto concepts..."
                      className="flex-1 min-h-[44px] max-h-32 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 resize-none"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={() => sendMessage()}
                      disabled={!inputMessage.trim() || isLoading}
                      className="h-11 px-4 bg-white/20 hover:bg-white/30 text-white border-white/20"
                    >
                      {isLoading ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between mt-3 text-xs text-white/60">
                    <span>Press Enter to send, Shift+Enter for new line</span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Powered by Gemini 1.5
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Close content wrapper */}
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px) scale(1);
          }
          25% {
            transform: translateY(-20px) translateX(10px) scale(1.05);
          }
          50% {
            transform: translateY(0px) translateX(20px) scale(0.95);
          }
          75% {
            transform: translateY(20px) translateX(-10px) scale(1.02);
          }
        }
      `}</style>
    </div>
  )
} 
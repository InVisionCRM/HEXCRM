"use client"

import { DialogFooter } from "@/components/ui/dialog"
import { OnboardHexicanForm } from "@/components/onboard-hexican-form"
import { TermsOfService } from "@/components/terms-of-service"
import { ClientPortal } from "@/components/client-portal"

import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Users,
  DoorOpen,
  TrendingUp,
  Target,
  Calendar,
  Phone,
  MapPin,
  CheckCircle,
  AlertCircle,
  Plus,
  Search,
  AlertTriangle,
  Shield,
  Scale,
  Eye,
  EyeOff,
  Mail,
  Wallet,
  Zap,
  UserCheck,
  FileText,
  ExternalLink,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function HexCRM() {
  // Mobile detection
  const isMobile = useIsMobile()
  
  // Add privacy state
  const [showPrivateInfo, setShowPrivateInfo] = useState(false)
  const [showOnboardForm, setShowOnboardForm] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [termsAccepted, setTermsAccepted] = useState(false)
  
  // AI Objection Handling State
  const [objectionText, setObjectionText] = useState("")
  const [objectionResponse, setObjectionResponse] = useState("")
  const [isLoadingObjection, setIsLoadingObjection] = useState(false)

  // Mock data for demonstration
  const mockStats = {
    doorsKnocked: 1247,
    totalOnboards: 89,
    conversionRate: 7.1,
    activeHexicans: 156,
    weeklyGrowth: 12.5,
    avgDealSize: 2850,
  }

  // Update mockLeads to include email and wallet addresses
  const mockLeads = [
    {
      id: 1,
      name: "sarah",
      email: "sarah.johnson@email.com",
      address: "123 Maple St, Downtown",
      phone: "(555) 123-4567",
      wallet: "0x742d35Cc6634C0532925a3b8D4C9db96590c6C87",
      status: "interested",
      lastContact: "2024-01-15",
      stage: "education",
      objections: ["volatility", "complexity"],
      notes: "Showed interest in staking mechanism, needs more info about PulseChain",
    },
    {
      id: 2,
      name: "Mike? Loud dude from the bar",
      email: "mike.chen@email.com",
      address: "456 Oak Ave, Suburbs",
      phone: "(555) 234-5678",
      wallet: "0x8b6d35Cc6634C0532925a3b8D4C9db96590c4601",
      status: "onboarded",
      lastContact: "2024-01-14",
      stage: "completed",
      objections: [],
      notes: "Successfully onboarded with PulseChain wallet setup",
    },
    {
      id: 3,
      name: "Lisa",
      email: "lisa.rodriguez@email.com",
      address: "789 Pine Rd, Uptown",
      phone: "(555) 345-6789",
      wallet: "0xa4d235Cc6634C0532925a3b8D4C9db96590c4156",
      status: "follow-up",
      lastContact: "2024-01-13",
      stage: "objection-handling",
      objections: ["scam-concerns", "too-good-to-be-true"],
      notes: "Needs education about PulseChain benefits and lower fees",
    },
  ]

  // Privacy masking functions
  const maskName = (name: string) => {
    if (showPrivateInfo) return name
    const parts = name.split(" ")
    return parts[0]  // Just return the first part of the name
  }

  const maskEmail = (email: string) => {
    if (showPrivateInfo) return email
    return "***@***.***"
  }

  const maskPhone = (phone: string) => {
    if (showPrivateInfo) return phone
    return "(***) ***-****"
  }

  const maskAddress = (address: string) => {
    if (showPrivateInfo) return address
    return "*** ****** **, ****"
  }

  const maskWallet = (wallet: string) => {
    if (showPrivateInfo) return wallet
    return "0x********************************"
  }

  const statusColors = {
    interested: "bg-blue-500",
    onboarded: "bg-green-500",
    "follow-up": "bg-yellow-500",
    "not-interested": "bg-red-500",
  }

  const stageColors = {
    "initial-contact": "bg-purple-500",
    education: "bg-blue-500",
    "objection-handling": "bg-yellow-500",
    closing: "bg-orange-500",
    completed: "bg-green-500",
    lost: "bg-red-500",
  }

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [showDisclaimer, setShowDisclaimer] = useState(true)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [acceptedCompliance, setAcceptedCompliance] = useState(false)
  const [acceptedEducational, setAcceptedEducational] = useState(false)

  const canProceed = acceptedTerms && acceptedCompliance && acceptedEducational

  const handleDisclaimerAccept = () => {
    if (canProceed) {
      setShowDisclaimer(false)
      // Store acceptance in localStorage to avoid showing again
      localStorage.setItem("hex-crm-disclaimer-accepted", "true")
    }
  }

  // Handle AI objection response
  const handleObjectionSubmit = async () => {
    if (!objectionText.trim()) return
    
    setIsLoadingObjection(true)
    try {
      const response = await fetch('/api/hex-ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `I need help handling this objection from a prospect: "${objectionText}". Please provide a professional, educational response strategy with specific talking points to address their concerns about HEX and PulseChain.`
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get AI response')
      }

      const data = await response.json()
      setObjectionResponse(data.response)
    } catch (error) {
      console.error('Error getting objection response:', error)
      setObjectionResponse("I apologize, but I'm experiencing technical difficulties. Please try again in a moment or refer to our standard objection handling scripts above.")
    } finally {
      setIsLoadingObjection(false)
    }
  }

  const handleTermsAccept = () => {
    setTermsAccepted(true)
    localStorage.setItem("hex-crm-terms-accepted", "true")
  }

  useEffect(() => {
    // Check if disclaimer was already accepted
    const disclaimerAccepted = localStorage.getItem("hex-crm-disclaimer-accepted")
    const termsAcceptedStored = localStorage.getItem("hex-crm-terms-accepted")

    if (disclaimerAccepted === "true") {
      setShowDisclaimer(false)
    }

    if (termsAcceptedStored === "true") {
      setTermsAccepted(true)
    }
  }, [])

  const filteredLeads = mockLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.address.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || lead.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Legal Disclaimer Modal */}
      <Dialog open={showDisclaimer} onOpenChange={() => {}}>
        <DialogContent className={`${isMobile ? 'max-w-[95vw] max-h-[95vh] m-2' : 'max-w-2xl max-h-[90vh]'} overflow-y-auto`}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              Legal Disclaimer & Compliance Notice
            </DialogTitle>
            <DialogDescription className="text-base">
              Please read and acknowledge the following important legal information before using this CRM system.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Warning Section */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Scale className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-red-800 mb-2">IMPORTANT LEGAL WARNING</h3>
                  <p className="text-sm text-red-700 mb-3">
                    <strong>Selling cryptocurrency door-to-door is ILLEGAL</strong> in most jurisdictions and may
                    violate securities laws, consumer protection regulations, and licensing requirements.
                  </p>
                  <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                    <li>Do NOT sell crypto directly to individuals</li>
                    <li>Do NOT accept money in exchange for crypto</li>
                    <li>Do NOT act as a financial advisor or broker</li>
                    <li>Do NOT make investment promises or guarantees</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Legal Use Section */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">LEGAL ONBOARDING ACTIVITIES</h3>
                  <p className="text-sm text-green-700 mb-3">
                    This CRM is designed for <strong>educational onboarding</strong> where individuals make their own
                    independent decisions to purchase cryptocurrency through legitimate exchanges.
                  </p>
                  <ul className="text-sm text-green-700 space-y-1 list-disc list-inside">
                    <li>Provide educational information about HEX and PulseChain</li>
                    <li>Direct people to official resources (HEX.com, PulseChain.com)</li>
                    <li>Help them set up their own wallets</li>
                    <li>Guide them to legitimate exchanges like PulseX</li>
                    <li>Support their self-directed learning journey</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Compliance Requirements */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-800 mb-2">COMPLIANCE REQUIREMENTS</h3>
                  <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                    <li>You must comply with all local, state, and federal laws</li>
                    <li>Obtain proper licenses if required in your jurisdiction</li>
                    <li>Never provide financial advice without proper credentials</li>
                    <li>Maintain accurate records of all interactions</li>
                    <li>Respect "Do Not Solicit" lists and local ordinances</li>
                    <li>Always be truthful and transparent in communications</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Acknowledgment Checkboxes */}
            <div className="space-y-4 border-t pt-4">
              <h3 className="font-semibold text-slate-800">Required Acknowledgments:</h3>

              <div className="flex items-start space-x-3">
                <Checkbox id="terms" checked={acceptedTerms} onCheckedChange={setAcceptedTerms} />
                <label htmlFor="terms" className="text-sm text-slate-700 leading-relaxed">
                  I understand that <strong>selling cryptocurrency door-to-door is illegal</strong> and I will only use
                  this CRM for educational onboarding where individuals make their own independent purchasing decisions.
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox id="compliance" checked={acceptedCompliance} onCheckedChange={setAcceptedCompliance} />
                <label htmlFor="compliance" className="text-sm text-slate-700 leading-relaxed">
                  I will comply with all applicable laws, regulations, and licensing requirements in my jurisdiction and
                  will not provide financial advice without proper credentials.
                </label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox id="educational" checked={acceptedEducational} onCheckedChange={setAcceptedEducational} />
                <label htmlFor="educational" className="text-sm text-slate-700 leading-relaxed">
                  I acknowledge this CRM is for educational purposes only and I assume full responsibility for ensuring
                  my activities are legal and compliant in my area.
                </label>
              </div>
            </div>

            {/* Additional Warnings */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Disclaimer:</strong> This software is provided for educational purposes only. The developers are
                not responsible for any legal issues arising from misuse. Always consult with legal counsel before
                engaging in any cryptocurrency-related business activities.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              onClick={handleDisclaimerAccept}
              disabled={!canProceed}
              className={`w-full ${
                canProceed
                  ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                  : "bg-slate-300"
              }`}
            >
              {canProceed ? "I Acknowledge & Agree to Proceed" : "Please Accept All Terms Above"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Terms of Service Modal */}
      <TermsOfService isOpen={showTerms} onClose={() => setShowTerms(false)} onAccept={handleTermsAccept} />

      {/* Onboard HEXican Form */}
      <OnboardHexicanForm isOpen={showOnboardForm} onClose={() => setShowOnboardForm(false)} />

      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex ${isMobile ? 'flex-col space-y-3 py-4' : 'justify-between items-center h-16'}`}>
            <div className="flex items-center space-x-4">
              <Image src="/hex-logo.svg" alt="HEX Logo" width={40} height={40} className="w-10 h-10" />
              <div>
                <h1 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent`}>
                  HEX CRM
                </h1>
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-slate-600`}>Educational Onboarding Management - PulseChain Edition</p>
              </div>
            </div>
            <div className={`flex items-center ${isMobile ? 'flex-wrap gap-2' : 'gap-4'}`}>
              <Button
                variant="outline"
                size="sm"
                className={`${isMobile ? 'text-xs px-2' : 'text-xs'} text-blue-600 border-blue-300 hover:bg-blue-50`}
                asChild
              >
                <a href="https://hex.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  {isMobile ? 'HEX' : 'HEX.com'}
                </a>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={`${isMobile ? 'text-xs px-2' : 'text-xs'} text-purple-600 border-purple-300 hover:bg-purple-50`}
                asChild
              >
                <a href="https://pulsechain.com" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-3 h-3 mr-1" />
                  {isMobile ? 'PC' : 'PulseChain.com'}
                </a>
              </Button>
              <Button
                variant={showPrivateInfo ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPrivateInfo(!showPrivateInfo)}
                className={`${isMobile ? 'text-xs px-2' : 'text-xs'}`}
              >
                {showPrivateInfo ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                {isMobile ? '' : 'Privacy'}
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowDisclaimer(true)} className={`${isMobile ? 'text-xs px-2' : 'text-xs'}`}>
                <Shield className="w-3 h-3 mr-1" />
                {isMobile ? '' : 'Legal Info'}
              </Button>
              <Button
                variant="outline" 
                size="sm" 
                className={`${isMobile ? 'text-xs px-2' : 'text-xs'} bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 hover:from-blue-600 hover:to-purple-600`}
                asChild
              >
                <Link href="/hex_ai_bot">
                  <span className="text-xs mr-1">🤖</span>
                  {isMobile ? 'AI' : 'HEX AI'}
                </Link>
              </Button>
              <Button
                onClick={() => setShowOnboardForm(true)}
                className={`bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 ${isMobile ? 'text-xs px-3' : ''}`}
              >
                <Plus className="w-4 h-4 mr-2" />
                {isMobile ? 'Add' : 'Add HEXican'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className={`max-w-7xl mx-auto ${isMobile ? 'px-3 py-4' : 'px-4 sm:px-6 lg:px-8 py-8'}`}>
        {/* PulseChain Banner */}
        <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg">
          <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-center'} gap-3`}>
            <div className="flex items-center gap-3 flex-1">
              <Zap className="w-5 h-5 text-purple-600 flex-shrink-0" />
            <div className="flex-1">
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-purple-800`}>🎉 HEX is now on PulseChain!</p>
                <p className={`${isMobile ? 'text-xs' : 'text-xs'} text-purple-600`}>
                Faster transactions, lower fees, and better user experience. Guide your HEXicans to PulseChain.com and
                PulseX.com for the best HEX experience.
              </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className={`${isMobile ? 'w-full text-xs' : 'text-xs'} border-purple-300 text-purple-700 hover:bg-purple-100`}
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className={`grid ${isMobile ? 'grid-cols-2 gap-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6'} mb-8`}>
          <Card className="bg-gradient-to-br from-pink-500 to-pink-600 text-white">
            <CardHeader className={`${isMobile ? 'pb-1 px-3 pt-3' : 'pb-2'}`}>
              <CardTitle className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium opacity-90`}>Doors Knocked</CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? 'px-3 pb-3' : ''}>
              <div className={`flex items-center ${isMobile ? 'flex-col text-center' : ''}`}>
                <DoorOpen className={`${isMobile ? 'w-6 h-6 mb-1' : 'w-8 h-8 mr-3'} opacity-80`} />
                <div>
                  <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>{mockStats.doorsKnocked.toLocaleString()}</div>
                  <p className="text-xs opacity-80">This month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardHeader className={`${isMobile ? 'pb-1 px-3 pt-3' : 'pb-2'}`}>
              <CardTitle className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium opacity-90`}>Total Onboards</CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? 'px-3 pb-3' : ''}>
              <div className={`flex items-center ${isMobile ? 'flex-col text-center' : ''}`}>
                <CheckCircle className={`${isMobile ? 'w-6 h-6 mb-1' : 'w-8 h-8 mr-3'} opacity-80`} />
                <div>
                  <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>{mockStats.totalOnboards}</div>
                  <p className="text-xs opacity-80">HEXicans educated</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className={`${isMobile ? 'pb-1 px-3 pt-3' : 'pb-2'}`}>
              <CardTitle className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium opacity-90`}>Education Rate</CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? 'px-3 pb-3' : ''}>
              <div className={`flex items-center ${isMobile ? 'flex-col text-center' : ''}`}>
                <Target className={`${isMobile ? 'w-6 h-6 mb-1' : 'w-8 h-8 mr-3'} opacity-80`} />
                <div>
                  <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>{mockStats.conversionRate}%</div>
                  <p className="text-xs opacity-80">Door to education</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className={`${isMobile ? 'pb-1 px-3 pt-3' : 'pb-2'}`}>
              <CardTitle className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium opacity-90`}>Active HEXicans</CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? 'px-3 pb-3' : ''}>
              <div className={`flex items-center ${isMobile ? 'flex-col text-center' : ''}`}>
                <Users className={`${isMobile ? 'w-6 h-6 mb-1' : 'w-8 h-8 mr-3'} opacity-80`} />
                <div>
                  <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>{mockStats.activeHexicans}</div>
                  <p className="text-xs opacity-80">Learning journey</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardHeader className={`${isMobile ? 'pb-1 px-3 pt-3' : 'pb-2'}`}>
              <CardTitle className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium opacity-90`}>Weekly Growth</CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? 'px-3 pb-3' : ''}>
              <div className={`flex items-center ${isMobile ? 'flex-col text-center' : ''}`}>
                <TrendingUp className={`${isMobile ? 'w-6 h-6 mb-1' : 'w-8 h-8 mr-3'} opacity-80`} />
                <div>
                  <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>+{mockStats.weeklyGrowth}%</div>
                  <p className="text-xs opacity-80">New learners</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <CardHeader className={`${isMobile ? 'pb-1 px-3 pt-3' : 'pb-2'}`}>
              <CardTitle className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium opacity-90`}>Avg Education Value</CardTitle>
            </CardHeader>
            <CardContent className={isMobile ? 'px-3 pb-3' : ''}>
              <div className={`flex items-center ${isMobile ? 'flex-col text-center' : ''}`}>
                <div className={`${isMobile ? 'w-6 h-6 mb-1 text-base' : 'w-8 h-8 mr-3 text-lg'} opacity-80 flex items-center justify-center font-bold`}>📚</div>
                <div>
                  <div className={`${isMobile ? 'text-lg' : 'text-2xl'} font-bold`}>${mockStats.avgDealSize.toLocaleString()}</div>
                  <p className="text-xs opacity-80">Per onboard</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Legal Compliance Banner */}
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg">
          <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'items-center'} gap-3`}>
            <div className="flex items-center gap-3 flex-1">
              <Shield className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <div className="flex-1">
                <p className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-blue-800`}>Educational Onboarding Mode Active</p>
              <p className="text-xs text-blue-600">
                Remember: You're educating people about HEX and PulseChain, not selling crypto. They make their own
                independent decisions to purchase through PulseX.com.
              </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDisclaimer(true)}
              className={`${isMobile ? 'w-full text-xs' : 'text-xs'} border-blue-300 text-blue-700 hover:bg-blue-100`}
            >
              Review Legal Info
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pipeline" className="space-y-6">
          <TabsList className={`${isMobile ? 'grid grid-cols-2 gap-1 h-auto p-1' : 'grid w-full grid-cols-8'}`}>
            <TabsTrigger value="pipeline" className={isMobile ? 'text-xs py-2' : ''}>
              {isMobile ? 'Pipeline' : 'HEXican Pipeline'}
            </TabsTrigger>
            <TabsTrigger value="activities" className={isMobile ? 'text-xs py-2' : ''}>
              {isMobile ? 'Activities' : 'Daily Activities'}
            </TabsTrigger>
            <TabsTrigger value="objections" className={isMobile ? 'text-xs py-2' : ''}>
              {isMobile ? 'Objections' : 'Objection Tracker'}
            </TabsTrigger>
            <TabsTrigger value="rewards" className={isMobile ? 'text-xs py-2' : ''}>
              {isMobile ? 'Rewards' : 'SuperStake Rewards'}
            </TabsTrigger>
            <TabsTrigger value="internet-money" className={isMobile ? 'text-xs py-2' : ''}>
              {isMobile ? 'Gift HEX' : 'Gift HEX'}
            </TabsTrigger>
            <TabsTrigger value="spam" className={isMobile ? 'text-xs py-2' : ''}>
              {isMobile ? 'SPAM' : 'Follow-up SPAM'}
            </TabsTrigger>
            <TabsTrigger value="client-portal" className={isMobile ? 'text-xs py-2' : ''}>
              {isMobile ? 'Portal' : 'Onboard Portal'}
            </TabsTrigger>
            <TabsTrigger value="analytics" className={isMobile ? 'text-xs py-2' : ''}>
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pipeline" className="space-y-6">
            {/* Search and Filter */}
            <div className={`flex ${isMobile ? 'flex-col space-y-3' : 'flex-col sm:flex-row'} gap-4`}>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search HEXicans..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 ${isMobile ? 'text-base' : ''}`}
                />
              </div>
              <div className={`flex ${isMobile ? 'grid grid-cols-2 gap-2' : 'gap-2'}`}>
                <Button
                  variant={selectedStatus === "all" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("all")}
                  size={isMobile ? "sm" : "sm"}
                  className={isMobile ? 'text-xs' : ''}
                >
                  All
                </Button>
                <Button
                  variant={selectedStatus === "interested" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("interested")}
                  size={isMobile ? "sm" : "sm"}
                  className={isMobile ? 'text-xs' : ''}
                >
                  Interested
                </Button>
                <Button
                  variant={selectedStatus === "follow-up" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("follow-up")}
                  size={isMobile ? "sm" : "sm"}
                  className={isMobile ? 'text-xs' : ''}
                >
                  Follow-up
                </Button>
                <Button
                  variant={selectedStatus === "onboarded" ? "default" : "outline"}
                  onClick={() => setSelectedStatus("onboarded")}
                  size={isMobile ? "sm" : "sm"}
                  className={isMobile ? 'text-xs' : ''}
                >
                  Onboarded
                </Button>
              </div>
            </div>

            {/* HEXican Cards */}
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6'}`}>
              {filteredLeads.map((lead) => (
                <Card key={lead.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{lead.name}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="w-4 h-4 mr-1" />
                          {maskAddress(lead.address)}
                        </CardDescription>
                      </div>
                      <Badge className={`${statusColors[lead.status]} text-white`}>{lead.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-sm text-slate-600">
                      <Phone className="w-4 h-4 mr-2" />
                      {maskPhone(lead.phone)}
                    </div>

                    <div className="flex items-center text-sm text-slate-600">
                      <Mail className="w-4 h-4 mr-2" />
                      {maskEmail(lead.email)}
                    </div>

                    <div className="flex items-center text-sm text-slate-600">
                      <Wallet className="w-4 h-4 mr-2" />
                      <span className="font-mono text-xs">{maskWallet(lead.wallet)}</span>
                    </div>

                    <div className="flex items-center text-sm text-slate-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Last contact: {lead.lastContact}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">Stage:</span>
                      <Badge variant="outline" className={`${stageColors[lead.stage]} text-white border-0`}>
                        {lead.stage.replace("-", " ")}
                      </Badge>
                    </div>

                    {lead.objections.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-slate-700">Objections:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {lead.objections.map((objection, index) => (
                            <Badge key={index} variant="destructive" className="text-xs">
                              {objection.replace("-", " ")}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="bg-slate-50 p-3 rounded-lg">
                      <p className="text-sm text-slate-700">{lead.notes}</p>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" className="flex-1">
                        <Phone className="w-4 h-4 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        Schedule
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>Today's Educational Activities</CardTitle>
                <CardDescription>Track your educational outreach progress on PulseChain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <p className="font-medium">Educated: Sarah Johnson</p>
                        <p className="text-sm text-slate-600">
                          Learned about HEX on PulseChain - Set up PulseChain wallet
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-slate-500">2:30 PM</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center">
                      <DoorOpen className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <p className="font-medium">Educational visit: 789 Pine Rd</p>
                        <p className="text-sm text-slate-600">Lisa Rodriguez - Explained PulseChain benefits</p>
                      </div>
                    </div>
                    <span className="text-sm text-slate-500">1:15 PM</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex items-center">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
                      <div>
                        <p className="font-medium">Question answered: Sarah Johnson</p>
                        <p className="text-sm text-slate-600">
                          Explained PulseChain lower fees and directed to PulseX.com
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-slate-500">11:45 AM</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="objections">
            <div className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 lg:grid-cols-2 gap-6'}`}>
              <Card>
                <CardHeader>
                  <CardTitle>Common Objections</CardTitle>
                  <CardDescription>Track and prepare responses</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium">Richard Heart is a Scammer</span>
                      <Badge variant="destructive">31 times</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <span className="font-medium">It's a scam</span>
                      <Badge variant="destructive">23 times</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium">Too volatile</span>
                      <Badge className="bg-orange-500">18 times</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="font-medium">Too complex</span>
                      <Badge className="bg-yellow-500">15 times</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">No money to invest</span>
                      <Badge className="bg-blue-500">12 times</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Response Scripts</CardTitle>
                  <CardDescription>Proven responses to common objections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-800 mb-2">Richard Heart Character Attacks</h4>
                      <p className="text-sm text-green-700">
                        "I understand your concerns about the founder. However, HEX is a fully decentralized smart
                        contract on PulseChain. The code is open-source and audited. Once deployed, even Richard can't
                        change it. Judge the technology, not the person."
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-800 mb-2">Scam Concerns</h4>
                      <p className="text-sm text-green-700">
                        HEX is fully audited, open-source smart contract on PulseChain. You can verify everything on the
                        blockchain. Here's the contract address..."
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-800 mb-2">Volatility</h4>
                      <p className="text-sm text-blue-700">
                        That's exactly why HEX has staking - it rewards you for holding long-term and reduces volatility
                        through time-locked deposits. Plus, PulseChain offers lower fees for staking.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Objection Handling Assistant */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">AI</span>
                    </div>
                    AI Objection Handling Assistant
                  </CardTitle>
                  <CardDescription>
                    Get AI-powered responses to handle objections effectively and professionally
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Quick Objection Buttons */}
                  <div>
                    <h4 className="text-sm font-medium mb-3">Quick Objection Responses:</h4>
                    <div className={`grid ${isMobile ? 'grid-cols-1 gap-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs justify-start h-auto p-3 whitespace-normal"
                        onClick={() => {
                          const textarea = document.getElementById("objection-input") as HTMLTextAreaElement
                          if (textarea)
                            textarea.value =
                              "Someone told me Richard Heart is a scammer and HEX is a ponzi scheme. How do I respond?"
                        }}
                      >
                        <AlertTriangle className="w-3 h-3 mr-2 text-red-500 flex-shrink-0" />
                        <span className="break-words">Richard Heart Scammer Claims</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs justify-start h-auto p-3 whitespace-normal"
                        onClick={() => {
                          const textarea = document.getElementById("objection-input") as HTMLTextAreaElement
                          if (textarea)
                            textarea.value =
                              "They say HEX is just a ponzi scheme and not real crypto. What's my response?"
                        }}
                      >
                        <AlertCircle className="w-3 h-3 mr-2 text-orange-500 flex-shrink-0" />
                        <span className="break-words">Ponzi Scheme Accusations</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs justify-start h-auto p-3 whitespace-normal"
                        onClick={() => {
                          const textarea = document.getElementById("objection-input") as HTMLTextAreaElement
                          if (textarea)
                            textarea.value =
                              "The person says crypto is too risky and volatile for them. How do I address this?"
                        }}
                      >
                        <TrendingUp className="w-3 h-3 mr-2 text-yellow-500 flex-shrink-0" />
                        <span className="break-words">Volatility Concerns</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs justify-start h-auto p-3 whitespace-normal"
                        onClick={() => {
                          const textarea = document.getElementById("objection-input") as HTMLTextAreaElement
                          if (textarea)
                            textarea.value =
                              "They don't understand how HEX staking works and think it's too complicated. Help me explain."
                        }}
                      >
                        <Target className="w-3 h-3 mr-2 text-blue-500 flex-shrink-0" />
                        <span className="break-words">Complexity Objections</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs justify-start h-auto p-3 whitespace-normal"
                        onClick={() => {
                          const textarea = document.getElementById("objection-input") as HTMLTextAreaElement
                          if (textarea)
                            textarea.value =
                              "They say they don't have money to invest right now. What's the best approach?"
                        }}
                      >
                        <Users className="w-3 h-3 mr-2 text-green-500 flex-shrink-0" />
                        <span className="break-words">No Money to Invest</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs justify-start h-auto p-3 whitespace-normal"
                        onClick={() => {
                          const textarea = document.getElementById("objection-input") as HTMLTextAreaElement
                          if (textarea)
                            textarea.value =
                              "They heard negative things about HEX online and don't trust it. How do I build credibility?"
                        }}
                      >
                        <Shield className="w-3 h-3 mr-2 text-purple-500 flex-shrink-0" />
                        <span className="break-words">Trust & Credibility Issues</span>
                      </Button>
                    </div>
                  </div>

                  {/* AI Chat Interface */}
                  <div className={`border rounded-lg ${isMobile ? 'p-3' : 'p-4'} bg-gradient-to-br from-slate-50 to-blue-50`}>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="objection-input" className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium mb-2 block`}>
                          Describe the objection or situation:
                        </label>
                        <textarea
                          id="objection-input"
                          placeholder={isMobile ? "Describe the objection..." : "Example: The prospect says 'I heard Richard Heart is a scammer and HEX is just a ponzi scheme designed to make him rich. Why should I trust this?'"}
                          className={`w-full ${isMobile ? 'h-20 p-2 text-sm' : 'h-24 p-3 text-sm'} border rounded-lg resize-none`}
                          value={objectionText}
                          onChange={(e) => setObjectionText(e.target.value)}
                        />
                      </div>

                      <Button 
                        onClick={handleObjectionSubmit}
                        disabled={isLoadingObjection || !objectionText.trim()}
                        className={`w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 ${isMobile ? 'py-3 text-sm' : ''}`}
                      >
                        <div className="w-4 h-4 mr-2 bg-white rounded-full flex items-center justify-center">
                          <span className="text-purple-500 text-xs font-bold">AI</span>
                        </div>
                        {isLoadingObjection ? "Generating..." : "Generate Response"}
                      </Button>
                    </div>
                  </div>

                  {/* AI Response */}
                  {(objectionResponse || isLoadingObjection) && (
                  <div className="border rounded-lg p-4 bg-gradient-to-br from-green-50 to-blue-50">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-bold">AI</span>
                      </div>
                      <div className="flex-1">
                          <h4 className="font-medium text-slate-800 mb-2">
                            {isLoadingObjection ? "Generating AI Response..." : "AI Response:"}
                          </h4>
                          <div className="bg-white p-4 rounded-lg border text-sm">
                            {isLoadingObjection ? (
                              <div className="flex items-center justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                          </div>
                            ) : (
                              <div className="prose prose-sm max-w-none">
                                <div 
                                  className="text-slate-700"
                                  dangerouslySetInnerHTML={{
                                    __html: objectionResponse
                                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                      .replace(/##(.*?)(\n|$)/g, '<h3 class="text-lg font-bold mb-2">$1</h3>')
                                      .replace(/\n/g, '<br/>')
                                  }}
                                />
                          </div>
                            )}
                          </div>
                          {!isLoadingObjection && objectionResponse && (
                            <div className={`mt-3 flex ${isMobile ? 'flex-col space-y-2' : 'gap-2'}`}>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  navigator.clipboard.writeText(objectionResponse)
                                }}
                                className={isMobile ? 'w-full text-xs' : ''}
                              >
                                Copy Response
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  setObjectionText("")
                                  setObjectionResponse("")
                                }}
                                className={isMobile ? 'w-full text-xs' : ''}
                              >
                                Clear & New Question
                              </Button>
                          </div>
                          )}
                          </div>
                        </div>
                      </div>
                  )}

                  {/* Additional AI Features */}
                  <div className={`grid ${isMobile ? 'grid-cols-1 gap-3' : 'grid-cols-1 md:grid-cols-3 gap-4'}`}>
                    <Card className="p-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <Target className="w-6 h-6 text-purple-600" />
                        </div>
                        <h4 className="font-medium text-sm">Tone Analysis</h4>
                        <p className="text-xs text-slate-600 mt-1">
                          AI analyzes objection tone and suggests appropriate response style
                        </p>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <CheckCircle className="w-6 h-6 text-blue-600" />
                        </div>
                        <h4 className="font-medium text-sm">Success Rate</h4>
                        <p className="text-xs text-slate-600 mt-1">
                          Track which AI responses lead to successful conversions
                        </p>
                      </div>
                    </Card>

                    <Card className="p-4">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                          <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                        <h4 className="font-medium text-sm">Learning Mode</h4>
                        <p className="text-xs text-slate-600 mt-1">
                          AI learns from your successful responses to improve suggestions
                        </p>
                      </div>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
            </TabsContent>

            <TabsContent value="rewards" className="space-y-6">
              {/* SuperStake Balance Card */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">pSSH</span>
                      </div>
                      Your SuperStake Balance
                    </CardTitle>
                    <CardDescription className="text-white/80">
                      Earn SuperStake tokens based on your sales performance
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg">Current Balance:</span>
                        <span className="text-3xl font-bold">12,847 pSSH</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Minimum for Rewards:</span>
                        <span className="text-lg font-semibold">5,555 pSSH ✅</span>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span>Next HEX Distribution:</span>
                          <span className="font-bold">23 days</span>
                        </div>
                        <div className="w-full bg-white/20 rounded-full h-2">
                          <div className="bg-white h-2 rounded-full" style={{ width: "62%" }}></div>
                        </div>
                        <p className="text-xs mt-2 text-white/80">
                          Estimated reward: ~847 pHEX based on current stake pool
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Reward Tier</CardTitle>
                    <CardDescription>Your current performance level</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-2xl">🏆</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-yellow-600">Gold HEXican</h3>
                        <p className="text-sm text-slate-600">2.5x reward multiplier</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress to Diamond:</span>
                          <span>847/1000</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full"
                            style={{ width: "84.7%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Earning Opportunities */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Earning Opportunities</CardTitle>
                    <CardDescription>Ways to earn SuperStake tokens</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center">
                          <DoorOpen className="w-5 h-5 text-green-600 mr-3" />
                          <div>
                            <p className="font-medium">Door Knocked</p>
                            <p className="text-sm text-slate-600">Base reward</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500">+10 pSSH</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center">
                          <Users className="w-5 h-5 text-blue-600 mr-3" />
                          <div>
                            <p className="font-medium">HEXican Onboarded</p>
                            <p className="text-sm text-slate-600">Major milestone</p>
                          </div>
                        </div>
                        <Badge className="bg-blue-500">+500 pSSH</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="flex items-center">
                          <Target className="w-5 h-5 text-purple-600 mr-3" />
                          <div>
                            <p className="font-medium">Objection Overcome</p>
                            <p className="text-sm text-slate-600">Skill demonstration</p>
                          </div>
                        </div>
                        <Badge className="bg-purple-500">+25 pSSH</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="flex items-center">
                          <TrendingUp className="w-5 h-5 text-orange-600 mr-3" />
                          <div>
                            <p className="font-medium">Daily Streak</p>
                            <p className="text-sm text-slate-600">Consistency bonus</p>
                          </div>
                        </div>
                        <Badge className="bg-orange-500">+50 pSSH</Badge>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-yellow-600 mr-3" />
                          <div>
                            <p className="font-medium">Weekly Goal Hit</p>
                            <p className="text-sm text-slate-600">Performance bonus</p>
                          </div>
                        </div>
                        <Badge className="bg-yellow-500">+200 pSSH</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Multipliers</CardTitle>
                    <CardDescription>Boost your rewards with consistent performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Conversion Rate Bonus</span>
                          <Badge className="bg-green-500">Active</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">7.1% conversion rate</p>
                        <div className="text-lg font-bold text-green-600">+15% reward multiplier</div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Volume Leader</span>
                          <Badge className="bg-purple-500">Active</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">Top 3 this month</p>
                        <div className="text-lg font-bold text-purple-600">+25% reward multiplier</div>
                      </div>

                      <div className="p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg border border-dashed">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Perfect Week</span>
                          <Badge variant="outline">Locked</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">Hit all daily goals for 7 days</p>
                        <div className="text-lg font-bold text-slate-400">+50% reward multiplier</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Leaderboard and Achievements */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Leaderboard</CardTitle>
                    <CardDescription>Top performers this month</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                            1
                          </div>
                          <div>
                            <p className="font-medium">You</p>
                            <p className="text-sm text-slate-600">89 onboards</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-yellow-600">12,847 pSSH</div>
                          <div className="text-xs text-slate-500">This month</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-slate-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                            2
                          </div>
                          <div>
                            <p className="font-medium">Sarah M.</p>
                            <p className="text-sm text-slate-600">76 onboards</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-600">9,234 pSSH</div>
                          <div className="text-xs text-slate-500">This month</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold mr-3">
                            3
                          </div>
                          <div>
                            <p className="font-medium">Mike R.</p>
                            <p className="text-sm text-slate-600">68 onboards</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-orange-600">8,156 pSSH</div>
                          <div className="text-xs text-slate-500">This month</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Achievement Badges</CardTitle>
                    <CardDescription>Unlock special rewards and recognition</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="text-2xl mb-2">🎯</div>
                        <div className="text-xs font-medium text-green-700">First Onboard</div>
                        <div className="text-xs text-green-600">Unlocked</div>
                      </div>

                      <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="text-2xl mb-2">🔥</div>
                        <div className="text-xs font-medium text-blue-700">10 Day Streak</div>
                        <div className="text-xs text-blue-600">Unlocked</div>
                      </div>

                      <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                        <div className="text-2xl mb-2">💎</div>
                        <div className="text-xs font-medium text-purple-700">Diamond Hands</div>
                        <div className="text-xs text-purple-600">Unlocked</div>
                      </div>

                      <div className="text-center p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="text-2xl mb-2">👑</div>
                        <div className="text-xs font-medium text-yellow-700">Monthly King</div>
                        <div className="text-xs text-yellow-600">Unlocked</div>
                      </div>

                      <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="text-2xl mb-2 opacity-50">🚀</div>
                        <div className="text-xs font-medium text-slate-500">100 Onboards</div>
                        <div className="text-xs text-slate-400">89/100</div>
                      </div>

                      <div className="text-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="text-2xl mb-2 opacity-50">⚡</div>
                        <div className="text-xs font-medium text-slate-500">Speed Demon</div>
                        <div className="text-xs text-slate-400">Locked</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* SuperStake Protocol Info */}
              <Card>
                <CardHeader>
                  <CardTitle>SuperStake Protocol Information</CardTitle>
                  <CardDescription>Understanding your rewards system</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-red-50 rounded-lg">
                      <div className="text-3xl font-bold text-pink-600 mb-2">60 Days</div>
                      <div className="text-sm font-medium text-slate-700">Rolling HEX Stakes</div>
                      <div className="text-xs text-slate-600 mt-1">Automatic restaking for compound growth</div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
                      <div className="text-3xl font-bold text-green-600 mb-2">1%</div>
                      <div className="text-sm font-medium text-slate-700">HEX Distribution</div>
                      <div className="text-xs text-slate-600 mt-1">Of total stake + yield every 60 days</div>
                    </div>

                    <div className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg">
                      <div className="text-3xl font-bold text-yellow-600 mb-2">5,555</div>
                      <div className="text-sm font-medium text-slate-700">Minimum pSSH</div>
                      <div className="text-xs text-slate-600 mt-1">Required to receive HEX rewards</div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <h4 className="font-medium text-purple-800 mb-2">How It Works:</h4>
                    <ul className="text-sm text-purple-700 space-y-1">
                      <li>• Earn pSSH tokens through sales performance and activities</li>
                      <li>• Hold minimum 5,555 pSSH to qualify for HEX distributions</li>
                      <li>• Receive proportional share of HEX rewards every 60 days</li>
                      <li>• Higher performance = more pSSH = larger HEX rewards</li>
                      <li>• Rewards compound automatically through rolling stakes</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="internet-money" className="space-y-6">
              {/* HEX Balance Card */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold">HEX</span>
                      </div>
                      Gift HEX 
                    </CardTitle>
                    <CardDescription className="text-white/80">
                      Send HEX and create HEX Stakes instantly to anyone, anywhere on PulseChain
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-lg">Available HEX Balance:</span>
                        <span className="text-3xl font-bold">1,000,000 HEX</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>USD Value:</span>
                        <span className="text-lg font-semibold">~$Connect</span>
                      </div>
                      <div className="bg-white/10 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4 text-center">
                          <div>
                            <div className="text-2xl font-bold">47</div>
                            <div className="text-sm text-white/80">Transactions Sent</div>
                          </div>
                          <div>
                            <div className="text-2xl font-bold">12</div>
                            <div className="text-sm text-white/80">Stakes Created</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Fast HEX operations on PulseChain</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                      <Plus className="w-4 h-4 mr-2" />
                      Send HEX
                    </Button>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      <Target className="w-4 h-4 mr-2" />
                      Create Stake NFT
                    </Button>
                    <Button variant="outline" className="w-full">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View History
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Send HEX and Create Stake Forms */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">$</span>
                      </div>
                      Send HEX Instantly on PulseChain
                    </CardTitle>
                    <CardDescription>
                      Send HEX tokens to any PulseChain address - perfect for rewarding new HEXicans with ultra-low fees
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Recipient PulseChain Address</label>
                      <Input placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590c6C87" className="font-mono text-sm" />
                      <p className="text-xs text-slate-500">Enter the PulseChain address of the recipient</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Amount (HEX)</label>
                      <Input type="number" placeholder="1000" className="text-right" />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>Available: 1,247,589 HEX</span>
                        <span>~$100 USD</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Message (Optional)</label>
                      <Input placeholder="Welcome to HEX on PulseChain! 🎉" maxLength={50} />
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <div className="flex justify-between text-sm">
                        <span>PulseChain Network Fee:</span>
                        <span className="font-medium text-green-600">~$0.001</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Total Cost:</span>
                        <span className="font-bold">1000 HEX + $0.001</span>
                      </div>
                      <p className="text-xs text-green-600 mt-1">💡 Ultra-low fees on PulseChain!</p>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                      Send HEX Now
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">NFT</span>
                      </div>
                      Create & Send HEX Stake NFT on PulseChain
                    </CardTitle>
                    <CardDescription>
                      Create a HEX stake and send it as an NFT - the ultimate onboarding gift with minimal fees
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Recipient PulseChain Address</label>
                      <Input placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590c6C87" className="font-mono text-sm" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">HEX Amount to Stake</label>
                      <Input type="number" placeholder="5000" className="text-right" />
                      <p className="text-xs text-slate-500">Minimum 1000 HEX recommended for meaningful rewards</p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Stake Duration</label>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="text-xs">
                          1 Year
                          <div className="text-xs text-slate-500 ml-1">(+20%)</div>
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          2 Years
                          <div className="text-xs text-slate-500 ml-1">(+40%)</div>
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          5 Years
                          <div className="text-xs text-slate-500 ml-1">(+100%)</div>
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs">
                          Custom
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Custom Days (if selected)</label>
                      <Input type="number" placeholder="365" min="1" max="5555" />
                      <p className="text-xs text-slate-500">1-5555 days (15+ years max)</p>
                    </div>

                    <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Stake Amount:</span>
                          <span className="font-medium">5,000 HEX</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span className="font-medium">1 Year (365 days)</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Bonus Shares:</span>
                          <span className="font-medium text-green-600">+20% (1,000 shares)</span>
                        </div>
                        <div className="flex justify-between font-bold border-t pt-1">
                          <span>Total Shares:</span>
                          <span>6,000 shares</span>
                        </div>
                        <div className="flex justify-between text-xs text-green-600">
                          <span>PulseChain Fee:</span>
                          <span>~$0.002</span>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                      Create & Send Stake NFT
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Gift HEX Transactions</CardTitle>
                  <CardDescription>Your HEX sending and staking activity on PulseChain</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-xs font-bold">HEX</span>
                        </div>
                        <div>
                          <p className="font-medium">Sent 1,000 HEX</p>
                          <p className="text-sm text-slate-600">To: 0x742d...6C87</p>
                          <p className="text-xs text-slate-500">Welcome bonus for Sarah Johnson</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-green-600">-1,000 HEX</div>
                        <div className="text-xs text-slate-500">2 hours ago</div>
                        <Badge className="bg-green-500 text-xs">Confirmed</Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-xs font-bold">NFT</span>
                        </div>
                        <div>
                          <p className="font-medium">Created 5,000 HEX Stake NFT</p>
                          <p className="text-sm text-slate-600">To: 0x8b6d...4601</p>
                          <p className="text-xs text-slate-500">2-year stake for Mike? Loud dude from the bar</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-purple-600">-5,000 HEX</div>
                        <div className="text-xs text-slate-500">1 day ago</div>
                        <Badge className="bg-purple-500 text-xs">Staking</Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-xs font-bold">HEX</span>
                        </div>
                        <div>
                          <p className="font-medium">Sent 2,500 HEX</p>
                          <p className="text-sm text-slate-600">To: 0xa4d2...4156</p>
                          <p className="text-xs text-slate-500">Onboarding reward for Lisa Rodriguez</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-blue-600">-2,500 HEX</div>
                        <div className="text-xs text-slate-500">3 days ago</div>
                        <Badge className="bg-blue-500 text-xs">Confirmed</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                    <h4 className="font-medium text-yellow-800 mb-2">💡 Pro Tips for Gift HEX on PulseChain:</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• PulseChain fees are ~1000x cheaper than Ethereum - send HEX for pennies!</li>
                      <li>• Create stake NFTs as onboarding gifts - they earn yield while educating</li>
                      <li>• Use HEX sends to demonstrate the speed and low cost of PulseChain</li>
                      <li>• Stake NFTs can be transferred, making them perfect educational tools</li>
                      <li>• Always verify addresses before sending - transactions are irreversible</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* PulseChain Network Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="text-center p-4">
                  <div className="text-2xl font-bold text-green-600">$0.001</div>
                  <div className="text-sm text-slate-600">Avg Transaction Fee</div>
                  <div className="text-xs text-green-600 mt-1">1000x cheaper than Ethereum</div>
                </Card>

                <Card className="text-center p-4">
                  <div className="text-2xl font-bold text-blue-600">3 sec</div>
                  <div className="text-sm text-slate-600">Block Time</div>
                  <div className="text-xs text-blue-600 mt-1">Near-instant confirmations</div>
                </Card>

                <Card className="text-center p-4">
                  <div className="text-2xl font-bold text-purple-600">100%</div>
                  <div className="text-sm text-slate-600">Uptime</div>
                  <div className="text-xs text-purple-600 mt-1">Reliable network</div>
                </Card>

                <Card className="text-center p-4">
                  <div className="text-2xl font-bold text-pink-600">24/7</div>
                  <div className="text-sm text-slate-600">Always Available</div>
                  <div className="text-xs text-pink-600 mt-1">Never stops working</div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="spam" className="space-y-6">
              {/* Header with Compliance Warning */}
              <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-red-800 mb-2">⚠️ COMPLIANCE REQUIRED</h3>
                    <p className="text-sm text-red-700 mb-2">
                      <strong>Educational Follow-up Only:</strong> These templates are for educational follow-up with
                      people who have already expressed interest in learning about HEX and PulseChain.
                    </p>
                    <ul className="text-sm text-red-700 space-y-1 list-disc list-inside">
                      <li>Only contact people who opted-in to receive educational information</li>
                      <li>Always include unsubscribe options in all communications</li>
                      <li>Respect all "Do Not Contact" requests immediately</li>
                      <li>Comply with CAN-SPAM Act, GDPR, and local regulations</li>
                      <li>Never send unsolicited investment advice or sales pitches</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Template Categories */}
              <Tabs defaultValue="email-templates" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="email-templates">Email Templates</TabsTrigger>
                  <TabsTrigger value="sms-templates">SMS Templates</TabsTrigger>
                  <TabsTrigger value="campaigns">Campaign Manager</TabsTrigger>
                  <TabsTrigger value="analytics">Engagement Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="email-templates" className="space-y-6">
                  {/* Email Template Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Mail className="w-5 h-5 text-blue-500" />
                          Welcome to HEX Education
                        </CardTitle>
                        <CardDescription>Initial educational follow-up for new contacts</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-lg text-sm">
                          <p className="font-medium mb-2">Subject: Your HEX Education Journey Starts Here 📚</p>
                          <div className="space-y-2 text-slate-700">
                            <p>Hi {"{name}"},</p>
                            <p>
                              Thank you for your interest in learning about HEX and PulseChain! As promised, here are
                              some educational resources to get you started:
                            </p>
                            <p>
                              🎯 <strong>Start Here:</strong> HEX.com - Official website with all the basics
                            </p>
                            <p>
                              ⚡ <strong>PulseChain Benefits:</strong> PulseChain.com - Lower fees, faster transactions
                            </p>
                            <p>
                              📊 <strong>Live Data:</strong> PulseX.com - Real-time HEX price and staking info
                            </p>
                            <p>
                              Remember: This is educational content only. Always do your own research and never invest
                              more than you can afford to lose.
                            </p>
                            <p>Questions? Reply to this email anytime!</p>
                            <p>
                              Best regards,
                              <br />
                              {"{your_name}"}
                            </p>
                            <p className="text-xs text-slate-500 border-t pt-2 mt-4">
                              You received this because you requested HEX educational information.
                              <a href="#" className="text-blue-600 underline">
                                Unsubscribe here
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            Use Template
                          </Button>
                          <Button size="sm" variant="outline">
                            Customize
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-purple-500" />
                          PulseChain Migration Benefits
                        </CardTitle>
                        <CardDescription>Educate about PulseChain advantages</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-lg text-sm">
                          <p className="font-medium mb-2">Subject: Why HEX on PulseChain is a Game-Changer ⚡</p>
                          <div className="space-y-2 text-slate-700">
                            <p>Hi {"{name}"},</p>
                            <p>
                              Following up on our conversation about HEX - here's why the PulseChain version is so much
                              better:
                            </p>
                            <p>
                              💰 <strong>Ultra-Low Fees:</strong> ~$0.001 vs $50+ on Ethereum
                            </p>
                            <p>
                              ⚡ <strong>Faster Transactions:</strong> 3-second blocks vs 15-second blocks
                            </p>
                            <p>
                              🌱 <strong>Better for Environment:</strong> Proof of Stake consensus
                            </p>
                            <p>
                              🎁 <strong>Free Copies:</strong> You got free PulseChain copies of your Ethereum HEX
                            </p>
                            <p>
                              The same HEX smart contract, but with all the benefits of a modern blockchain. Check out
                              PulseX.com to see the difference!
                            </p>
                            <p>Educational purposes only - always DYOR!</p>
                            <p>
                              Best,
                              <br />
                              {"{your_name}"}
                            </p>
                            <p className="text-xs text-slate-500 border-t pt-2 mt-4">
                              Educational follow-up only.{" "}
                              <a href="#" className="text-blue-600 underline">
                                Unsubscribe
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            Use Template
                          </Button>
                          <Button size="sm" variant="outline">
                            Customize
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Target className="w-5 h-5 text-green-500" />
                          Staking Education Follow-up
                        </CardTitle>
                        <CardDescription>Explain HEX staking mechanics</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-lg text-sm">
                          <p className="font-medium mb-2">Subject: HEX Staking Explained Simply 🎯</p>
                          <div className="space-y-2 text-slate-700">
                            <p>Hi {"{name}"},</p>
                            <p>You asked about HEX staking - here's a simple breakdown:</p>
                            <p>
                              🔒 <strong>What is Staking?</strong> Lock up HEX for a set time period
                            </p>
                            <p>
                              📈 <strong>Why Stake?</strong> Earn yield + bonus shares for longer stakes
                            </p>
                            <p>
                              ⏰ <strong>Time Commitment:</strong> 1 day to 15+ years (your choice)
                            </p>
                            <p>
                              💎 <strong>Longer = Better:</strong> Up to 3x bonus shares for max-length stakes
                            </p>
                            <p>
                              🎁 <strong>Daily Rewards:</strong> Distributed from penalties and inflation
                            </p>
                            <p>
                              Think of it like a Certificate of Deposit (CD) but with potentially higher yields and on
                              PulseChain with minimal fees.
                            </p>
                            <p>Check the staking calculator on HEX.com to see potential returns!</p>
                            <p>Educational only - not financial advice!</p>
                            <p>{"{your_name}"}</p>
                            <p className="text-xs text-slate-500 border-t pt-2 mt-4">
                              <a href="#" className="text-blue-600 underline">
                                Unsubscribe from educational emails
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            Use Template
                          </Button>
                          <Button size="sm" variant="outline">
                            Customize
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="w-5 h-5 text-red-500" />
                          Addressing Common Concerns
                        </CardTitle>
                        <CardDescription>Educational response to skepticism</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-slate-50 p-4 rounded-lg text-sm">
                          <p className="font-medium mb-2">Subject: Addressing Your HEX Questions 🛡️</p>
                          <div className="space-y-2 text-slate-700">
                            <p>Hi {"{name}"},</p>
                            <p>I understand you have some concerns about HEX. Let me share some factual information:</p>
                            <p>
                              🔍 <strong>Open Source:</strong> All code is publicly auditable on GitHub
                            </p>
                            <p>
                              🏦 <strong>No Central Authority:</strong> Smart contract runs automatically
                            </p>
                            <p>
                              📊 <strong>Transparent:</strong> All transactions visible on PulseScan
                            </p>
                            <p>
                              ⚖️ <strong>Audited:</strong> Multiple security audits completed
                            </p>
                            <p>
                              🌐 <strong>Decentralized:</strong> No single point of failure
                            </p>
                            <p>
                              The best way to understand HEX is to research the technology yourself. Start with the
                              technical documentation and smart contract code.
                            </p>
                            <p>Always verify everything independently - don't trust, verify!</p>
                            <p>Happy to answer specific technical questions.</p>
                            <p>{"{your_name}"}</p>
                            <p className="text-xs text-slate-500 border-t pt-2 mt-4">
                              Educational information only.{" "}
                              <a href="#" className="text-blue-600 underline">
                                Opt out
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            Use Template
                          </Button>
                          <Button size="sm" variant="outline">
                            Customize
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Custom Template Builder */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Custom Template Builder</CardTitle>
                      <CardDescription>Create your own educational email templates</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium">Template Name</label>
                            <Input placeholder="My Custom Template" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Subject Line</label>
                            <Input placeholder="Subject: Your Educational Content" />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Category</label>
                            <select className="w-full p-2 border rounded-lg text-sm">
                              <option>Educational Follow-up</option>
                              <option>Technical Explanation</option>
                              <option>Resource Sharing</option>
                              <option>Question Response</option>
                            </select>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm font-medium">Available Variables</label>
                            <div className="grid grid-cols-2 gap-2">
                              <Button variant="outline" size="sm" className="text-xs">
                                {"{name}"}
                              </Button>
                              <Button variant="outline" size="sm" className="text-xs">
                                {"{your_name}"}
                              </Button>
                              <Button variant="outline" size="sm" className="text-xs">
                                {"{date}"}
                              </Button>
                              <Button variant="outline" size="sm" className="text-xs">
                                {"{location}"}
                              </Button>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium">Compliance Level</label>
                            <select className="w-full p-2 border rounded-lg text-sm">
                              <option>Educational Only</option>
                              <option>Resource Sharing</option>
                              <option>Question Response</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Email Content</label>
                        <textarea
                          className="w-full h-32 p-3 border rounded-lg text-sm"
                          placeholder="Hi {name},

Thank you for your interest in learning about HEX and PulseChain...

Educational purposes only - always do your own research!

Best regards,
{your_name}

---
You received this educational content because you opted in. Unsubscribe: [link]"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button className="bg-gradient-to-r from-blue-500 to-purple-500">Save Template</Button>
                        <Button variant="outline">Preview</Button>
                        <Button variant="outline">Test Send</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="sms-templates" className="space-y-6">
                  {/* SMS Template Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Phone className="w-5 h-5 text-green-500" />
                          Quick HEX Resource Share
                        </CardTitle>
                        <CardDescription>Short educational follow-up SMS</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                          <div className="text-sm space-y-2">
                            <p className="font-medium">SMS Template (147 characters):</p>
                            <p className="text-slate-700">
                              Hi {"{name}"}, here's that HEX info: HEX.com for basics, PulseX.com for current data.
                              Educational only - DYOR! Reply STOP to opt out. -{"{your_name}"}
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>Character count: 147/160</span>
                          <span>Estimated cost: $0.02</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            Use Template
                          </Button>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-purple-500" />
                          PulseChain Benefits Reminder
                        </CardTitle>
                        <CardDescription>Highlight PulseChain advantages</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                          <span className="font-medium">Education Success Rate</span>
                          <span className="text-2xl font-bold text-green-600">7.1%</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                          <span className="font-medium">Avg. Education Time</span>
                          <span className="text-2xl font-bold text-blue-600">23 min</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                          <span className="font-medium">Follow-up Response Rate</span>
                          <span className="text-2xl font-bold text-purple-600">34%</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                          <span className="font-medium">Resource Click Rate</span>
                          <span className="text-2xl font-bold text-orange-600">67%</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Weekly Trends</CardTitle>
                        <CardDescription>Educational activity patterns</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Monday</span>
                              <span>12 educational visits</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Tuesday</span>
                              <span>18 educational visits</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Wednesday</span>
                              <span>15 educational visits</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Thursday</span>
                              <span>20 educational visits</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Friday</span>
                              <span>14 educational visits</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

          <TabsContent value="client-portal" className="space-y-6">
            {/* Portal Access Control */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-blue-800">Onboard Portal Access</h3>
                    <p className="text-sm text-blue-600">
                      {termsAccepted
                        ? "Terms accepted - Portal access granted"
                        : "Terms of Service acceptance required for portal access"}
                    </p>
                  </div>
                </div>
                {!termsAccepted && (
                  <Button
                    onClick={() => setShowTerms(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    Review Terms & Access Portal
                  </Button>
                )}
              </div>
            </div>

            {/* Client Portal Content */}
            {termsAccepted ? (
              <ClientPortal />
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-6 h-6 text-slate-400" />
                    Portal Access Restricted
                  </CardTitle>
                  <CardDescription>
                    Please review and accept the Terms of Service to access the Onboard Portal and earning opportunities.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center py-12">
                  <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <Shield className="w-12 h-12 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-700 mb-2">Terms of Service Required</h3>
                  <p className="text-slate-600 mb-6 max-w-md mx-auto">
                    To ensure compliance and protect all users, you must review and accept our comprehensive Terms of
                    Service before accessing the Onboard Portal and HEX earning opportunities.
                  </p>
                  <Button
                    onClick={() => setShowTerms(true)}
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Review Terms of Service
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>Track your educational outreach effectiveness</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <span className="font-medium">Education Success Rate</span>
                      <span className="text-2xl font-bold text-green-600">7.1%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <span className="font-medium">Avg. Education Time</span>
                      <span className="text-2xl font-bold text-blue-600">23 min</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <span className="font-medium">Follow-up Response Rate</span>
                      <span className="text-2xl font-bold text-purple-600">34%</span>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                      <span className="font-medium">Resource Click Rate</span>
                      <span className="text-2xl font-bold text-orange-600">67%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Trends</CardTitle>
                  <CardDescription>Educational activity patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Monday</span>
                        <span>12 educational visits</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Tuesday</span>
                        <span>18 educational visits</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "90%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Wednesday</span>
                        <span>15 educational visits</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Thursday</span>
                        <span>20 educational visits</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "100%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Friday</span>
                        <span>14 educational visits</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* ElevenLabs ConvAI Widget */}
      <elevenlabs-convai agent-id="7J5IJKFw5Kt3qKFSJU7H"></elevenlabs-convai>
      <script src="https://unpkg.com/@elevenlabs/convai-widget-embed" async type="text/javascript"></script>
    </div>
  )
  }

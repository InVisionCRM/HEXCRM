"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Wallet,
  Key,
  Copy,
  CheckCircle,
  AlertTriangle,
  Zap,
  Target,
  Gift,
  RefreshCw,
} from "lucide-react"

interface OnboardHexicanFormProps {
  isOpen: boolean
  onClose: () => void
}

export function OnboardHexicanForm({ isOpen, onClose }: OnboardHexicanFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    referralSource: "",
    investmentExperience: "",
    initialInvestment: "",
    hasWallet: false,
    existingWallet: "",
    agreedToTerms: false,
    agreedToEducation: false,
  })

  const [generatedWallet, setGeneratedWallet] = useState<{
    address: string
    privateKey: string
    seedPhrase: string[]
  } | null>(null)

  const [step, setStep] = useState(1)
  const [isGeneratingWallet, setIsGeneratingWallet] = useState(false)

  // Mock wallet generation
  const generateWallet = async () => {
    setIsGeneratingWallet(true)

    // Simulate wallet generation delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    const mockWallet = {
      address: "0x" + Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
      privateKey: "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(""),
      seedPhrase: [
        "abandon",
        "ability",
        "able",
        "about",
        "above",
        "absent",
        "absorb",
        "abstract",
        "absurd",
        "abuse",
        "access",
        "accident",
      ],
    }

    setGeneratedWallet(mockWallet)
    setIsGeneratingWallet(false)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handleSubmit = () => {
    // Mock submission
    console.log("Onboarding HEXican:", formData, generatedWallet)
    onClose()
    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      referralSource: "",
      investmentExperience: "",
      initialInvestment: "",
      hasWallet: false,
      existingWallet: "",
      agreedToTerms: false,
      agreedToEducation: false,
    })
    setGeneratedWallet(null)
    setStep(1)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            Onboard New HEXican to PulseChain
          </DialogTitle>
          <DialogDescription>
            Complete the educational onboarding process for a new HEXican on PulseChain
          </DialogDescription>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              1
            </div>
            <div className={`w-12 h-1 ${step >= 2 ? "bg-blue-500" : "bg-gray-200"}`}></div>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 2 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              2
            </div>
            <div className={`w-12 h-1 ${step >= 3 ? "bg-blue-500" : "bg-gray-200"}`}></div>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full ${step >= 3 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            >
              3
            </div>
          </div>
        </div>

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Basic contact and demographic information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">First Name *</label>
                    <Input
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Last Name *</label>
                    <Input
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="email"
                      placeholder="john.doe@email.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="tel"
                      placeholder="(555) 123-4567"
                      className="pl-10"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Street Address *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="123 Main Street"
                      className="pl-10"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City *</label>
                    <Input
                      placeholder="New York"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">State *</label>
                    <Input
                      placeholder="NY"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Zip Code *</label>
                    <Input
                      placeholder="10001"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Background Information</CardTitle>
                <CardDescription>Help us understand their experience level</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">How did they hear about HEX?</label>
                  <Select
                    value={formData.referralSource}
                    onValueChange={(value) => setFormData({ ...formData, referralSource: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select referral source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="door-to-door">Door-to-door visit</SelectItem>
                      <SelectItem value="friend-referral">Friend/Family referral</SelectItem>
                      <SelectItem value="social-media">Social media</SelectItem>
                      <SelectItem value="youtube">YouTube</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Investment Experience Level</label>
                  <Select
                    value={formData.investmentExperience}
                    onValueChange={(value) => setFormData({ ...formData, investmentExperience: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (New to crypto)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (Some crypto experience)</SelectItem>
                      <SelectItem value="advanced">Advanced (Experienced trader/investor)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Planned Initial Investment (Optional)</label>
                  <Select
                    value={formData.initialInvestment}
                    onValueChange={(value) => setFormData({ ...formData, initialInvestment: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select investment range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-500">Under $500</SelectItem>
                      <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                      <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                      <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                      <SelectItem value="over-10000">Over $10,000</SelectItem>
                      <SelectItem value="undecided">Still deciding</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button
                onClick={() => setStep(2)}
                disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                Next: Wallet Setup
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Wallet Setup */}
        {step === 2 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  PulseChain Wallet Setup
                </CardTitle>
                <CardDescription>Set up a PulseChain wallet for HEX transactions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* PulseChain Info Banner */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-purple-800 mb-1">HEX is now on PulseChain!</h4>
                      <p className="text-sm text-purple-700">
                        PulseChain offers faster transactions and lower fees than Ethereum. Your HEXican will need a
                        PulseChain-compatible wallet to interact with HEX.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="hasWallet"
                      checked={formData.hasWallet}
                      onCheckedChange={(checked) => setFormData({ ...formData, hasWallet: checked as boolean })}
                    />
                    <label htmlFor="hasWallet" className="text-sm font-medium">
                      They already have a PulseChain wallet
                    </label>
                  </div>

                  {formData.hasWallet ? (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Existing Wallet Address</label>
                      <div className="relative">
                        <Wallet className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          placeholder="0x742d35Cc6634C0532925a3b8D4C9db96590c6C87"
                          className="pl-10 font-mono text-sm"
                          value={formData.existingWallet}
                          onChange={(e) => setFormData({ ...formData, existingWallet: e.target.value })}
                        />
                      </div>
                      <p className="text-xs text-slate-500">Enter their existing PulseChain wallet address</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg">
                        <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Generate New PulseChain Wallet</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          Create a secure wallet for your new HEXican to get started on PulseChain
                        </p>
                        <Button
                          onClick={generateWallet}
                          disabled={isGeneratingWallet}
                          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                        >
                          {isGeneratingWallet ? (
                            <>
                              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                              Generating Secure Wallet...
                            </>
                          ) : (
                            <>
                              <Key className="w-4 h-4 mr-2" />
                              Generate New Wallet
                            </>
                          )}
                        </Button>
                      </div>

                      {generatedWallet && (
                        <Card className="border-green-200 bg-green-50">
                          <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-green-800">
                              <CheckCircle className="w-5 h-5" />
                              Wallet Generated Successfully!
                            </CardTitle>
                            <CardDescription className="text-green-700">
                              Save this information securely - it cannot be recovered if lost
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="space-y-4">
                            <div className="space-y-2">
                              <label className="text-sm font-medium text-green-800">Wallet Address:</label>
                              <div className="flex items-center gap-2 p-2 bg-white rounded border">
                                <code className="flex-1 text-sm font-mono">{generatedWallet.address}</code>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => copyToClipboard(generatedWallet.address)}
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium text-green-800">Private Key:</label>
                              <div className="flex items-center gap-2 p-2 bg-white rounded border">
                                <code className="flex-1 text-sm font-mono break-all">{generatedWallet.privateKey}</code>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => copyToClipboard(generatedWallet.privateKey)}
                                >
                                  <Copy className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <label className="text-sm font-medium text-green-800">Seed Phrase:</label>
                              <div className="grid grid-cols-3 gap-2 p-3 bg-white rounded border">
                                {generatedWallet.seedPhrase.map((word, index) => (
                                  <div key={index} className="text-sm font-mono p-1 bg-gray-50 rounded text-center">
                                    {index + 1}. {word}
                                  </div>
                                ))}
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(generatedWallet.seedPhrase.join(" "))}
                                className="w-full"
                              >
                                <Copy className="w-3 h-3 mr-2" />
                                Copy Seed Phrase
                              </Button>
                            </div>

                            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                              <div className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                                <div className="text-sm text-red-700">
                                  <p className="font-medium mb-1">Security Warning:</p>
                                  <ul className="text-xs space-y-1">
                                    <li>• Never share the private key or seed phrase with anyone</li>
                                    <li>• Store this information in a secure location</li>
                                    <li>• Consider using a hardware wallet for large amounts</li>
                                    <li>• This information cannot be recovered if lost</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                Back: Personal Info
              </Button>
              <Button
                onClick={() => setStep(3)}
                disabled={!formData.hasWallet && !generatedWallet}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600"
              >
                Next: Complete Onboarding
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Final Confirmation */}
        {step === 3 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Complete HEXican Onboarding
                </CardTitle>
                <CardDescription>Review and confirm the onboarding details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Summary */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-3">Onboarding Summary:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p>
                        <strong>Name:</strong> {formData.firstName} {formData.lastName}
                      </p>
                      <p>
                        <strong>Email:</strong> {formData.email}
                      </p>
                      <p>
                        <strong>Phone:</strong> {formData.phone}
                      </p>
                      <p>
                        <strong>Location:</strong> {formData.city}, {formData.state}
                      </p>
                    </div>
                    <div>
                      <p>
                        <strong>Experience:</strong> {formData.investmentExperience || "Not specified"}
                      </p>
                      <p>
                        <strong>Referral:</strong> {formData.referralSource || "Not specified"}
                      </p>
                      <p>
                        <strong>Investment:</strong> {formData.initialInvestment || "Not specified"}
                      </p>
                      <p>
                        <strong>Wallet:</strong> {formData.hasWallet ? "Existing" : "Generated new"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Educational Acknowledgments */}
                <div className="space-y-4">
                  <h4 className="font-medium">Educational Acknowledgments:</h4>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreedToTerms"
                      checked={formData.agreedToTerms}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreedToTerms: checked as boolean })}
                    />
                    <label htmlFor="agreedToTerms" className="text-sm leading-relaxed">
                      I confirm that this person has been educated about HEX and PulseChain, understands the risks
                      involved, and is making their own independent decision to participate. No financial advice was
                      provided.
                    </label>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="agreedToEducation"
                      checked={formData.agreedToEducation}
                      onCheckedChange={(checked) => setFormData({ ...formData, agreedToEducation: checked as boolean })}
                    />
                    <label htmlFor="agreedToEducation" className="text-sm leading-relaxed">
                      The new HEXican has been directed to official resources (HEX.com, PulseChain.com) for further
                      education and will make their own purchasing decisions through legitimate exchanges.
                    </label>
                  </div>
                </div>

                {/* Next Steps */}
                <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <Gift className="w-5 h-5" />
                      Recommended Next Steps
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-green-700 space-y-2">
                    <p>• Guide them to set up MetaMask with PulseChain network</p>
                    <p>• Show them how to add HEX token to their wallet</p>
                    <p>• Direct them to PulseX.com for HEX purchases</p>
                    <p>• Explain HEX staking benefits and go.hex.com</p>
                    <p>• Schedule a follow-up educational session</p>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>

            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setStep(2)}>
                Back: Wallet Setup
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!formData.agreedToTerms || !formData.agreedToEducation}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Complete Onboarding
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

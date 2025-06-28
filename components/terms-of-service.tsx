"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertTriangle, Shield, Scale, FileText, CheckCircle } from "lucide-react"

interface TermsOfServiceProps {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
}

export function TermsOfService({ isOpen, onClose, onAccept }: TermsOfServiceProps) {
  const [acceptedSections, setAcceptedSections] = useState({
    general: false,
    educational: false,
    risks: false,
    compliance: false,
    earnings: false,
    privacy: false,
  })

  const allAccepted = Object.values(acceptedSections).every(Boolean)

  const handleAccept = () => {
    if (allAccepted) {
      onAccept()
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FileText className="w-6 h-6 text-blue-500" />
            HEX Educational Platform - Terms of Service
          </DialogTitle>
          <DialogDescription>Please read and accept all sections before accessing the onboard portal</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {/* General Terms */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Scale className="w-5 h-5 text-blue-600" />
                  1. General Terms and Conditions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm space-y-3">
                  <p>
                    <strong>Effective Date:</strong> January 1, 2024
                  </p>
                  <p>
                    Welcome to the HEX Educational Platform ("Platform"). By accessing or using our services, you agree
                    to be bound by these Terms of Service ("Terms").
                  </p>
                  <p>
                    <strong>1.1 Platform Purpose:</strong> This Platform is designed exclusively for educational
                    purposes regarding HEX cryptocurrency and PulseChain technology. We do not provide financial advice,
                    investment recommendations, or trading services.
                  </p>
                  <p>
                    <strong>1.2 User Eligibility:</strong> You must be at least 18 years old and legally capable of
                    entering into binding agreements in your jurisdiction.
                  </p>
                  <p>
                    <strong>1.3 Account Responsibility:</strong> You are responsible for maintaining the confidentiality
                    of your account credentials and all activities under your account.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="general-terms"
                    checked={acceptedSections.general}
                    onCheckedChange={(checked) =>
                      setAcceptedSections((prev) => ({ ...prev, general: checked as boolean }))
                    }
                  />
                  <label htmlFor="general-terms" className="text-sm font-medium">
                    I have read and accept the General Terms and Conditions
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Educational Nature */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-green-600" />
                  2. Educational Nature and Disclaimers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="text-sm space-y-3">
                    <p>
                      <strong>2.1 Educational Purpose Only:</strong> All content, materials, and activities on this
                      Platform are for educational purposes only. Nothing constitutes financial, investment, legal, or
                      tax advice.
                    </p>
                    <p>
                      <strong>2.2 No Financial Advice:</strong> We do not recommend buying, selling, or holding any
                      cryptocurrency. All decisions are yours alone.
                    </p>
                    <p>
                      <strong>2.3 Do Your Own Research (DYOR):</strong> You must conduct your own research and consult
                      with qualified professionals before making any financial decisions.
                    </p>
                    <p>
                      <strong>2.4 Independent Decision Making:</strong> Any actions you take regarding cryptocurrency
                      are your independent decisions based on your own research and risk tolerance.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="educational-terms"
                    checked={acceptedSections.educational}
                    onCheckedChange={(checked) =>
                      setAcceptedSections((prev) => ({ ...prev, educational: checked as boolean }))
                    }
                  />
                  <label htmlFor="educational-terms" className="text-sm font-medium">
                    I understand this Platform is for education only and provides no financial advice
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Risk Warnings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  3. Risk Warnings and Disclaimers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="text-sm space-y-3">
                    <p>
                      <strong>3.1 Cryptocurrency Risks:</strong> Cryptocurrency investments are highly speculative and
                      carry significant risk of total loss. Prices can be extremely volatile.
                    </p>
                    <p>
                      <strong>3.2 No Guarantees:</strong> Past performance does not guarantee future results. No returns
                      or profits are guaranteed.
                    </p>
                    <p>
                      <strong>3.3 Regulatory Risk:</strong> Cryptocurrency regulations may change and could affect the
                      value or legality of digital assets.
                    </p>
                    <p>
                      <strong>3.4 Technology Risk:</strong> Blockchain technology and smart contracts may contain bugs,
                      vulnerabilities, or fail to operate as intended.
                    </p>
                    <p>
                      <strong>3.5 Loss of Access:</strong> Loss of private keys or wallet access may result in permanent
                      loss of cryptocurrency.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="risk-terms"
                    checked={acceptedSections.risks}
                    onCheckedChange={(checked) =>
                      setAcceptedSections((prev) => ({ ...prev, risks: checked as boolean }))
                    }
                  />
                  <label htmlFor="risk-terms" className="text-sm font-medium">
                    I understand and accept all cryptocurrency risks and disclaimers
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Compliance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Scale className="w-5 h-5 text-purple-600" />
                  4. Legal Compliance and User Responsibilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm space-y-3">
                  <p>
                    <strong>4.1 Legal Compliance:</strong> You agree to comply with all applicable laws and regulations
                    in your jurisdiction regarding cryptocurrency and digital assets.
                  </p>
                  <p>
                    <strong>4.2 Tax Obligations:</strong> You are solely responsible for determining and fulfilling any
                    tax obligations related to cryptocurrency activities.
                  </p>
                  <p>
                    <strong>4.3 Prohibited Activities:</strong> You may not use this Platform for any illegal
                    activities, money laundering, or circumventing regulations.
                  </p>
                  <p>
                    <strong>4.4 Jurisdiction Restrictions:</strong> This Platform may not be available in all
                    jurisdictions. You are responsible for ensuring your access is legal.
                  </p>
                  <p>
                    <strong>4.5 Accurate Information:</strong> You agree to provide accurate information and update it
                    as necessary.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="compliance-terms"
                    checked={acceptedSections.compliance}
                    onCheckedChange={(checked) =>
                      setAcceptedSections((prev) => ({ ...prev, compliance: checked as boolean }))
                    }
                  />
                  <label htmlFor="compliance-terms" className="text-sm font-medium">
                    I agree to comply with all applicable laws and regulations
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Earnings Program */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CheckCircle className="w-5 h-5 text-yellow-600" />
                  5. Educational Earnings Program
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm space-y-3">
                  <p>
                    <strong>5.1 Program Purpose:</strong> The earnings program rewards educational engagement and
                    learning activities. Rewards are provided to encourage education, not as investment returns.
                  </p>
                  <p>
                    <strong>5.2 Earning Activities:</strong> You may earn HEX tokens through completing educational
                    modules, quizzes, referrals, and community participation.
                  </p>
                  <p>
                    <strong>5.3 No Guarantee of Earnings:</strong> Earnings are discretionary and not guaranteed. The
                    program may be modified or discontinued at any time.
                  </p>
                  <p>
                    <strong>5.4 Withdrawal Requirements:</strong> Minimum withdrawal amounts and verification
                    requirements may apply.
                  </p>
                  <p>
                    <strong>5.5 Tax Implications:</strong> Earned tokens may have tax implications. Consult a tax
                    professional for guidance.
                  </p>
                  <p>
                    <strong>5.6 Anti-Fraud:</strong> Any fraudulent activity or gaming of the system will result in
                    immediate account termination and forfeiture of earnings.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="earnings-terms"
                    checked={acceptedSections.earnings}
                    onCheckedChange={(checked) =>
                      setAcceptedSections((prev) => ({ ...prev, earnings: checked as boolean }))
                    }
                  />
                  <label htmlFor="earnings-terms" className="text-sm font-medium">
                    I understand the Educational Earnings Program terms and conditions
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Privacy and Data */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-blue-600" />
                  6. Privacy and Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm space-y-3">
                  <p>
                    <strong>6.1 Data Collection:</strong> We collect information necessary to provide educational
                    services and manage the earnings program.
                  </p>
                  <p>
                    <strong>6.2 Data Use:</strong> Your data is used solely for Platform operations, education delivery,
                    and earnings program management.
                  </p>
                  <p>
                    <strong>6.3 Data Security:</strong> We implement reasonable security measures to protect your
                    information, but cannot guarantee absolute security.
                  </p>
                  <p>
                    <strong>6.4 Third-Party Services:</strong> We may use third-party services for Platform operations.
                    These services have their own privacy policies.
                  </p>
                  <p>
                    <strong>6.5 Data Retention:</strong> We retain data as necessary for legal compliance and Platform
                    operations.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="privacy-terms"
                    checked={acceptedSections.privacy}
                    onCheckedChange={(checked) =>
                      setAcceptedSections((prev) => ({ ...prev, privacy: checked as boolean }))
                    }
                  />
                  <label htmlFor="privacy-terms" className="text-sm font-medium">
                    I accept the Privacy and Data Protection terms
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Final Disclaimers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">7. Final Disclaimers and Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="text-sm space-y-3">
                    <p>
                      <strong>7.1 Platform Availability:</strong> We do not guarantee continuous availability of the
                      Platform and may suspend or terminate services at any time.
                    </p>
                    <p>
                      <strong>7.2 Limitation of Liability:</strong> To the maximum extent permitted by law, we are not
                      liable for any direct, indirect, incidental, or consequential damages.
                    </p>
                    <p>
                      <strong>7.3 Indemnification:</strong> You agree to indemnify and hold us harmless from any claims
                      arising from your use of the Platform.
                    </p>
                    <p>
                      <strong>7.4 Governing Law:</strong> These Terms are governed by the laws of [Your Jurisdiction]
                      without regard to conflict of law principles.
                    </p>
                    <p>
                      <strong>7.5 Modifications:</strong> We may modify these Terms at any time. Continued use
                      constitutes acceptance of modified Terms.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <div className="flex justify-between items-center pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAccept}
            disabled={!allAccepted}
            className={`${
              allAccepted
                ? "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                : "bg-slate-300"
            }`}
          >
            {allAccepted ? "Accept Terms & Access Portal" : "Please Accept All Sections"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

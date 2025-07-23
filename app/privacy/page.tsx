import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-purple-800">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-xl text-purple-200">How we collect, use, and protect your information</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-4xl mx-auto">
          <CardContent className="p-8 text-purple-200 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information We Collect</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Mobile Legends ID and Server ID</li>
                <li>Phone number for transaction verification</li>
                <li>Payment transaction screenshots</li>
                <li>Order history and transaction records</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Process diamond top-up orders</li>
                <li>Verify payment transactions</li>
                <li>Provide customer support</li>
                <li>Improve our services</li>
                <li>Prevent fraud and abuse</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Data Protection</h2>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. Your data is encrypted and stored securely on our
                servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
              <p>
                We do not sell, trade, or share your personal information with third parties except as necessary to
                process your orders or as required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
              <p>
                We retain your information for as long as necessary to provide our services and comply with legal
                obligations. Transaction records are kept for accounting purposes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Request access to your personal data</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent for data processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
              <p>
                If you have questions about this privacy policy or your personal data, please contact us at 09950971136.
              </p>
            </section>

            <div className="text-center pt-6 border-t border-white/20">
              <p className="text-white font-semibold">Last updated: January 2024</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

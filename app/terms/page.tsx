import { Navigation } from "@/components/navigation"
import { Card, CardContent } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-purple-800">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-xl text-purple-200">Please read these terms carefully before using our service</p>
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20 max-w-4xl mx-auto">
          <CardContent className="p-8 text-purple-200 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">1. Service Description</h2>
              <p>
                7AM Diamond provides Mobile Legends diamond top-up services for players in Myanmar. We act as an
                intermediary between customers and the official Mobile Legends payment system.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">2. Payment Terms</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>All payments must be made through supported payment methods (KPAY, WAVEPAY)</li>
                <li>Payment confirmation is required before diamond delivery</li>
                <li>Prices are subject to change without prior notice</li>
                <li>All transactions are final and non-refundable unless service failure occurs</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">3. Delivery Policy</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Diamonds are typically delivered within 1-5 minutes of payment confirmation</li>
                <li>Delivery may be delayed during peak hours or system maintenance</li>
                <li>Customers must provide accurate Mobile Legends ID and Server ID</li>
                <li>We are not responsible for delays caused by incorrect account information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">4. Refund Policy</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Refunds are only provided in case of service failure on our end</li>
                <li>No refunds for customer errors (wrong ID, server, etc.)</li>
                <li>Refund requests must be made within 24 hours of purchase</li>
                <li>Refunds will be processed within 3-5 business days</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">5. User Responsibilities</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide accurate account information</li>
                <li>Ensure account is not banned or restricted</li>
                <li>Keep transaction screenshots for reference</li>
                <li>Contact support immediately if issues arise</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
              <p>
                7AM Diamond is not liable for any damages resulting from the use of our service, including but not
                limited to account bans, game-related issues, or indirect damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">7. Contact Information</h2>
              <p>For questions about these terms, please contact us at 09950971136 or through our website.</p>
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

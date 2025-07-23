import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Diamond, Clock, Shield, Zap, Users, Award } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: Zap,
      title: "Instant Delivery",
      description: "Get your diamonds delivered to your account within minutes of payment confirmation.",
    },
    {
      icon: Shield,
      title: "100% Safe & Secure",
      description: "We use official top-up methods ensuring your account safety and security.",
    },
    {
      icon: Clock,
      title: "24/7 Support",
      description: "Our customer support team is available round the clock to assist you.",
    },
    {
      icon: Users,
      title: "Trusted by Thousands",
      description: "Over 10,000+ satisfied customers trust us for their Mobile Legends needs.",
    },
    {
      icon: Award,
      title: "Best Prices",
      description: "Competitive pricing with regular discounts and promotional offers.",
    },
    {
      icon: Diamond,
      title: "All Packages Available",
      description: "From small to large diamond packages, we have everything you need.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-purple-800">
      <Navigation />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">About 7AM Diamond</h1>
          <p className="text-xl text-purple-200 max-w-3xl mx-auto">
            Your trusted partner for Mobile Legends diamond top-ups in Myanmar. Fast, secure, and reliable service since
            2023.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="bg-white/10 backdrop-blur-md border-white/20">
                <CardHeader>
                  <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-purple-200">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-2xl">Our Story</CardTitle>
          </CardHeader>
          <CardContent className="text-purple-200 space-y-4">
            <p>
              7AM Diamond was founded with a simple mission: to provide Mobile Legends players in Myanmar with the
              fastest, safest, and most affordable way to purchase diamonds for their favorite game.
            </p>
            <p>
              We understand the passion and dedication that Mobile Legends players have for their game, and we're here
              to support that journey by making diamond top-ups as seamless as possible.
            </p>
            <p>
              With support for local payment methods like KPAY and WAVEPAY, we've made it easier than ever for Myanmar
              players to enhance their gaming experience.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

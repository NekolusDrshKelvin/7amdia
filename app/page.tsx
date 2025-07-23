"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Upload,
  Phone,
  CreditCard,
  User,
  Server,
  Diamond,
  AlertTriangle,
  CheckCircle,
  Star,
  Zap,
  Shield,
  Clock,
} from "lucide-react"
import { ModernNavigation } from "@/components/modern-navigation"
import { useStore } from "@/lib/store"

export default function DiamondTopUp() {
  const { diamondPackages, paymentMethods, systemSettings, addOrder } = useStore()

  const [selectedPackage, setSelectedPackage] = useState<any>(null)
  const [formData, setFormData] = useState({
    mlbbId: "",
    serverId: "",
    phoneNumber: "",
    accountName: "",
    paymentMethod: "",
  })
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)

  // Get active packages and payment methods
  const activePackages = diamondPackages.filter((pkg) => pkg.isActive)
  const activePaymentMethods = paymentMethods.filter((pm) => pm.isActive)

  // Check if site is in maintenance mode
  if (systemSettings.maintenanceMode) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <Card className="max-w-md mx-auto glass border-white/20">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
              <AlertTriangle className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Under Maintenance
            </h1>
            <p className="text-gray-300 mb-6">
              We're upgrading our systems to serve you better. Please check back soon!
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
              <Phone className="w-4 h-4" />
              <span>Emergency: {systemSettings.contactPhone}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setScreenshot(file)

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setScreenshotPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPackage) {
      alert("Please select a diamond package")
      return
    }

    if (
      !formData.accountName ||
      !formData.mlbbId ||
      !formData.serverId ||
      !formData.phoneNumber ||
      !formData.paymentMethod
    ) {
      alert("Please fill in all required fields")
      return
    }

    if (!screenshot) {
      alert("Please upload transaction screenshot")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Convert screenshot to base64 for storage
    const reader = new FileReader()
    reader.onload = () => {
      // Add order to store with screenshot
      addOrder({
        mlbbId: formData.mlbbId,
        serverId: formData.serverId,
        phoneNumber: formData.phoneNumber,
        customerName: formData.accountName,
        email: "",
        diamonds: selectedPackage.diamonds,
        price: selectedPackage.price,
        paymentMethod: formData.paymentMethod,
        status: systemSettings.autoApproval ? "completed" : "pending",
        priority: selectedPackage.price > 20000 ? "high" : selectedPackage.price > 10000 ? "medium" : "low",
        screenshot: reader.result as string,
      })

      setOrderSuccess(true)
      setIsSubmitting(false)

      // Reset form
      setFormData({
        mlbbId: "",
        serverId: "",
        phoneNumber: "",
        accountName: "",
        paymentMethod: "",
      })
      setSelectedPackage(null)
      setScreenshot(null)
      setScreenshotPreview(null)

      // Hide success message after 5 seconds
      setTimeout(() => setOrderSuccess(false), 5000)
    }
    reader.readAsDataURL(screenshot)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-40 left-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <ModernNavigation />

      <div className="relative z-10 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Success Alert */}
          {orderSuccess && (
            <Alert className="mb-8 glass border-green-500/50 neon-blue">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <AlertDescription className="text-green-300 font-medium">
                🎉 Order submitted successfully!{" "}
                {systemSettings.autoApproval
                  ? "Your diamonds will be delivered shortly."
                  : "Please wait for admin approval."}
              </AlertDescription>
            </Alert>
          )}

          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-white/20 mb-6">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-white/80 text-sm font-medium">Premium Gaming Store</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
                {systemSettings.siteName}
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 mb-8 max-w-2xl mx-auto">{systemSettings.welcomeMessage}</p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 glass rounded-full border border-white/20">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-white/80 text-sm">Instant Delivery</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 glass rounded-full border border-white/20">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-white/80 text-sm">100% Safe</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 glass rounded-full border border-white/20">
                <Clock className="w-4 h-4 text-blue-400" />
                <span className="text-white/80 text-sm">{systemSettings.businessHours}</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Diamond Packages */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Diamond className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white">Diamond Packages</h2>
                  <p className="text-white/60">Choose your perfect package</p>
                </div>
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                  {activePackages.length} Available
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activePackages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`cursor-pointer transition-all duration-300 hover:scale-105 glass rounded-3xl p-6 border-2 group ${
                      selectedPackage?.id === pkg.id
                        ? "border-purple-500/50 neon-purple bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                        : "border-white/20 hover:border-purple-500/30"
                    }`}
                    onClick={() => setSelectedPackage(pkg)}
                  >
                    {/* Package Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center group-hover:animate-float">
                          <Diamond className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-white">{pkg.diamonds}</span>
                            <span className="text-blue-400 text-xl">💎</span>
                          </div>
                          <div className="text-xs text-white/60">{pkg.category?.toUpperCase()}</div>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-col gap-2">
                        {pkg.popular && (
                          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 text-xs">
                            🔥 Popular
                          </Badge>
                        )}
                        {pkg.discount && pkg.discount > 0 && (
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs">
                            {pkg.discount}% OFF
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Price Section */}
                    <div className="text-right mb-4">
                      <div className="flex items-center justify-end gap-2 mb-1">
                        {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                          <span className="text-sm text-white/40 line-through">
                            {pkg.originalPrice.toLocaleString()}
                          </span>
                        )}
                        <div className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                          {pkg.price.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-sm text-white/60 font-medium">MMK</div>
                    </div>

                    {/* Package Info */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/60">Delivery</span>
                        <span className="text-green-400 font-medium">
                          {systemSettings.autoApproval ? "⚡ Instant" : "🚀 Fast"}
                        </span>
                      </div>
                      {pkg.description && (
                        <div className="text-xs text-white/50 bg-white/5 rounded-lg p-2">{pkg.description}</div>
                      )}
                    </div>

                    {/* Selection Indicator */}
                    {selectedPackage?.id === pkg.id && (
                      <div className="mt-4 flex items-center justify-center">
                        <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                          <CheckCircle className="w-4 h-4 text-white" />
                          <span className="text-white text-sm font-medium">Selected</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {activePackages.length === 0 && (
                <Card className="glass border-white/20">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <AlertTriangle className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">No Packages Available</h3>
                    <p className="text-white/60 max-w-md mx-auto">
                      All diamond packages are currently unavailable. Please check back later or contact support.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Form */}
            <div className="lg:col-span-1">
              <Card className="glass border-white/20 sticky top-28">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-4 h-4 text-white" />
                    </div>
                    Complete Your Order
                  </CardTitle>
                  <CardDescription className="text-white/60">Fill in your details to purchase diamonds</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Selected Package Display */}
                    {selectedPackage && (
                      <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                              <Diamond className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <div className="text-white font-bold">{selectedPackage.diamonds} 💎</div>
                              <div className="text-white/60 text-sm">{selectedPackage.category}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-400">
                              {selectedPackage.price.toLocaleString()}
                            </div>
                            <div className="text-white/60 text-sm">MMK</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Form Fields */}
                    <div className="space-y-4">
                      {/* Account Name */}
                      <div className="space-y-2">
                        <Label htmlFor="accountName" className="flex items-center gap-2 text-white">
                          <User className="w-4 h-4" />
                          Account Name *
                        </Label>
                        <Input
                          id="accountName"
                          placeholder="Your game account name"
                          value={formData.accountName}
                          onChange={(e) => handleInputChange("accountName", e.target.value)}
                          className="glass border-white/20 text-white placeholder:text-white/40 focus:border-purple-500/50"
                          required
                        />
                      </div>

                      {/* MLBB ID & Server ID */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="mlbbId" className="flex items-center gap-2 text-white">
                            <User className="w-4 h-4" />
                            MLBB ID *
                          </Label>
                          <Input
                            id="mlbbId"
                            placeholder="123456789"
                            value={formData.mlbbId}
                            onChange={(e) => handleInputChange("mlbbId", e.target.value)}
                            className="glass border-white/20 text-white placeholder:text-white/40 focus:border-purple-500/50"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="serverId" className="flex items-center gap-2 text-white">
                            <Server className="w-4 h-4" />
                            Server ID *
                          </Label>
                          <Input
                            id="serverId"
                            placeholder="2001"
                            value={formData.serverId}
                            onChange={(e) => handleInputChange("serverId", e.target.value)}
                            className="glass border-white/20 text-white placeholder:text-white/40 focus:border-purple-500/50"
                            required
                          />
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="flex items-center gap-2 text-white">
                          <Phone className="w-4 h-4" />
                          Phone Number *
                        </Label>
                        <Input
                          id="phoneNumber"
                          placeholder="09xxxxxxxxx"
                          value={formData.phoneNumber}
                          onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                          className="glass border-white/20 text-white placeholder:text-white/40 focus:border-purple-500/50"
                          required
                        />
                      </div>

                      {/* Payment Method */}
                      <div className="space-y-3">
                        <Label className="flex items-center gap-2 text-white">
                          <CreditCard className="w-4 h-4" />
                          Payment Method 🇲🇲 *
                        </Label>
                        <RadioGroup
                          value={formData.paymentMethod}
                          onValueChange={(value) => handleInputChange("paymentMethod", value)}
                          className="space-y-3"
                        >
                          {activePaymentMethods.map((payment) => (
                            <div
                              key={payment.id}
                              className="glass border-white/20 rounded-xl p-4 hover:border-purple-500/30 transition-colors"
                            >
                              <div className="flex items-center space-x-3">
                                <RadioGroupItem value={payment.type} id={payment.type} className="border-white/40" />
                                <Label htmlFor={payment.type} className="flex items-center gap-3 cursor-pointer flex-1">
                                  <div
                                    className="w-10 h-10 rounded-xl text-white text-sm flex items-center justify-center font-bold"
                                    style={{
                                      background:
                                        payment.type === "kpay"
                                          ? "linear-gradient(135deg, #3b82f6, #1d4ed8)"
                                          : "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                                    }}
                                  >
                                    {payment.type.charAt(0).toUpperCase()}
                                  </div>
                                  <div className="flex-1">
                                    <div className="font-medium text-white">
                                      {payment.type.toUpperCase()}
                                      {payment.username ? `(${payment.username})` : ""}
                                    </div>
                                    <div className="text-sm text-white/60">
                                      {payment.accountHolder} • {payment.phoneNumber}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-xs text-green-400 font-medium">
                                      {Math.round((1 - payment.currentUsage / payment.dailyLimit) * 100)}% Available
                                    </div>
                                    <div className="w-16 h-1 bg-white/20 rounded-full mt-1">
                                      <div
                                        className="h-full bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"
                                        style={{ width: `${(1 - payment.currentUsage / payment.dailyLimit) * 100}%` }}
                                      ></div>
                                    </div>
                                  </div>
                                </Label>
                              </div>
                            </div>
                          ))}
                        </RadioGroup>

                        {activePaymentMethods.length === 0 && (
                          <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                            <p className="text-red-300 text-sm font-medium">
                              ⚠️ No payment methods available. Please contact support.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Transaction Screenshot */}
                      <div className="space-y-2">
                        <Label htmlFor="screenshot" className="flex items-center gap-2 text-white">
                          <Upload className="w-4 h-4" />
                          Transaction Screenshot *
                        </Label>
                        <div className="border-2 border-dashed border-white/30 rounded-2xl p-8 text-center glass hover:border-purple-500/50 transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="screenshot"
                            required
                          />
                          <label htmlFor="screenshot" className="cursor-pointer">
                            {screenshotPreview ? (
                              <div className="space-y-4">
                                <img
                                  src={screenshotPreview || "/placeholder.svg"}
                                  alt="Screenshot preview"
                                  className="w-32 h-32 object-cover rounded-xl mx-auto border-2 border-white/20"
                                />
                                <p className="text-white font-medium">{screenshot?.name}</p>
                                <p className="text-white/60 text-sm">Click to change image</p>
                              </div>
                            ) : (
                              <>
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                  <Upload className="w-6 h-6 text-white" />
                                </div>
                                <p className="text-white font-medium mb-2">Upload transaction screenshot</p>
                                <p className="text-white/60 text-sm">PNG, JPG up to 5MB</p>
                              </>
                            )}
                          </label>
                        </div>
                      </div>

                      {/* Order Limits Info */}
                      <div className="p-4 bg-blue-500/20 rounded-2xl border border-blue-500/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-4 h-4 text-blue-400" />
                          <span className="text-blue-300 font-medium text-sm">Order Information</span>
                        </div>
                        <div className="text-xs text-blue-200 space-y-1">
                          <p>
                            Min: {systemSettings.minOrderAmount.toLocaleString()} MMK • Max:{" "}
                            {systemSettings.maxOrderAmount.toLocaleString()} MMK
                          </p>
                          <p>Daily limit: {systemSettings.maxOrdersPerDay} orders per customer</p>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="w-full h-14 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold text-lg rounded-2xl border-0 animate-gradient disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!selectedPackage || isSubmitting || activePaymentMethods.length === 0}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          Processing Order...
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Diamond className="w-5 h-5" />
                          Complete Purchase
                        </div>
                      )}
                    </Button>

                    {systemSettings.autoApproval && (
                      <div className="flex items-center justify-center gap-2 text-green-400 text-sm">
                        <Zap className="w-4 h-4" />
                        <span>Auto-approval enabled - Instant delivery!</span>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

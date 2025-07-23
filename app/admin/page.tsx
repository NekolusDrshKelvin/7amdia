"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Package,
  Edit,
  Trash2,
  Plus,
  CreditCard,
  Diamond,
  Calculator,
  Save,
  RefreshCw,
  Settings,
  Activity,
  Zap,
  Eye,
  Palette,
} from "lucide-react"
import { ModernNavigation } from "@/components/modern-navigation"
import { useStore, type Order, type PaymentMethod, type DiamondPackage } from "@/lib/store"

export default function AdminControlPanel() {
  const {
    orders,
    paymentMethods,
    diamondPackages,
    systemSettings,
    activityLogs,
    addOrder,
    updateOrder,
    deleteOrder,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod,
    addDiamondPackage,
    updateDiamondPackage,
    deleteDiamondPackage,
    updateSystemSettings,
    getStats,
  } = useStore()

  // Dialog states
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false)
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false)
  const [isPackageDialogOpen, setIsPackageDialogOpen] = useState(false)
  const [editingOrder, setEditingOrder] = useState<Order | null>(null)
  const [editingPayment, setEditingPayment] = useState<PaymentMethod | null>(null)
  const [editingPackage, setEditingPackage] = useState<DiamondPackage | null>(null)

  // Form states
  const [orderForm, setOrderForm] = useState<Partial<Order>>({})
  const [paymentForm, setPaymentForm] = useState<Partial<PaymentMethod>>({})
  const [packageForm, setPackageForm] = useState<Partial<DiamondPackage>>({})
  const [settingsForm, setSettingsForm] = useState(systemSettings)

  // Get real-time statistics
  const stats = getStats()

  // UTILITY FUNCTIONS
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "text-yellow-600 border-yellow-600 bg-yellow-50", icon: Clock },
      processing: { color: "text-blue-600 border-blue-600 bg-blue-50", icon: RefreshCw },
      completed: { color: "text-green-600 border-green-600 bg-green-50", icon: CheckCircle },
      rejected: { color: "text-red-600 border-red-600 bg-red-50", icon: XCircle },
      cancelled: { color: "text-gray-600 border-gray-600 bg-gray-50", icon: XCircle },
    }

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    const Icon = config.icon

    return (
      <Badge variant="outline" className={config.color}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const openEditDialog = (type: "order" | "payment" | "package", item: any) => {
    if (type === "order") {
      setEditingOrder(item)
      setOrderForm(item)
      setIsOrderDialogOpen(true)
    } else if (type === "payment") {
      setEditingPayment(item)
      setPaymentForm(item)
      setIsPaymentDialogOpen(true)
    } else if (type === "package") {
      setEditingPackage(item)
      setPackageForm(item)
      setIsPackageDialogOpen(true)
    }
  }

  const handleCreateOrder = () => {
    if (orderForm.customerName && orderForm.mlbbId && orderForm.diamonds && orderForm.price) {
      addOrder({
        mlbbId: orderForm.mlbbId || "",
        serverId: orderForm.serverId || "",
        phoneNumber: orderForm.phoneNumber || "",
        customerName: orderForm.customerName || "",
        email: "",
        diamonds: orderForm.diamonds || 0,
        price: orderForm.price || 0,
        paymentMethod: orderForm.paymentMethod || "",
        status: "pending",
        priority: orderForm.priority || "medium",
        notes: orderForm.notes || "",
        screenshot: orderForm.screenshot || "",
      })
      setOrderForm({})
      setIsOrderDialogOpen(false)
    }
  }

  const handleUpdateOrder = () => {
    if (editingOrder) {
      updateOrder(editingOrder.id, orderForm)
      setEditingOrder(null)
      setOrderForm({})
      setIsOrderDialogOpen(false)
    }
  }

  const handleCreatePayment = () => {
    if (paymentForm.name && paymentForm.type && paymentForm.phoneNumber) {
      addPaymentMethod({
        name: paymentForm.name || "",
        type: paymentForm.type || "kpay",
        phoneNumber: paymentForm.phoneNumber || "",
        accountHolder: paymentForm.accountHolder || "",
        isActive: paymentForm.isActive ?? true,
        dailyLimit: paymentForm.dailyLimit || 0,
        currentUsage: 0,
        qrCode: paymentForm.qrCode || "",
        notes: paymentForm.notes || "",
        username: paymentForm.username || "",
      })
      setPaymentForm({})
      setIsPaymentDialogOpen(false)
    }
  }

  const handleUpdatePayment = () => {
    if (editingPayment) {
      updatePaymentMethod(editingPayment.id, paymentForm)
      setEditingPayment(null)
      setPaymentForm({})
      setIsPaymentDialogOpen(false)
    }
  }

  const handleCreatePackage = () => {
    if (packageForm.diamonds && packageForm.price) {
      addDiamondPackage({
        diamonds: packageForm.diamonds || 0,
        price: packageForm.price || 0,
        originalPrice: packageForm.originalPrice,
        popular: packageForm.popular ?? false,
        isActive: packageForm.isActive ?? true,
        discount: packageForm.discount || 0,
        description: packageForm.description || "",
        category: packageForm.category || "popular",
        bonus: packageForm.bonus || 0,
      })
      setPackageForm({})
      setIsPackageDialogOpen(false)
    }
  }

  const handleUpdatePackage = () => {
    if (editingPackage) {
      updateDiamondPackage(editingPackage.id, packageForm)
      setEditingPackage(null)
      setPackageForm({})
      setIsPackageDialogOpen(false)
    }
  }

  const handleUpdateSettings = () => {
    updateSystemSettings(settingsForm)
  }

  // Add screenshot viewing dialog state
  const [viewingScreenshot, setViewingScreenshot] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <ModernNavigation />

      {/* Enhanced Header */}
      <div className="glass border-b border-white/10 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                🎛️ Master Admin Control Panel
              </h1>
              <p className="text-white/60 mt-2">Complete business control with real-time dashboard sync</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 glass rounded-xl border border-green-500/30">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-300">Live Sync Active</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 glass rounded-xl border border-blue-500/30">
                <Calculator className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-blue-300">Real-time Updates</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 glass border-white/20">
            <TabsTrigger value="dashboard">📊 Dashboard</TabsTrigger>
            <TabsTrigger value="orders">📦 Orders</TabsTrigger>
            <TabsTrigger value="payments">💳 Payments</TabsTrigger>
            <TabsTrigger value="packages">💎 Packages</TabsTrigger>
            <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
            <TabsTrigger value="activity">📋 Activity</TabsTrigger>
          </TabsList>

          {/* REAL-TIME DASHBOARD */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Live Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Total Revenue</p>
                      <p className="text-3xl font-bold">{stats.totalRevenue.toLocaleString()}</p>
                      <p className="text-xs text-green-100 mt-1">MMK</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-green-200" />
                  </div>
                  <div className="mt-2 text-sm text-green-100">
                    Pending: {stats.pendingRevenue.toLocaleString()} MMK
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Total Orders</p>
                      <p className="text-3xl font-bold">{stats.totalOrders}</p>
                      <p className="text-xs text-blue-100 mt-1">All time</p>
                    </div>
                    <Package className="w-8 h-8 text-blue-200" />
                  </div>
                  <div className="mt-2 text-sm text-blue-100">
                    Pending: {stats.pendingOrders} | Completed: {stats.completedOrders}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Diamonds Sold</p>
                      <p className="text-3xl font-bold">{stats.totalDiamonds.toLocaleString()}</p>
                      <p className="text-xs text-purple-100 mt-1">Total delivered</p>
                    </div>
                    <Diamond className="w-8 h-8 text-purple-200" />
                  </div>
                  <div className="mt-2 text-sm text-purple-100">Active Packages: {stats.activePackages}</div>
                </CardContent>
              </Card>

              <Card className="glass border-white/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Avg Order Value</p>
                      <p className="text-3xl font-bold">{Math.round(stats.averageOrderValue).toLocaleString()}</p>
                      <p className="text-xs text-orange-100 mt-1">MMK per order</p>
                    </div>
                    <Calculator className="w-8 h-8 text-orange-200" />
                  </div>
                  <div className="mt-2 text-sm text-orange-100">Payment Methods: {stats.activePaymentMethods}</div>
                </CardContent>
              </Card>
            </div>

            {/* System Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    System Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Maintenance Mode</span>
                      <Badge variant={systemSettings.maintenanceMode ? "destructive" : "default"}>
                        {systemSettings.maintenanceMode ? "ON" : "OFF"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Auto Approval</span>
                      <Badge variant={systemSettings.autoApproval ? "default" : "secondary"}>
                        {systemSettings.autoApproval ? "ON" : "OFF"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Daily Order Limit</span>
                      <span className="font-bold">{systemSettings.maxOrdersPerDay}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {activityLogs.slice(0, 5).map((log) => (
                      <div key={log.id} className="text-sm">
                        <div className="font-medium">{log.action}</div>
                        <div className="text-gray-500 text-xs">{log.timestamp}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button
                      className="w-full bg-transparent"
                      variant="outline"
                      onClick={() => {
                        updateSystemSettings({ maintenanceMode: !systemSettings.maintenanceMode })
                      }}
                    >
                      {systemSettings.maintenanceMode ? "Disable" : "Enable"} Maintenance
                    </Button>
                    <Button
                      className="w-full bg-transparent"
                      variant="outline"
                      onClick={() => {
                        updateSystemSettings({ autoApproval: !systemSettings.autoApproval })
                      }}
                    >
                      {systemSettings.autoApproval ? "Disable" : "Enable"} Auto Approval
                    </Button>
                    <Button className="w-full bg-transparent" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      View Live Site
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* ORDER MANAGEMENT */}
          <TabsContent value="orders" className="space-y-6">
            <Card className="glass border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Order Management</CardTitle>
                    <CardDescription>
                      Create, update, and manage customer orders - Changes reflect instantly on dashboard
                    </CardDescription>
                  </div>
                  <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setEditingOrder(null)
                          setOrderForm({})
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Order
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>{editingOrder ? "Edit Order" : "Create New Order"}</DialogTitle>
                        <DialogDescription>
                          {editingOrder
                            ? "Update order information"
                            : "Add a new customer order with game account details"}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Account Name *</Label>
                          <Input
                            value={orderForm.customerName || ""}
                            onChange={(e) => setOrderForm((prev) => ({ ...prev, customerName: e.target.value }))}
                            placeholder="Game account name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>MLBB ID *</Label>
                          <Input
                            value={orderForm.mlbbId || ""}
                            onChange={(e) => setOrderForm((prev) => ({ ...prev, mlbbId: e.target.value }))}
                            placeholder="123456789"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Server ID *</Label>
                          <Input
                            value={orderForm.serverId || ""}
                            onChange={(e) => setOrderForm((prev) => ({ ...prev, serverId: e.target.value }))}
                            placeholder="2001"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Phone Number *</Label>
                          <Input
                            value={orderForm.phoneNumber || ""}
                            onChange={(e) => setOrderForm((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                            placeholder="09xxxxxxxxx"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Payment Method</Label>
                          <Select
                            value={orderForm.paymentMethod || ""}
                            onValueChange={(value) => setOrderForm((prev) => ({ ...prev, paymentMethod: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                            <SelectContent>
                              {paymentMethods
                                .filter((p) => p.isActive)
                                .map((payment) => (
                                  <SelectItem key={payment.id} value={payment.type}>
                                    {payment.name} ({payment.type.toUpperCase()})
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Diamonds *</Label>
                          <Input
                            type="number"
                            value={orderForm.diamonds || ""}
                            onChange={(e) =>
                              setOrderForm((prev) => ({ ...prev, diamonds: Number.parseInt(e.target.value) }))
                            }
                            placeholder="112"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Price (MMK) *</Label>
                          <Input
                            type="number"
                            value={orderForm.price || ""}
                            onChange={(e) =>
                              setOrderForm((prev) => ({ ...prev, price: Number.parseInt(e.target.value) }))
                            }
                            placeholder="9000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Priority</Label>
                          <Select
                            value={orderForm.priority || "medium"}
                            onValueChange={(value: any) => setOrderForm((prev) => ({ ...prev, priority: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Status</Label>
                          <Select
                            value={orderForm.status || "pending"}
                            onValueChange={(value: any) => setOrderForm((prev) => ({ ...prev, status: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label>Notes</Label>
                          <Textarea
                            value={orderForm.notes || ""}
                            onChange={(e) => setOrderForm((prev) => ({ ...prev, notes: e.target.value }))}
                            placeholder="Additional notes..."
                          />
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label>Screenshot URL (Optional)</Label>
                          <Input
                            value={orderForm.screenshot || ""}
                            onChange={(e) => setOrderForm((prev) => ({ ...prev, screenshot: e.target.value }))}
                            placeholder="Screenshot URL or base64 data"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOrderDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={editingOrder ? handleUpdateOrder : handleCreateOrder}>
                          <Save className="w-4 h-4 mr-2" />
                          {editingOrder ? "Update Order" : "Create Order"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="glass border-white/20 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold">
                                {order.customerName.charAt(0)}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-lg">{order.id}</span>
                                  {getStatusBadge(order.status)}
                                  <Badge
                                    variant="outline"
                                    className={
                                      order.priority === "high"
                                        ? "text-red-600 border-red-600"
                                        : order.priority === "medium"
                                          ? "text-yellow-600 border-yellow-600"
                                          : "text-gray-600 border-gray-600"
                                    }
                                  >
                                    {order.priority?.toUpperCase()}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-600">
                                  {order.customerName} • {order.phoneNumber}
                                </p>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 text-sm">
                              <div>
                                <span className="text-gray-500 block">Account Name</span>
                                <span className="font-medium">{order.customerName}</span>
                              </div>
                              <div>
                                <span className="text-gray-500 block">MLBB ID</span>
                                <span className="font-medium">{order.mlbbId}</span>
                              </div>
                              <div>
                                <span className="text-gray-500 block">Server</span>
                                <span className="font-medium">{order.serverId}</span>
                              </div>
                              <div>
                                <span className="text-gray-500 block">Diamonds</span>
                                <span className="font-medium text-cyan-600">{order.diamonds} 💎</span>
                              </div>
                              <div>
                                <span className="text-gray-500 block">Amount</span>
                                <span className="font-medium text-green-600">{order.price.toLocaleString()} MMK</span>
                              </div>
                              <div>
                                <span className="text-gray-500 block">Screenshot</span>
                                {order.screenshot ? (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setViewingScreenshot(order.screenshot!)}
                                    className="h-6 px-2 text-xs"
                                  >
                                    <Eye className="w-3 h-3 mr-1" />
                                    View
                                  </Button>
                                ) : (
                                  <span className="text-gray-400 text-xs">No image</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => openEditDialog("order", order)}>
                              <Edit className="w-4 h-4 mr-1" />
                              Edit
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="w-4 h-4 mr-1" />
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Order</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete order {order.id}? This action cannot be undone and
                                    will update the dashboard immediately.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deleteOrder(order.id)}>Delete</AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                            {order.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => updateOrder(order.id, { status: "processing" })}
                                  className="bg-blue-600 hover:bg-blue-700"
                                >
                                  <RefreshCw className="w-4 h-4 mr-1" />
                                  Process
                                </Button>
                                <Button
                                  size="sm"
                                  onClick={() => updateOrder(order.id, { status: "completed" })}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Complete
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => updateOrder(order.id, { status: "rejected" })}
                                >
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PAYMENT METHODS MANAGEMENT */}
          <TabsContent value="payments" className="space-y-6">
            <Card className="glass border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      Manage payment accounts - Changes instantly affect customer payment options
                    </CardDescription>
                  </div>
                  <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setEditingPayment(null)
                          setPaymentForm({})
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Payment Method
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{editingPayment ? "Edit Payment Method" : "Add Payment Method"}</DialogTitle>
                        <DialogDescription>
                          {editingPayment ? "Update payment method details" : "Add a new payment method"}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Payment Name *</Label>
                          <Input
                            value={paymentForm.name || ""}
                            onChange={(e) => setPaymentForm((prev) => ({ ...prev, name: e.target.value }))}
                            placeholder="KPAY Primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Payment Type *</Label>
                          <Select
                            value={paymentForm.type || ""}
                            onValueChange={(value: any) => setPaymentForm((prev) => ({ ...prev, type: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="kpay">KPAY</SelectItem>
                              <SelectItem value="wavepay">WAVEPAY</SelectItem>
                              <SelectItem value="aya">AYA Pay</SelectItem>
                              <SelectItem value="cb">CB Bank</SelectItem>
                              <SelectItem value="uab">UAB Pay</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Phone Number *</Label>
                          <Input
                            value={paymentForm.phoneNumber || ""}
                            onChange={(e) => setPaymentForm((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                            placeholder="09xxxxxxxxx"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Account Holder *</Label>
                          <Input
                            value={paymentForm.accountHolder || ""}
                            onChange={(e) => setPaymentForm((prev) => ({ ...prev, accountHolder: e.target.value }))}
                            placeholder="Account holder name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Daily Limit (MMK)</Label>
                          <Input
                            type="number"
                            value={paymentForm.dailyLimit || ""}
                            onChange={(e) =>
                              setPaymentForm((prev) => ({ ...prev, dailyLimit: Number.parseInt(e.target.value) }))
                            }
                            placeholder="500000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Notes</Label>
                          <Textarea
                            value={paymentForm.notes || ""}
                            onChange={(e) => setPaymentForm((prev) => ({ ...prev, notes: e.target.value }))}
                            placeholder="Additional notes..."
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Username (Optional)</Label>
                          <Input
                            value={paymentForm.username || ""}
                            onChange={(e) => setPaymentForm((prev) => ({ ...prev, username: e.target.value }))}
                            placeholder="admin_kpay"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={paymentForm.isActive ?? true}
                            onCheckedChange={(checked) => setPaymentForm((prev) => ({ ...prev, isActive: checked }))}
                          />
                          <Label>Active (Available for customers)</Label>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPaymentDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={editingPayment ? handleUpdatePayment : handleCreatePayment}>
                          <Save className="w-4 h-4 mr-2" />
                          {editingPayment ? "Update" : "Add"} Payment Method
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {paymentMethods.map((payment) => (
                    <Card key={payment.id} className="glass border-white/20 hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                payment.type === "kpay"
                                  ? "bg-blue-100"
                                  : payment.type === "wavepay"
                                    ? "bg-purple-100"
                                    : "bg-gray-100"
                              }`}
                            >
                              <CreditCard
                                className={`w-6 h-6 ${
                                  payment.type === "kpay"
                                    ? "text-blue-600"
                                    : payment.type === "wavepay"
                                      ? "text-purple-600"
                                      : "text-gray-600"
                                }`}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                {payment.type.toUpperCase()}
                                {payment.username ? `(${payment.username})` : ""}
                              </h3>
                              <p className="text-sm text-gray-600">{payment.accountHolder}</p>
                            </div>
                          </div>
                          <Badge variant={payment.isActive ? "default" : "secondary"}>
                            {payment.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Phone:</span>
                            <span className="font-medium">{payment.phoneNumber}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Account Holder:</span>
                            <span className="font-medium">{payment.accountHolder}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Daily Limit:</span>
                            <span className="font-medium text-blue-600">{payment.dailyLimit.toLocaleString()} MMK</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Current Usage:</span>
                            <span className="font-medium text-green-600">
                              {payment.currentUsage.toLocaleString()} MMK
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(payment.currentUsage / payment.dailyLimit) * 100}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500">
                            {Math.round((payment.currentUsage / payment.dailyLimit) * 100)}% of daily limit used
                          </p>
                        </div>

                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm" onClick={() => openEditDialog("payment", payment)}>
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Payment Method</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete {payment.name}? This will immediately remove it from
                                  customer payment options.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deletePaymentMethod(payment.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DIAMOND PACKAGES MANAGEMENT */}
          <TabsContent value="packages" className="space-y-6">
            <Card className="glass border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Diamond Packages</CardTitle>
                    <CardDescription>
                      Manage diamond packages - Changes instantly update customer package options
                    </CardDescription>
                  </div>
                  <Dialog open={isPackageDialogOpen} onOpenChange={setIsPackageDialogOpen}>
                    <DialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setEditingPackage(null)
                          setPackageForm({})
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Package
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{editingPackage ? "Edit Package" : "Add Diamond Package"}</DialogTitle>
                        <DialogDescription>
                          {editingPackage ? "Update package details" : "Create a new diamond package"}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Diamonds *</Label>
                            <Input
                              type="number"
                              value={packageForm.diamonds || ""}
                              onChange={(e) =>
                                setPackageForm((prev) => ({ ...prev, diamonds: Number.parseInt(e.target.value) }))
                              }
                              placeholder="112"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Price (MMK) *</Label>
                            <Input
                              type="number"
                              value={packageForm.price || ""}
                              onChange={(e) =>
                                setPackageForm((prev) => ({ ...prev, price: Number.parseInt(e.target.value) }))
                              }
                              placeholder="9000"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Original Price (Optional)</Label>
                            <Input
                              type="number"
                              value={packageForm.originalPrice || ""}
                              onChange={(e) =>
                                setPackageForm((prev) => ({ ...prev, originalPrice: Number.parseInt(e.target.value) }))
                              }
                              placeholder="10000"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Discount (%)</Label>
                            <Input
                              type="number"
                              value={packageForm.discount || ""}
                              onChange={(e) =>
                                setPackageForm((prev) => ({ ...prev, discount: Number.parseInt(e.target.value) }))
                              }
                              placeholder="10"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Category</Label>
                          <Select
                            value={packageForm.category || "popular"}
                            onValueChange={(value: any) => setPackageForm((prev) => ({ ...prev, category: value }))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="starter">Starter</SelectItem>
                              <SelectItem value="popular">Popular</SelectItem>
                              <SelectItem value="value">Value</SelectItem>
                              <SelectItem value="premium">Premium</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={packageForm.description || ""}
                            onChange={(e) => setPackageForm((prev) => ({ ...prev, description: e.target.value }))}
                            placeholder="Package description..."
                          />
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={packageForm.popular ?? false}
                              onCheckedChange={(checked) => setPackageForm((prev) => ({ ...prev, popular: checked }))}
                            />
                            <Label>Popular Package</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={packageForm.isActive ?? true}
                              onCheckedChange={(checked) => setPackageForm((prev) => ({ ...prev, isActive: checked }))}
                            />
                            <Label>Active (Visible to customers)</Label>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPackageDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button onClick={editingPackage ? handleUpdatePackage : handleCreatePackage}>
                          <Save className="w-4 h-4 mr-2" />
                          {editingPackage ? "Update" : "Add"} Package
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {diamondPackages.map((pkg) => (
                    <Card key={pkg.id} className="glass border-white/20 hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                              <Diamond className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-lg">{pkg.diamonds}</span>
                            <span className="text-blue-500">💎</span>
                            {pkg.popular && <Badge className="bg-red-500 text-white text-xs">Popular</Badge>}
                          </div>
                          <Badge variant={pkg.isActive ? "default" : "secondary"}>
                            {pkg.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>

                        <div className="text-right mb-3">
                          <div className="flex items-center justify-end gap-2">
                            {pkg.originalPrice && pkg.originalPrice > pkg.price && (
                              <span className="text-sm text-gray-500 line-through">
                                {pkg.originalPrice.toLocaleString()}
                              </span>
                            )}
                            <div className="text-2xl font-bold text-green-600">{pkg.price.toLocaleString()}</div>
                          </div>
                          <div className="text-sm text-gray-500">MMK</div>
                          {pkg.discount && pkg.discount > 0 && (
                            <div className="text-xs text-red-600 font-medium">{pkg.discount}% OFF</div>
                          )}
                        </div>

                        <div className="mb-3">
                          <Badge variant="outline" className="text-xs">
                            {pkg.category?.toUpperCase()}
                          </Badge>
                        </div>

                        {pkg.description && (
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{pkg.description}</p>
                        )}

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => openEditDialog("package", pkg)}>
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="w-4 h-4 mr-1" />
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Package</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete the {pkg.diamonds} diamond package? This will
                                  immediately remove it from customer options.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteDiamondPackage(pkg.id)}>
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SYSTEM SETTINGS */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Site Configuration
                  </CardTitle>
                  <CardDescription>Changes instantly reflect on the main website</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Site Name</Label>
                    <Input
                      value={settingsForm.siteName}
                      onChange={(e) => setSettingsForm((prev) => ({ ...prev, siteName: e.target.value }))}
                      placeholder="7AM Diamond"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Site Description</Label>
                    <Input
                      value={settingsForm.siteDescription}
                      onChange={(e) => setSettingsForm((prev) => ({ ...prev, siteDescription: e.target.value }))}
                      placeholder="Mobile Legends Diamond Top-up Myanmar"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Welcome Message</Label>
                    <Input
                      value={settingsForm.welcomeMessage}
                      onChange={(e) => setSettingsForm((prev) => ({ ...prev, welcomeMessage: e.target.value }))}
                      placeholder="🎮 Mobile Legends Diamond Top-up 😊💎"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Contact Phone</Label>
                    <Input
                      value={settingsForm.contactPhone}
                      onChange={(e) => setSettingsForm((prev) => ({ ...prev, contactPhone: e.target.value }))}
                      placeholder="09950971136"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Business Hours</Label>
                    <Input
                      value={settingsForm.businessHours}
                      onChange={(e) => setSettingsForm((prev) => ({ ...prev, businessHours: e.target.value }))}
                      placeholder="24/7"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Support Email</Label>
                    <Input
                      type="email"
                      value={settingsForm.supportEmail}
                      onChange={(e) => setSettingsForm((prev) => ({ ...prev, supportEmail: e.target.value }))}
                      placeholder="support@7amdiamond.com"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    System Controls
                  </CardTitle>
                  <CardDescription>Instant system-wide controls</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Maintenance Mode</Label>
                      <p className="text-sm text-gray-600">Temporarily disable the website</p>
                    </div>
                    <Switch
                      checked={settingsForm.maintenanceMode}
                      onCheckedChange={(checked) => setSettingsForm((prev) => ({ ...prev, maintenanceMode: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto Approval</Label>
                      <p className="text-sm text-gray-600">Automatically approve orders</p>
                    </div>
                    <Switch
                      checked={settingsForm.autoApproval}
                      onCheckedChange={(checked) => setSettingsForm((prev) => ({ ...prev, autoApproval: checked }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Max Orders Per Day</Label>
                    <Input
                      type="number"
                      value={settingsForm.maxOrdersPerDay}
                      onChange={(e) =>
                        setSettingsForm((prev) => ({ ...prev, maxOrdersPerDay: Number.parseInt(e.target.value) }))
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Min Order Amount</Label>
                      <Input
                        type="number"
                        value={settingsForm.minOrderAmount}
                        onChange={(e) =>
                          setSettingsForm((prev) => ({ ...prev, minOrderAmount: Number.parseInt(e.target.value) }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Max Order Amount</Label>
                      <Input
                        type="number"
                        value={settingsForm.maxOrderAmount}
                        onChange={(e) =>
                          setSettingsForm((prev) => ({ ...prev, maxOrderAmount: Number.parseInt(e.target.value) }))
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="w-5 h-5" />
                    Theme Settings
                  </CardTitle>
                  <CardDescription>Customize website appearance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Primary Color</Label>
                    <Input
                      type="color"
                      value={settingsForm.theme.primaryColor}
                      onChange={(e) =>
                        setSettingsForm((prev) => ({
                          ...prev,
                          theme: { ...prev.theme, primaryColor: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Secondary Color</Label>
                    <Input
                      type="color"
                      value={settingsForm.theme.secondaryColor}
                      onChange={(e) =>
                        setSettingsForm((prev) => ({
                          ...prev,
                          theme: { ...prev.theme, secondaryColor: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Accent Color</Label>
                    <Input
                      type="color"
                      value={settingsForm.theme.accentColor}
                      onChange={(e) =>
                        setSettingsForm((prev) => ({
                          ...prev,
                          theme: { ...prev.theme, accentColor: e.target.value },
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass border-white/20">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Email Notifications</Label>
                    <Switch
                      checked={settingsForm.notifications.email}
                      onCheckedChange={(checked) =>
                        setSettingsForm((prev) => ({
                          ...prev,
                          notifications: { ...prev.notifications, email: checked },
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>SMS Notifications</Label>
                    <Switch
                      checked={settingsForm.notifications.sms}
                      onCheckedChange={(checked) =>
                        setSettingsForm((prev) => ({
                          ...prev,
                          notifications: { ...prev.notifications, sms: checked },
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Push Notifications</Label>
                    <Switch
                      checked={settingsForm.notifications.push}
                      onCheckedChange={(checked) =>
                        setSettingsForm((prev) => ({
                          ...prev,
                          notifications: { ...prev.notifications, push: checked },
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle>Apply Settings</CardTitle>
                <CardDescription>Save changes to update the live website instantly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button onClick={handleUpdateSettings} className="bg-gradient-to-r from-purple-600 to-blue-600">
                    <Save className="w-4 h-4 mr-2" />
                    Save All Settings
                  </Button>
                  <Button variant="outline" onClick={() => setSettingsForm(systemSettings)}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reset Changes
                  </Button>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ACTIVITY LOG */}
          <TabsContent value="activity" className="space-y-6">
            <Card className="glass border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Activity Log & System Monitoring
                </CardTitle>
                <CardDescription>Real-time tracking of all admin actions and system changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityLogs.map((log) => (
                    <Card key={log.id} className="glass border-white/20 hover:shadow-sm transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="mt-1">
                            {log.type === "order" && <Package className="w-4 h-4 text-blue-600" />}
                            {log.type === "payment" && <CreditCard className="w-4 h-4 text-green-600" />}
                            {log.type === "package" && <Diamond className="w-4 h-4 text-purple-600" />}
                            {log.type === "settings" && <Settings className="w-4 h-4 text-orange-600" />}
                            {log.type === "system" && <Zap className="w-4 h-4 text-red-600" />}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{log.action}</h4>
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="outline"
                                  className={
                                    log.severity === "error"
                                      ? "text-red-600 border-red-600"
                                      : log.severity === "warning"
                                        ? "text-yellow-600 border-yellow-600"
                                        : log.severity === "success"
                                          ? "text-green-600 border-green-600"
                                          : "text-blue-600 border-blue-600"
                                  }
                                >
                                  {log.severity.toUpperCase()}
                                </Badge>
                                <span className="text-sm text-gray-500">{log.timestamp}</span>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span>Admin: {log.adminName}</span>
                              <span>Type: {log.type}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {activityLogs.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No activity logs yet. Start making changes to see them here!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {/* Add screenshot viewing dialog */}
      <Dialog open={!!viewingScreenshot} onOpenChange={() => setViewingScreenshot(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Transaction Screenshot</DialogTitle>
            <DialogDescription>Customer payment proof</DialogDescription>
          </DialogHeader>
          {viewingScreenshot && (
            <div className="flex justify-center">
              <img
                src={viewingScreenshot || "/placeholder.svg"}
                alt="Transaction screenshot"
                className="max-w-full max-h-96 object-contain rounded-lg border"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

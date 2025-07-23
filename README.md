# 7AM Diamond - Mobile Legends Top-up Platform

A dynamic web application for Mobile Legends diamond top-up services in Myanmar.

## 🌐 Live Website
- **Production**: https://7amdiamond.com
- **Staging**: https://7amdiamond.vercel.app

## 🚀 Features

### Customer Features
- Interactive diamond package selection
- Real-time form validation
- KPAY & WAVEPAY payment integration
- Transaction screenshot upload
- Order tracking
- Mobile responsive design

### Admin Features
- Order management dashboard
- Real-time statistics
- Search and filter orders
- Order status management
- Revenue tracking

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Deployment**: Vercel

## 📱 Pages
- `/` - Home (Diamond packages & order form)
- `/about` - About us and features
- `/contact` - Contact information and form
- `/terms` - Terms of service
- `/privacy` - Privacy policy
- `/admin` - Admin dashboard

## 🔧 Setup Instructions

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/yourusername/7amdiamond.git
   cd 7amdiamond
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Environment setup**
   \`\`\`bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   \`\`\`

4. **Run development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Build for production**
   \`\`\`bash
   npm run build
   \`\`\`

## 🌍 Domain Setup

### Custom Domain Configuration
1. Purchase domain: `7amdiamond.com`
2. Configure DNS settings:
   - A record: `@` → Vercel IP
   - CNAME: `www` → `7amdiamond.vercel.app`
3. Add domain in Vercel dashboard
4. Update environment variables

### SEO Optimization
- Sitemap: `/sitemap.xml`
- Robots: `/robots.txt`
- Open Graph meta tags
- Twitter Card support
- Structured data markup

## 📊 Analytics & Monitoring
- Google Analytics integration
- Performance monitoring
- Error tracking
- User behavior analysis

## 🔒 Security Features
- Input validation
- XSS protection
- CSRF protection
- Secure headers
- Rate limiting

## 📞 Support
- Phone: 09950971136
- Email: support@7amdiamond.com
- Live Chat: Available 24/7

## 📄 License
© 2024 7AM Diamond. All rights reserved.
\`\`\`

```typescriptreact file="app/admin/page.tsx"
[v0-no-op-code-block-prefix]"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, XCircle, Clock, Search, Filter } from 'lucide-react'
import { Navigation } from "@/components/navigation"

interface Order {
  id: string
  mlbbId: string
  serverId: string
  phoneNumber: string
  diamonds: number
  price: number
  paymentMethod: string
  status: "pending" | "completed" | "rejected"
  createdAt: string
  screenshot?: string
}

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: "ORD001",
    mlbbId: "123456789",
    serverId: "2001",
    phoneNumber: "09123456789",
    diamonds: 112,
    price: 9000,
    paymentMethod: "kpay",
    status: "pending",
    createdAt: "2024-01-15 10:30:00",
  },
  {
    id: "ORD002",
    mlbbId: "987654321",
    serverId: "2002",
    phoneNumber: "09987654321",
    diamonds: 570,
    price: 45000,
    paymentMethod: "wavepay",
    status: "completed",
    createdAt: "2024-01-15 09:15:00",
  },
  {
    id: "ORD003",
    mlbbId: "456789123",
    serverId: "2001",
    phoneNumber: "09456789123",
    diamonds: 22,
    price: 2000,
    paymentMethod: "kpay",
    status: "rejected",
    createdAt: "2024-01-15 08:45:00",
  },
]

export default function AdminPanel() {
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [filteredOrders, setFilteredOrders] = useState<Order[]>(mockOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    let filtered = orders

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.mlbbId.includes(searchTerm) ||
          order.phoneNumber.includes(searchTerm) ||
          order.id.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter)
    }

    setFilteredOrders(filtered)
  }, [orders, searchTerm, statusFilter])

  const updateOrderStatus = (orderId: string, newStatus: "completed" | "rejected") => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            <XCircle className="w-3 h-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    completed: orders.filter((o) => o.status === "completed").length,
    rejected: orders.filter((o) => o.status === "rejected").length,
    totalRevenue: orders.filter((o) => o.status === "completed").reduce((sum, o) => sum + o.price, 0),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-purple-800">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-purple-200">Manage diamond top-up orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Orders</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-red-600">{stats.rejected}</div>
              <div className="text-sm text-gray-600">Rejected</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-purple-600">{stats.totalRevenue.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Revenue (MMK)</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search by Order ID, MLBB ID, or Phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Orders Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Manage and process diamond top-up orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div key={order.id} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg">{order.id}</span>
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">MLBB ID:</span>
                          <div className="font-medium">{order.mlbbId}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Server:</span>
                          <div className="font-medium">{order.serverId}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Phone:</span>
                          <div className="font-medium">{order.phoneNumber}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Payment:</span>
                          <div className="font-medium uppercase">{order.paymentMethod}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Diamonds:</span>
                          <span className="font-bold text-cyan-600 ml-1">{order.diamonds} 💎</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Amount:</span>
                          <span className="font-bold text-green-600 ml-1">{order.price.toLocaleString()} MMK</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Date:</span>
                          <span className="ml-1">{order.createdAt}</span>
                        </div>
                      </div>
                    </div>

                    {order.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => updateOrderStatus(order.id, "completed")}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => updateOrderStatus(order.id, "rejected")}>
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

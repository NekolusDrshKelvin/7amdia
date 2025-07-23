"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

// Enhanced Interfaces
export interface Order {
  id: string
  mlbbId: string
  serverId: string
  phoneNumber: string
  AccountName: string
  email?: string
  diamonds: number
  price: number
  paymentMethod: string
  status: "pending" | "completed" | "rejected" | "processing" | "cancelled"
  createdAt: string
  updatedAt: string
  notes?: string
  priority: "low" | "medium" | "high"
  screenshot?: string // Add screenshot field
}

export interface PaymentMethod {
  id: string
  name: string
  type: "kpay" | "wavepay" | "aya" | "cb" | "uab"
  phoneNumber: string
  accountHolder: string
  username?: string // Add username field
  isActive: boolean
  dailyLimit: number
  currentUsage: number
  qrCode?: string
  notes?: string
}

export interface DiamondPackage {
  id: string
  diamonds: number
  price: number
  originalPrice?: number
  popular: boolean
  isActive: boolean
  discount?: number
  description?: string
  category: "starter" | "popular" | "value" | "premium"
  bonus?: number
}

export interface SystemSettings {
  siteName: string
  siteDescription: string
  contactPhone: string
  maintenanceMode: boolean
  autoApproval: boolean
  maxOrdersPerDay: number
  minOrderAmount: number
  maxOrderAmount: number
  supportEmail: string
  businessHours: string
  welcomeMessage: string
  featuredPackages: string[]
  theme: {
    primaryColor: string
    secondaryColor: string
    accentColor: string
  }
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
}

export interface ActivityLog {
  id: string
  adminName: string
  action: string
  details: string
  timestamp: string
  type: "order" | "payment" | "package" | "system" | "settings"
  severity: "info" | "warning" | "error" | "success"
}

interface StoreState {
  // Data
  orders: Order[]
  paymentMethods: PaymentMethod[]
  diamondPackages: DiamondPackage[]
  systemSettings: SystemSettings
  activityLogs: ActivityLog[]

  // Actions
  addOrder: (order: Omit<Order, "id" | "createdAt" | "updatedAt">) => void
  updateOrder: (id: string, updates: Partial<Order>) => void
  deleteOrder: (id: string) => void

  addPaymentMethod: (payment: Omit<PaymentMethod, "id">) => void
  updatePaymentMethod: (id: string, updates: Partial<PaymentMethod>) => void
  deletePaymentMethod: (id: string) => void

  addDiamondPackage: (pkg: Omit<DiamondPackage, "id">) => void
  updateDiamondPackage: (id: string, updates: Partial<DiamondPackage>) => void
  deleteDiamondPackage: (id: string) => void

  updateSystemSettings: (updates: Partial<SystemSettings>) => void
  addActivityLog: (log: Omit<ActivityLog, "id" | "timestamp">) => void

  // Computed values
  getStats: () => {
    totalOrders: number
    pendingOrders: number
    completedOrders: number
    rejectedOrders: number
    processingOrders: number
    totalRevenue: number
    pendingRevenue: number
    totalDiamonds: number
    activePaymentMethods: number
    activePackages: number
    averageOrderValue: number
  }
}

// Initial Data
const initialOrders: Order[] = [
  {
    id: "ORD001",
    mlbbId: "123456789",
    serverId: "2001",
    phoneNumber: "09123456789",
    customerName: "Aung Aung",
    email: "aung@example.com",
    diamonds: 112,
    price: 9000,
    paymentMethod: "kpay",
    status: "pending",
    createdAt: "2024-01-15 10:30:00",
    updatedAt: "2024-01-15 10:30:00",
    priority: "medium",
    screenshot:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=", // Sample base64 image
  },
  {
    id: "ORD002",
    mlbbId: "987654321",
    serverId: "2002",
    phoneNumber: "09987654321",
    customerName: "Thant Zin",
    email: "thant@example.com",
    diamonds: 570,
    price: 45000,
    paymentMethod: "wavepay",
    status: "completed",
    createdAt: "2024-01-15 09:15:00",
    updatedAt: "2024-01-15 09:20:00",
    priority: "high",
    screenshot:
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
  },
]

const initialPaymentMethods: PaymentMethod[] = [
  {
    id: "PAY001",
    name: "KPAY Primary",
    type: "kpay",
    phoneNumber: "09950971136",
    accountHolder: "Admin User",
    username: "admin_kpay", // Add username
    isActive: true,
    dailyLimit: 500000,
    currentUsage: 125000,
    notes: "Primary payment method",
  },
  {
    id: "PAY002",
    name: "WAVEPAY Secondary",
    type: "wavepay",
    phoneNumber: "09950971136",
    accountHolder: "Admin User",
    username: "admin_wave", // Add username
    isActive: true,
    dailyLimit: 300000,
    currentUsage: 75000,
    notes: "Secondary payment method",
  },
]

const initialDiamondPackages: DiamondPackage[] = [
  { id: "DP001", diamonds: 11, price: 1000, popular: false, isActive: true, category: "starter" },
  { id: "DP002", diamonds: 22, price: 2000, popular: false, isActive: true, category: "starter" },
  { id: "DP003", diamonds: 56, price: 4800, popular: false, isActive: true, category: "popular" },
  { id: "DP004", diamonds: 86, price: 5500, popular: false, isActive: true, category: "popular" },
  { id: "DP005", diamonds: 112, price: 9000, popular: true, isActive: true, category: "popular" },
  { id: "DP006", diamonds: 172, price: 12000, popular: false, isActive: true, category: "value" },
  { id: "DP007", diamonds: 223, price: 18000, popular: false, isActive: true, category: "value" },
  { id: "DP008", diamonds: 257, price: 17500, popular: false, isActive: true, category: "value" },
  { id: "DP009", diamonds: 336, price: 27000, popular: false, isActive: true, category: "premium" },
  { id: "DP010", diamonds: 570, price: 45000, popular: false, isActive: true, category: "premium" },
]

const initialSystemSettings: SystemSettings = {
  siteName: "7AM Diamond",
  siteDescription: "Mobile Legends Diamond Top-up Myanmar",
  contactPhone: "09950971136",
  maintenanceMode: false,
  autoApproval: false,
  maxOrdersPerDay: 100,
  minOrderAmount: 1000,
  maxOrderAmount: 500000,
  supportEmail: "support@7amdiamond.com",
  businessHours: "24/7",
  welcomeMessage: "🎮 Mobile Legends Diamond Top-up 😊💎",
  featuredPackages: ["DP005", "DP010"],
  theme: {
    primaryColor: "#7c3aed",
    secondaryColor: "#2563eb",
    accentColor: "#06b6d4",
  },
  notifications: {
    email: true,
    sms: true,
    push: true,
  },
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      orders: initialOrders,
      paymentMethods: initialPaymentMethods,
      diamondPackages: initialDiamondPackages,
      systemSettings: initialSystemSettings,
      activityLogs: [],

      // Order actions
      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: `ORD${String(get().orders.length + 1).padStart(3, "0")}`,
          createdAt: new Date().toLocaleString(),
          updatedAt: new Date().toLocaleString(),
        }
        set((state) => ({
          orders: [...state.orders, newOrder],
        }))
        get().addActivityLog({
          adminName: "Admin User",
          action: "Order Created",
          details: `Created new order ${newOrder.id} for ${orderData.customerName}`,
          type: "order",
          severity: "success",
        })
      },

      updateOrder: (id, updates) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === id ? { ...order, ...updates, updatedAt: new Date().toLocaleString() } : order,
          ),
        }))
        get().addActivityLog({
          adminName: "Admin User",
          action: "Order Updated",
          details: `Updated order ${id}`,
          type: "order",
          severity: "info",
        })
      },

      deleteOrder: (id) => {
        const order = get().orders.find((o) => o.id === id)
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== id),
        }))
        get().addActivityLog({
          adminName: "Admin User",
          action: "Order Deleted",
          details: `Deleted order ${id} - ${order?.customerName}`,
          type: "order",
          severity: "warning",
        })
      },

      // Payment method actions
      addPaymentMethod: (paymentData) => {
        const newPayment: PaymentMethod = {
          ...paymentData,
          id: `PAY${String(get().paymentMethods.length + 1).padStart(3, "0")}`,
        }
        set((state) => ({
          paymentMethods: [...state.paymentMethods, newPayment],
        }))
        get().addActivityLog({
          adminName: "Admin User",
          action: "Payment Method Added",
          details: `Added ${paymentData.name} (${paymentData.type.toUpperCase()})`,
          type: "payment",
          severity: "success",
        })
      },

      updatePaymentMethod: (id, updates) => {
        set((state) => ({
          paymentMethods: state.paymentMethods.map((payment) =>
            payment.id === id ? { ...payment, ...updates } : payment,
          ),
        }))
        get().addActivityLog({
          adminName: "Admin User",
          action: "Payment Method Updated",
          details: `Updated payment method ${id}`,
          type: "payment",
          severity: "info",
        })
      },

      deletePaymentMethod: (id) => {
        const payment = get().paymentMethods.find((p) => p.id === id)
        set((state) => ({
          paymentMethods: state.paymentMethods.filter((payment) => payment.id !== id),
        }))
        get().addActivityLog({
          adminName: "Admin User",
          action: "Payment Method Deleted",
          details: `Deleted payment method ${payment?.name}`,
          type: "payment",
          severity: "warning",
        })
      },

      // Diamond package actions
      addDiamondPackage: (packageData) => {
        const newPackage: DiamondPackage = {
          ...packageData,
          id: `DP${String(get().diamondPackages.length + 1).padStart(3, "0")}`,
        }
        set((state) => ({
          diamondPackages: [...state.diamondPackages, newPackage],
        }))
        get().addActivityLog({
          adminName: "Admin User",
          action: "Package Added",
          details: `Added ${packageData.diamonds} diamond package for ${packageData.price} MMK`,
          type: "package",
          severity: "success",
        })
      },

      updateDiamondPackage: (id, updates) => {
        set((state) => ({
          diamondPackages: state.diamondPackages.map((pkg) => (pkg.id === id ? { ...pkg, ...updates } : pkg)),
        }))
        get().addActivityLog({
          adminName: "Admin User",
          action: "Package Updated",
          details: `Updated diamond package ${id}`,
          type: "package",
          severity: "info",
        })
      },

      deleteDiamondPackage: (id) => {
        const pkg = get().diamondPackages.find((p) => p.id === id)
        set((state) => ({
          diamondPackages: state.diamondPackages.filter((pkg) => pkg.id !== id),
        }))
        get().addActivityLog({
          adminName: "Admin User",
          action: "Package Deleted",
          details: `Deleted ${pkg?.diamonds} diamond package`,
          type: "package",
          severity: "warning",
        })
      },

      // System settings actions
      updateSystemSettings: (updates) => {
        set((state) => ({
          systemSettings: { ...state.systemSettings, ...updates },
        }))
        get().addActivityLog({
          adminName: "Admin User",
          action: "Settings Updated",
          details: `Updated system settings: ${Object.keys(updates).join(", ")}`,
          type: "settings",
          severity: "info",
        })
      },

      // Activity log actions
      addActivityLog: (logData) => {
        const newLog: ActivityLog = {
          ...logData,
          id: `LOG${Date.now()}`,
          timestamp: new Date().toLocaleString(),
        }
        set((state) => ({
          activityLogs: [newLog, ...state.activityLogs.slice(0, 99)], // Keep last 100 logs
        }))
      },

      // Computed stats
      getStats: () => {
        const { orders, paymentMethods, diamondPackages } = get()
        return {
          totalOrders: orders.length,
          pendingOrders: orders.filter((o) => o.status === "pending").length,
          completedOrders: orders.filter((o) => o.status === "completed").length,
          rejectedOrders: orders.filter((o) => o.status === "rejected").length,
          processingOrders: orders.filter((o) => o.status === "processing").length,
          totalRevenue: orders.filter((o) => o.status === "completed").reduce((sum, o) => sum + o.price, 0),
          pendingRevenue: orders.filter((o) => o.status === "pending").reduce((sum, o) => sum + o.price, 0),
          totalDiamonds: orders.filter((o) => o.status === "completed").reduce((sum, o) => sum + o.diamonds, 0),
          activePaymentMethods: paymentMethods.filter((p) => p.isActive).length,
          activePackages: diamondPackages.filter((p) => p.isActive).length,
          averageOrderValue: orders.length > 0 ? orders.reduce((sum, o) => sum + o.price, 0) / orders.length : 0,
        }
      },
    }),
    {
      name: "diamond-store",
    },
  ),
)

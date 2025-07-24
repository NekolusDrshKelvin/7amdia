-- Drop existing tables if they exist
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS payment_methods CASCADE;
DROP TABLE IF EXISTS diamond_packages CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table with updated structure
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) NOT NULL UNIQUE,
    account_name VARCHAR(100) NOT NULL,
    mlbb_id VARCHAR(20) NOT NULL,
    server_id VARCHAR(10) NOT NULL,
    total_orders INTEGER DEFAULT 0,
    total_spent INTEGER DEFAULT 0,
    loyalty_points INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced diamond packages table
CREATE TABLE diamond_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    diamonds INTEGER NOT NULL DEFAULT 0,
    price_mmk INTEGER NOT NULL,
    original_price_mmk INTEGER,
    type VARCHAR(20) NOT NULL CHECK (type IN ('STARTER', 'POPULAR', 'VALUE', 'WEEKLY_PASS', 'MONTHLY_PASS')),
    package_type VARCHAR(20) DEFAULT 'diamonds' CHECK (package_type IN ('diamonds', 'weekly_pass', 'monthly_pass')),
    duration VARCHAR(20),
    is_popular BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    delivery_speed VARCHAR(20) DEFAULT 'Fast',
    is_available BOOLEAN DEFAULT TRUE,
    stock_quantity INTEGER DEFAULT -1, -- -1 means unlimited
    description TEXT,
    bonus_percentage INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced payment methods table
CREATE TABLE payment_methods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(50) NOT NULL,
    code VARCHAR(20) UNIQUE NOT NULL,
    display_name VARCHAR(100) NOT NULL,
    admin_account VARCHAR(100) NOT NULL,
    admin_phone VARCHAR(20) NOT NULL,
    qr_code_url TEXT,
    instructions TEXT,
    availability_percentage INTEGER DEFAULT 100,
    is_active BOOLEAN DEFAULT TRUE,
    processing_fee_percentage DECIMAL(5,2) DEFAULT 0,
    min_amount INTEGER DEFAULT 0,
    max_amount INTEGER DEFAULT 999999999,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_number VARCHAR(20) UNIQUE NOT NULL,
    user_id UUID REFERENCES users(id),
    package_id UUID REFERENCES diamond_packages(id),
    payment_method_id UUID REFERENCES payment_methods(id),
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled', 'refunded')),
    total_amount INTEGER NOT NULL,
    processing_fee INTEGER DEFAULT 0,
    final_amount INTEGER NOT NULL,
    transaction_screenshot_url TEXT,
    transaction_reference VARCHAR(100),
    admin_notes TEXT,
    customer_notes TEXT,
    completed_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '24 hours'),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enhanced transactions table
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id),
    transaction_id VARCHAR(100) UNIQUE,
    payment_method VARCHAR(50) NOT NULL,
    amount INTEGER NOT NULL,
    currency VARCHAR(10) DEFAULT 'MMK',
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
    gateway_response JSONB,
    processed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Order history view
CREATE VIEW order_history AS
SELECT 
    o.id,
    o.order_number,
    o.status,
    o.total_amount,
    o.created_at,
    u.account_name,
    u.phone,
    dp.name as package_name,
    dp.diamonds,
    dp.package_type,
    pm.display_name as payment_method
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN diamond_packages dp ON o.package_id = dp.id
JOIN payment_methods pm ON o.payment_method_id = pm.id;

-- Create indexes for better performance
CREATE INDEX idx_users_phone ON users(phone);
CREATE INDEX idx_users_mlbb_id ON users(mlbb_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_orders_order_number ON orders(order_number);
CREATE INDEX idx_transactions_order_id ON transactions(order_id);
CREATE INDEX idx_diamond_packages_type ON diamond_packages(type);
CREATE INDEX idx_diamond_packages_available ON diamond_packages(is_available);

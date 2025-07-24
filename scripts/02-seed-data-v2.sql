-- Insert enhanced diamond packages
INSERT INTO diamond_packages (name, diamonds, price_mmk, original_price_mmk, type, package_type, is_popular, bonus_percentage, description) VALUES
('Starter Pack', 11, 1000, 1200, 'STARTER', 'diamonds', FALSE, 20, 'Perfect for beginners - get 11 diamonds with 20% bonus!'),
('Basic Pack', 22, 2000, 2400, 'STARTER', 'diamonds', FALSE, 20, 'Great value pack with 22 diamonds and bonus rewards'),
('Popular Pack', 56, 4800, 5600, 'POPULAR', 'diamonds', TRUE, 17, 'Most popular choice! 56 diamonds with extra bonus'),
('Power Pack', 86, 5500, 6800, 'POPULAR', 'diamonds', TRUE, 24, 'Power up your game with 86 diamonds and huge savings'),
('Pro Pack', 112, 9000, 11200, 'POPULAR', 'diamonds', TRUE, 25, 'For serious players - 112 diamonds with maximum value'),
('Ultimate Pack', 172, 12000, 15000, 'VALUE', 'diamonds', FALSE, 25, 'Ultimate gaming experience with 172 diamonds'),
('Weekly Pass', 0, 6700, 7500, 'WEEKLY_PASS', 'weekly_pass', TRUE, 12, 'Unlock exclusive rewards and bonuses for 7 days', '1 week'),
('Monthly Pass', 0, 25000, 30000, 'MONTHLY_PASS', 'monthly_pass', FALSE, 20, 'Premium monthly benefits and exclusive content', '30 days');

-- Insert enhanced payment methods
INSERT INTO payment_methods (name, code, display_name, admin_account, admin_phone, availability_percentage, instructions) VALUES
('KPAY', 'kpay', 'KBZ Pay', 'admin_kpay', '09950971136', 85, 'Send payment to KBZ Pay account and upload screenshot'),
('WAVEPAY', 'wavepay', 'Wave Money', 'admin_wave', '09950971136', 80, 'Transfer to Wave Money account and provide transaction reference'),
('CBPAY', 'cbpay', 'CB Bank Pay', 'admin_cbpay', '09950971136', 75, 'Use CB Bank mobile app to transfer funds'),
('AYAPAY', 'ayapay', 'AYA Pay', 'admin_ayapay', '09950971136', 70, 'Send money via AYA Pay and upload proof of payment');

-- Generate sample order numbers function
CREATE OR REPLACE FUNCTION generate_order_number() RETURNS TEXT AS $$
BEGIN
    RETURN '7AM' || TO_CHAR(NOW(), 'YYYYMMDD') || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Insert sample users for testing
INSERT INTO users (phone, account_name, mlbb_id, server_id) VALUES
('09123456789', 'TestPlayer1', '123456789', '2001'),
('09987654321', 'TestPlayer2', '987654321', '2002'),
('09555666777', 'TestPlayer3', '555666777', '2001');

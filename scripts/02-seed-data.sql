-- Insert diamond packages
INSERT INTO diamond_packages (diamonds, price_mmk, type, is_popular) VALUES
(11, 1000, 'STARTER', FALSE),
(22, 2000, 'STARTER', FALSE),
(56, 4800, 'POPULAR', TRUE),
(86, 5500, 'POPULAR', TRUE),
(112, 9000, 'POPULAR', TRUE),
(172, 12000, 'VALUE', FALSE);

-- Add the weekly pass as a special package
INSERT INTO diamond_packages (diamonds, price_mmk, type, is_popular, delivery_speed) VALUES
(0, 6700, 'WEEKLY_PASS', TRUE, 'Instant');

-- Update the diamond_packages table to support weekly pass
ALTER TABLE diamond_packages ADD COLUMN package_type VARCHAR(20) DEFAULT 'diamonds';
ALTER TABLE diamond_packages ADD COLUMN duration VARCHAR(20);

-- Update existing records
UPDATE diamond_packages SET package_type = 'diamonds' WHERE package_type IS NULL;

-- Update the weekly pass record
UPDATE diamond_packages SET 
    package_type = 'weekly_pass',
    duration = '1 week'
WHERE type = 'WEEKLY_PASS';

-- Insert payment methods
INSERT INTO payment_methods (name, code, admin_account, admin_phone, availability_percentage) VALUES
('KPAY', 'kpay', 'admin_kpay', '09950971136', 75),
('WAVEPAY', 'wavepay', 'admin_wave', '09950971136', 75);

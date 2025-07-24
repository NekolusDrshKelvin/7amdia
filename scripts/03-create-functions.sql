-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_diamond_packages_updated_at BEFORE UPDATE ON diamond_packages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to get user order history
CREATE OR REPLACE FUNCTION get_user_order_history(user_uuid UUID)
RETURNS TABLE (
    order_id UUID,
    diamonds INTEGER,
    amount INTEGER,
    status VARCHAR,
    payment_method VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        o.id,
        dp.diamonds,
        o.total_amount,
        o.status,
        pm.name,
        o.created_at
    FROM orders o
    JOIN diamond_packages dp ON o.package_id = dp.id
    JOIN payment_methods pm ON o.payment_method_id = pm.id
    WHERE o.user_id = user_uuid
    ORDER BY o.created_at DESC;
END;
$$ LANGUAGE plpgsql;

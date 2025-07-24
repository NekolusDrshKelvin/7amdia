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

-- Function to update user statistics
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        UPDATE users SET 
            total_orders = total_orders + 1,
            total_spent = total_spent + NEW.final_amount,
            loyalty_points = loyalty_points + FLOOR(NEW.final_amount / 1000)
        WHERE id = NEW.user_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_stats_trigger
    AFTER UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_user_stats();

-- Function to get user order history with enhanced details
CREATE OR REPLACE FUNCTION get_user_order_history(user_uuid UUID)
RETURNS TABLE (
    order_id UUID,
    order_number VARCHAR,
    package_name VARCHAR,
    diamonds INTEGER,
    amount INTEGER,
    status VARCHAR,
    payment_method VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        o.id,
        o.order_number,
        dp.name,
        dp.diamonds,
        o.final_amount,
        o.status,
        pm.display_name,
        o.created_at,
        o.completed_at
    FROM orders o
    JOIN diamond_packages dp ON o.package_id = dp.id
    JOIN payment_methods pm ON o.payment_method_id = pm.id
    WHERE o.user_id = user_uuid
    ORDER BY o.created_at DESC;
END;
$$ LANGUAGE plpgsql;

-- Function to get sales analytics
CREATE OR REPLACE FUNCTION get_sales_analytics(days_back INTEGER DEFAULT 30)
RETURNS TABLE (
    total_orders BIGINT,
    completed_orders BIGINT,
    pending_orders BIGINT,
    total_revenue BIGINT,
    avg_order_value NUMERIC,
    conversion_rate NUMERIC,
    top_package VARCHAR,
    top_payment_method VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    WITH order_stats AS (
        SELECT 
            COUNT(*) as total_orders,
            COUNT(*) FILTER (WHERE status = 'completed') as completed_orders,
            COUNT(*) FILTER (WHERE status = 'pending') as pending_orders,
            SUM(final_amount) FILTER (WHERE status = 'completed') as total_revenue,
            AVG(final_amount) FILTER (WHERE status = 'completed') as avg_order_value
        FROM orders 
        WHERE created_at >= NOW() - INTERVAL '1 day' * days_back
    ),
    top_package AS (
        SELECT dp.name
        FROM orders o
        JOIN diamond_packages dp ON o.package_id = dp.id
        WHERE o.created_at >= NOW() - INTERVAL '1 day' * days_back
        AND o.status = 'completed'
        GROUP BY dp.name
        ORDER BY COUNT(*) DESC
        LIMIT 1
    ),
    top_payment AS (
        SELECT pm.display_name
        FROM orders o
        JOIN payment_methods pm ON o.payment_method_id = pm.id
        WHERE o.created_at >= NOW() - INTERVAL '1 day' * days_back
        AND o.status = 'completed'
        GROUP BY pm.display_name
        ORDER BY COUNT(*) DESC
        LIMIT 1
    )
    SELECT 
        os.total_orders,
        os.completed_orders,
        os.pending_orders,
        COALESCE(os.total_revenue, 0),
        COALESCE(os.avg_order_value, 0),
        CASE 
            WHEN os.total_orders > 0 THEN (os.completed_orders::NUMERIC / os.total_orders::NUMERIC) * 100
            ELSE 0
        END,
        COALESCE(tp.name, 'N/A'),
        COALESCE(tpm.display_name, 'N/A')
    FROM order_stats os
    CROSS JOIN top_package tp
    CROSS JOIN top_payment tpm;
END;
$$ LANGUAGE plpgsql;

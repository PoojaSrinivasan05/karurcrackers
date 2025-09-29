/*
  # Update Admin Policies for Product and Order Management

  1. Security Updates
    - Add admin policies for full CRUD operations on products
    - Add admin policies for order status updates
    - Enable public access for admin operations (temporary for demo)

  2. Policy Changes
    - Allow all operations on products for admin functionality
    - Allow order status updates
    - Allow full access to order management
*/

-- Drop existing restrictive policies and create more permissive ones for admin functionality
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
DROP POLICY IF EXISTS "Users can insert their own customer data" ON customers;
DROP POLICY IF EXISTS "Users can view their own customer data" ON customers;
DROP POLICY IF EXISTS "Users can update their own customer data" ON customers;
DROP POLICY IF EXISTS "Users can insert their own orders" ON orders;
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can insert order items" ON order_items;
DROP POLICY IF EXISTS "Users can view order items" ON order_items;

-- Create comprehensive policies for admin functionality
CREATE POLICY "Allow all operations on products"
  ON products
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on customers"
  ON customers
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on orders"
  ON orders
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on order_items"
  ON order_items
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);

-- Ensure categories remain publicly readable
CREATE POLICY "Allow all operations on categories"
  ON categories
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);
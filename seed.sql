-- Insert Seed Users
INSERT INTO users (name, email) VALUES 
('Folusho Sanni', 'folusho@example.com'),
('Test User', 'testuser@example.com');

-- Insert Seed Categories
INSERT INTO categories (name, type) VALUES 
('Salary', 'Income'),
('Freelance', 'Income'),
('Housing', 'Expense'),
('Food & Groceries', 'Expense'),
('Education', 'Expense'),
('Utilities', 'Expense');

-- Insert Seed Items (Resources)
INSERT INTO items (user_id, category_id, name, quantity, estimated_cost) VALUES 
(1, 5, 'TypeScript Course Textbook', 1, 45.00),
(1, 6, 'Development Server Hosting', 1, 20.00),
(1, 4, 'Weekly Grocery Essentials', 1, 150.00);

-- Insert Seed Transactions
INSERT INTO transactions (user_id, category_id, amount, description, transaction_date) VALUES 
(1, 1, 2800.00, 'Primary Monthly Salary', '2026-08-01'),
(1, 2, 600.00, 'Software Consulting Project', '2026-08-01'),
(1, 3, 750.00, 'Monthly House Rent', '2026-08-01'),
(1, 4, 250.00, 'Supermarket Supplies', '2026-08-01'),
(1, 5, 40.00, 'Academic Course Materials', '2026-08-01');
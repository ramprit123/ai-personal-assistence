/*
  # Insert Default Categories

  1. Changes
    - Insert default expense categories for new users
    - Categories include common expense types with icons and colors

  2. Security
    - Categories are inserted with NULL user_id
    - Will be copied for each user upon signup
*/

INSERT INTO categories (name, icon, color, user_id) VALUES
  ('Food', '🍔', '#FF9500', NULL),
  ('Transport', '🚕', '#FF2D55', NULL),
  ('Shopping', '🛍️', '#5AC8FA', NULL),
  ('Healthcare', '🏥', '#5856D6', NULL),
  ('Entertainment', '🎬', '#FFCC00', NULL),
  ('Bills', '📄', '#FF3B30', NULL),
  ('Education', '📚', '#34C759', NULL),
  ('Travel', '✈️', '#007AFF', NULL),
  ('Groceries', '🛒', '#4CD964', NULL),
  ('Other', '📦', '#8E8E93', NULL);
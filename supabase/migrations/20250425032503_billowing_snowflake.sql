/*
  # Create Views for Expense Analytics

  1. New Views
    - `monthly_expenses_summary`
      - Total expenses by month
      - Comparison with previous month
    - `category_expenses_summary`
      - Total expenses by category
      - Percentage of total expenses
    - `upcoming_payments_view`
      - Upcoming reminders with payment amounts
      - Days until due

  2. Changes
    - Create views for expense analytics and reporting
    - Add functions for calculating expense trends
*/

-- Monthly expenses summary view
CREATE VIEW monthly_expenses_summary AS
SELECT
  date_trunc('month', date) as month,
  sum(amount) as total_amount,
  count(*) as transaction_count,
  user_id
FROM expenses
GROUP BY date_trunc('month', date), user_id;

-- Category expenses summary view
CREATE VIEW category_expenses_summary AS
WITH total_expenses AS (
  SELECT user_id, sum(amount) as total
  FROM expenses
  GROUP BY user_id
)
SELECT
  c.name,
  c.icon,
  c.color,
  sum(e.amount) as category_total,
  count(*) as transaction_count,
  (sum(e.amount) / NULLIF(t.total, 0) * 100) as percentage,
  e.user_id
FROM expenses e
JOIN categories c ON e.category_id = c.id
JOIN total_expenses t ON e.user_id = t.user_id
GROUP BY c.name, c.icon, c.color, e.user_id, t.total;

-- Upcoming payments view
CREATE VIEW upcoming_payments_view AS
SELECT
  r.id,
  r.title,
  r.description,
  r.due_date,
  r.repeat_type,
  r.user_id,
  EXTRACT(DAY FROM (r.due_date - CURRENT_TIMESTAMP)) as days_until_due
FROM reminders r
WHERE r.due_date > CURRENT_TIMESTAMP
  AND r.is_completed = false;

-- Function to get expense trend
CREATE OR REPLACE FUNCTION get_expense_trend(user_id_param uuid)
RETURNS TABLE (
  month date,
  total_amount numeric,
  change_percentage numeric
) AS $$
BEGIN
  RETURN QUERY
  WITH monthly_totals AS (
    SELECT
      date_trunc('month', date)::date as month,
      sum(amount) as total_amount
    FROM expenses
    WHERE user_id = user_id_param
    GROUP BY date_trunc('month', date)
    ORDER BY month DESC
    LIMIT 6
  )
  SELECT
    m.month,
    m.total_amount,
    CASE
      WHEN LAG(m.total_amount) OVER (ORDER BY m.month) IS NULL THEN 0
      ELSE ((m.total_amount - LAG(m.total_amount) OVER (ORDER BY m.month)) / 
            LAG(m.total_amount) OVER (ORDER BY m.month) * 100)
    END as change_percentage
  FROM monthly_totals m;
END;
$$ LANGUAGE plpgsql;
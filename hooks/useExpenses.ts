import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

type Expense = Database['public']['Tables']['expenses']['Row'];
type ExpenseWithCategory = Expense & {
  categories: {
    name: string;
    icon: string;
    color: string;
  } | null;
};

export function useExpenses(userId: string | undefined) {
  const [expenses, setExpenses] = useState<ExpenseWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchExpenses() {
      try {
        const { data, error } = await supabase
          .from('expenses')
          .select(`
            *,
            categories (
              name,
              icon,
              color
            )
          `)
          .eq('user_id', userId)
          .order('date', { ascending: false });

        if (error) throw error;

        setExpenses(data as ExpenseWithCategory[]);
        
        // Calculate total expenses
        const total = data.reduce((sum, expense) => sum + Number(expense.amount), 0);
        setTotalExpenses(total);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    }

    fetchExpenses();
  }, [userId]);

  const addExpense = async (expense: Omit<Database['public']['Tables']['expenses']['Insert'], 'id' | 'user_id'>) => {
    try {
      const { data, error } = await supabase
        .from('expenses')
        .insert([{ ...expense, user_id: userId }])
        .select()
        .single();

      if (error) throw error;

      setExpenses(prev => [data as ExpenseWithCategory, ...prev]);
      setTotalExpenses(prev => prev + Number(expense.amount));
      
      return data;
    } catch (e) {
      throw e instanceof Error ? e : new Error('Failed to add expense');
    }
  };

  return {
    expenses,
    loading,
    error,
    totalExpenses,
    addExpense,
  };
}
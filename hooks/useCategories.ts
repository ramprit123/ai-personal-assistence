import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

type Category = Database['public']['Tables']['categories']['Row'];

export function useCategories(userId: string | undefined) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchCategories() {
      try {
        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .eq('user_id', userId);

        if (error) throw error;

        setCategories(data);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, [userId]);

  const addCategory = async (category: Omit<Database['public']['Tables']['categories']['Insert'], 'id' | 'user_id'>) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert([{ ...category, user_id: userId }])
        .select()
        .single();

      if (error) throw error;

      setCategories(prev => [...prev, data]);
      return data;
    } catch (e) {
      throw e instanceof Error ? e : new Error('Failed to add category');
    }
  };

  return {
    categories,
    loading,
    error,
    addCategory,
  };
}
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Database } from '@/types/supabase';

type Reminder = Database['public']['Tables']['reminders']['Row'];

export function useReminders(userId: string | undefined) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    async function fetchReminders() {
      try {
        const { data, error } = await supabase
          .from('reminders')
          .select('*')
          .eq('user_id', userId)
          .order('due_date', { ascending: true });

        if (error) throw error;

        setReminders(data);
      } catch (e) {
        setError(e instanceof Error ? e : new Error('An error occurred'));
      } finally {
        setLoading(false);
      }
    }

    fetchReminders();
  }, [userId]);

  const addReminder = async (reminder: Omit<Database['public']['Tables']['reminders']['Insert'], 'id' | 'user_id'>) => {
    try {
      const { data, error } = await supabase
        .from('reminders')
        .insert([{ ...reminder, user_id: userId }])
        .select()
        .single();

      if (error) throw error;

      setReminders(prev => [...prev, data]);
      return data;
    } catch (e) {
      throw e instanceof Error ? e : new Error('Failed to add reminder');
    }
  };

  const toggleReminder = async (id: string, isCompleted: boolean) => {
    try {
      const { data, error } = await supabase
        .from('reminders')
        .update({ is_completed: isCompleted })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setReminders(prev =>
        prev.map(reminder =>
          reminder.id === id ? { ...reminder, is_completed: isCompleted } : reminder
        )
      );

      return data;
    } catch (e) {
      throw e instanceof Error ? e : new Error('Failed to update reminder');
    }
  };

  return {
    reminders,
    loading,
    error,
    addReminder,
    toggleReminder,
  };
}
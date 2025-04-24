import { create } from 'zustand';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signUp: (params: { email: string; password: string; fullName?: string }) => Promise<void>;
  signIn: (params: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (profile: { fullName?: string }) => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  session: null,
  loading: true,
  error: null,
  isAuthenticated: false,

  signUp: async ({ email, password, fullName }) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      if (error) throw error;
      set({
        user: data.user,
        session: data.session,
        isAuthenticated: !!data.session,
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to sign up' });
    } finally {
      set({ loading: false });
    }
  },

  signIn: async ({ email, password }) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      set({
        user: data.user,
        session: data.session,
        isAuthenticated: true,
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to sign in' });
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({
        user: null,
        session: null,
        isAuthenticated: false,
      });
    } catch (error: any) {
      set({ error: error.message || 'Failed to sign out' });
    } finally {
      set({ loading: false });
    }
  },

  resetPassword: async (email: string) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    } catch (error: any) {
      set({ error: error.message || 'Failed to reset password' });
    } finally {
      set({ loading: false });
    }
  },

  updateUserProfile: async ({ fullName }) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName },
      });
      if (error) throw error;
      const currentUser = get().user;
      if (currentUser) {
        set({
          user: {
            ...currentUser,
            user_metadata: { ...currentUser.user_metadata, full_name: fullName },
          },
        });
      }
    } catch (error: any) {
      set({ error: error.message || 'Failed to update profile' });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),
}));

// Initialize auth state listener
supabase.auth.onAuthStateChange((event, session) => {
  useAuthStore.setState({
    user: session?.user || null,
    session,
    isAuthenticated: !!session,
    loading: false,
  });
});
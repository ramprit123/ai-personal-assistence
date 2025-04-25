export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          icon: string
          color: string
          user_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          icon: string
          color: string
          user_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          icon?: string
          color?: string
          user_id?: string | null
          created_at?: string
        }
      }
      expenses: {
        Row: {
          id: string
          amount: number
          description: string | null
          date: string
          category_id: string | null
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          amount: number
          description?: string | null
          date?: string
          category_id?: string | null
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          amount?: number
          description?: string | null
          date?: string
          category_id?: string | null
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      reminders: {
        Row: {
          id: string
          title: string
          description: string | null
          due_date: string
          repeat_type: string | null
          is_completed: boolean
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          due_date: string
          repeat_type?: string | null
          is_completed?: boolean
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          due_date?: string
          repeat_type?: string | null
          is_completed?: boolean
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
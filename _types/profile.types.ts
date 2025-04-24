import { ReactNode } from 'react';

export interface ProfileItemProps {
  icon: ReactNode;
  title: string;
  value?: string;
  onPress: () => void;
}

export interface ToggleItemProps {
  icon: ReactNode;
  title: string;
  value: boolean;
  onToggle: () => void;
}

export interface ProfileSection {
  title: string;
  items: (ProfileItemProps | ToggleItemProps)[];
}

export interface ProfileScreenState {
  isDarkMode: boolean;
  is2FAEnabled: boolean;
}
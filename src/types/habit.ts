
export interface Habit {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  createdAt: Date;
  completedDates: Date[];
  frequency: {
    type: 'daily' | 'weekly' | 'monthly' | 'custom';
    days?: number[]; // 0-6 for days of week if weekly
    customDays?: number; // custom frequency in days
  };
  streak: number;
  goal?: number;
  reminderTime?: string;
}

export type HabitStatus = 'completed' | 'missed' | 'pending';

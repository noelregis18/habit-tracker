
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Habit } from '@/types/habit';
import { generateId } from '@/utils/habitUtils';

interface HabitContextType {
  habits: Habit[];
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'streak'>) => void;
  updateHabit: (habit: Habit) => void;
  deleteHabit: (id: string) => void;
  toggleHabitCompletion: (id: string, date: Date) => void;
  getHabit: (id: string) => Habit | undefined;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const useHabits = (): HabitContextType => {
  const context = useContext(HabitContext);
  if (!context) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};

interface HabitProviderProps {
  children: ReactNode;
}

export const HabitProvider: React.FC<HabitProviderProps> = ({ children }) => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    // Load habits from localStorage on initial render
    const savedHabits = localStorage.getItem('habits');
    if (savedHabits) {
      try {
        // Parse dates from string format
        const parsedHabits = JSON.parse(savedHabits);
        return parsedHabits.map((habit: any) => ({
          ...habit,
          createdAt: new Date(habit.createdAt),
          completedDates: habit.completedDates.map((date: string) => new Date(date))
        }));
      } catch (error) {
        console.error('Error parsing habits from localStorage', error);
        return [];
      }
    }
    return [];
  });

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habitData: Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'streak'>) => {
    const newHabit: Habit = {
      ...habitData,
      id: generateId(),
      createdAt: new Date(),
      completedDates: [],
      streak: 0
    };
    setHabits([...habits, newHabit]);
  };

  const updateHabit = (updatedHabit: Habit) => {
    setHabits(habits.map(habit => 
      habit.id === updatedHabit.id ? updatedHabit : habit
    ));
  };

  const deleteHabit = (id: string) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const toggleHabitCompletion = (id: string, date: Date) => {
    setHabits(habits.map(habit => {
      if (habit.id !== id) return habit;

      const isAlreadyCompleted = habit.completedDates.some(
        completedDate => 
          completedDate.getFullYear() === date.getFullYear() &&
          completedDate.getMonth() === date.getMonth() &&
          completedDate.getDate() === date.getDate()
      );

      let updatedCompletedDates;
      if (isAlreadyCompleted) {
        // Remove the date if already completed
        updatedCompletedDates = habit.completedDates.filter(
          completedDate => 
            !(completedDate.getFullYear() === date.getFullYear() &&
              completedDate.getMonth() === date.getMonth() &&
              completedDate.getDate() === date.getDate())
        );
      } else {
        // Add the date if not completed
        updatedCompletedDates = [...habit.completedDates, date];
      }

      // Recalculate streak
      let streak = 0;
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      // Sort dates in descending order
      const sortedDates = [...updatedCompletedDates].sort((a, b) => 
        b.getTime() - a.getTime()
      );

      if (sortedDates.length > 0) {
        const lastCompletedDate = sortedDates[0];
        const isTodayCompleted = lastCompletedDate.getFullYear() === today.getFullYear() &&
                                 lastCompletedDate.getMonth() === today.getMonth() &&
                                 lastCompletedDate.getDate() === today.getDate();
        
        const isYesterdayCompleted = lastCompletedDate.getFullYear() === yesterday.getFullYear() &&
                                    lastCompletedDate.getMonth() === yesterday.getMonth() &&
                                    lastCompletedDate.getDate() === yesterday.getDate();
        
        if (isTodayCompleted || isYesterdayCompleted) {
          streak = 1;
          // Count back through consecutive days
          for (let i = 1; i < sortedDates.length; i++) {
            const currentDate = sortedDates[i - 1];
            const prevDate = sortedDates[i];
            
            const dayDiff = Math.floor(
              (currentDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
            );
            
            if (dayDiff === 1) {
              streak++;
            } else {
              break;
            }
          }
        }
      }

      return {
        ...habit,
        completedDates: updatedCompletedDates,
        streak
      };
    }));
  };

  const getHabit = (id: string) => {
    return habits.find(habit => habit.id === id);
  };

  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        updateHabit,
        deleteHabit,
        toggleHabitCompletion,
        getHabit
      }}
    >
      {children}
    </HabitContext.Provider>
  );
};

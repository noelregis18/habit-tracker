import { Habit, HabitStatus } from '@/types/habit';

// Function to check if a habit was completed on a specific date
export const isHabitCompletedOnDate = (habit: Habit, date: Date): boolean => {
  return habit.completedDates.some(completedDate => 
    isSameDay(completedDate, date)
  );
};

// Function to determine habit status for a specific date
export const getHabitStatusForDate = (habit: Habit, date: Date): HabitStatus => {
  // If the date is in the future, it's pending
  if (date > new Date()) {
    return 'pending';
  }
  
  // If the habit was completed on this date
  if (isHabitCompletedOnDate(habit, date)) {
    return 'completed';
  }
  
  // Otherwise, it was missed
  return 'missed';
};

// Function to calculate current streak
export const calculateStreak = (habit: Habit): number => {
  let streak = 0;
  const today = new Date();
  const sortedDates = [...habit.completedDates].sort((a, b) => b.getTime() - a.getTime());
  
  // If no completed dates or the last completion wasn't today or yesterday, streak is 0
  if (sortedDates.length === 0) {
    return 0;
  }
  
  // Check if the most recent completion was today
  if (isSameDay(sortedDates[0], today)) {
    streak = 1;
  } else if (isYesterday(sortedDates[0], today)) {
    // Start counting from yesterday if that's when the last completion was
    streak = 1;
  } else {
    // Streak is broken if last completion was before yesterday
    return 0;
  }
  
  // Count consecutive days
  for (let i = 0; i < sortedDates.length - 1; i++) {
    const currentDate = sortedDates[i];
    const nextDate = sortedDates[i + 1];
    
    // If the dates are consecutive, increase the streak
    if (isConsecutiveDay(nextDate, currentDate)) {
      streak++;
    } else {
      break; // Break the streak if dates are not consecutive
    }
  }
  
  return streak;
};

// Helper function to determine if two dates are the same day
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

// Helper function to determine if a date is yesterday
export const isYesterday = (date: Date, today: Date): boolean => {
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDay(date, yesterday);
};

// Helper function to determine if two dates are consecutive days
export const isConsecutiveDay = (earlier: Date, later: Date): boolean => {
  const oneDayLater = new Date(earlier);
  oneDayLater.setDate(oneDayLater.getDate() + 1);
  return isSameDay(oneDayLater, later);
};

// Function to format date to display
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};

// Function to get dates for the current week
export const getWeekDates = (): Date[] => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 is Sunday, 6 is Saturday
  const dates = [];
  
  // Start from Sunday of current week
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - dayOfWeek + i);
    dates.push(date);
  }
  
  return dates;
};

// Function to generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

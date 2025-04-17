
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Calendar, Award, Target } from "lucide-react";
import { Habit } from "@/types/habit";
import { calculateStreak } from "@/utils/habitUtils";

interface HabitStatsProps {
  habits: Habit[];
}

const HabitStats = ({ habits }: HabitStatsProps) => {
  // Compute total habits
  const totalHabits = habits.length;
  
  // Compute total streak (sum of all streaks)
  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);
  
  // Compute longest streak
  const longestStreak = habits.length > 0 
    ? Math.max(...habits.map(habit => habit.streak))
    : 0;
  
  // Compute completion rate for today
  const today = new Date();
  const habitsCompletedToday = habits.filter(habit => 
    habit.completedDates.some(date => 
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    )
  ).length;
  
  const completionRate = habits.length > 0 
    ? Math.round((habitsCompletedToday / habits.length) * 100)
    : 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Habits</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalHabits}</div>
          <p className="text-xs text-muted-foreground">
            Habits being tracked
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Daily Progress</CardTitle>
          <Target className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completionRate}%</div>
          <Progress value={completionRate} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {habitsCompletedToday} of {totalHabits} completed today
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Streak Days</CardTitle>
          <Flame className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStreak}</div>
          <p className="text-xs text-muted-foreground">
            Days of consistent habits
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Longest Streak</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{longestStreak}</div>
          <p className="text-xs text-muted-foreground">
            Your best streak so far
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default HabitStats;

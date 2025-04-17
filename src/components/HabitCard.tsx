
import { Habit } from "@/types/habit";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, EditIcon, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDate, isHabitCompletedOnDate } from "@/utils/habitUtils";

interface HabitCardProps {
  habit: Habit;
  onToggleCompletion: (id: string, date: Date) => void;
  onEdit: (habit: Habit) => void;
  onDelete: (habit: Habit) => void; // Changed to receive the whole habit object
}

const HabitCard = ({ habit, onToggleCompletion, onEdit, onDelete }: HabitCardProps) => {
  const today = new Date();
  const isCompletedToday = isHabitCompletedOnDate(habit, today);
  
  const progressPercentage = habit.goal 
    ? Math.min(100, (habit.streak / habit.goal) * 100)
    : Math.min(100, habit.streak * 10); // 10% per day if no goal

  return (
    <Card className={cn(
      "transition-all duration-300",
      isCompletedToday ? "border-primary/50 bg-primary/5" : ""
    )}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{habit.name}</CardTitle>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={() => onEdit(habit)}
            >
              <EditIcon className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-destructive hover:text-destructive/90" 
              onClick={() => onDelete(habit)} // Pass the whole habit
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {habit.description && (
          <CardDescription className="text-sm">
            {habit.description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {habit.frequency.type === 'daily' 
                ? 'Daily habit' 
                : habit.frequency.type === 'weekly' 
                ? 'Weekly habit' 
                : 'Monthly habit'}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm">Today:</span>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "h-7 w-7 rounded-full", 
                  isCompletedToday 
                    ? "text-primary hover:text-primary/90 bg-primary/10" 
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => onToggleCompletion(habit.id, today)}
              >
                {isCompletedToday ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
          
          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span>Current streak</span>
              <span className="font-medium">{habit.streak} days</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-1 text-xs text-muted-foreground">
        Created on {formatDate(habit.createdAt)}
      </CardFooter>
    </Card>
  );
};

export default HabitCard;


import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface WelcomeBannerProps {
  completedToday: number;
  totalHabits: number;
  onAddHabit: () => void;
}

const WelcomeBanner = ({ 
  completedToday, 
  totalHabits, 
  onAddHabit 
}: WelcomeBannerProps) => {
  const getMessage = () => {
    if (totalHabits === 0) {
      return "Let's start building some positive habits today!";
    }
    
    if (completedToday === 0) {
      return "You have habits to complete today.";
    }
    
    if (completedToday < totalHabits) {
      return `You've completed ${completedToday} of ${totalHabits} habits today.`;
    }
    
    return "You've completed your habits for today.";
  };

  return (
    <div className="relative bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-lg p-6">
      <div className="max-w-3xl">
        <h1 className="text-2xl font-bold tracking-tight">
          GrowthHub
        </h1>
        
        <p className="mt-2 text-muted-foreground">
          {getMessage()}
        </p>
        
        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={onAddHabit} variant="default">
            <PlusCircle className="mr-2 h-4 w-4" />
            {totalHabits === 0 ? "Create Your First Habit" : "Add New Habit"}
          </Button>
        </div>
      </div>
      
      <div className="absolute right-6 top-6 hidden items-center justify-center md:flex">
        <div className="rounded-full bg-background/95 p-3 shadow-sm">
          {totalHabits === 0 ? (
            <div className="text-3xl">🚀</div>
          ) : completedToday === totalHabits ? (
            <div className="text-3xl">🎉</div>
          ) : (
            <div className="text-3xl">💪</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;

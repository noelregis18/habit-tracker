
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface NavbarProps {
  onAddHabit: () => void;
}

const Navbar = ({ onAddHabit }: NavbarProps) => {
  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="text-2xl font-bold text-primary">GrowthHub</div>
          <div className="hidden md:block text-sm text-muted-foreground">
            Track your daily habits
          </div>
        </Link>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="default" 
            size="sm" 
            className="rounded-full"
            onClick={onAddHabit}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Habit
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

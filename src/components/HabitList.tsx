import { useState } from "react";
import { Habit } from "@/types/habit";
import HabitCard from "./HabitCard";
import HabitForm from "./HabitForm";
import DeleteHabitDialog from "./DeleteHabitDialog";
import { Button } from "@/components/ui/button";
import { Grid, List, Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface HabitListProps {
  habits: Habit[];
  onToggleCompletion: (id: string, date: Date) => void;
  onAddHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'streak'>) => void;
  onUpdateHabit: (habit: Habit) => void;
  onDeleteHabit: (id: string) => void;
  onShowAddForm: () => void;
}

const HabitList = ({
  habits,
  onToggleCompletion,
  onAddHabit,
  onUpdateHabit,
  onDeleteHabit,
  onShowAddForm,
}: HabitListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editHabit, setEditHabit] = useState<Habit | null>(null);
  const [deleteHabit, setDeleteHabit] = useState<Habit | null>(null);

  // Filter habits based on search query
  const filteredHabits = habits.filter(
    (habit) =>
      habit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (habit.description &&
        habit.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleEditHabit = (habit: Habit) => {
    setEditHabit(habit);
  };

  const handleUpdateHabit = (updatedHabitData: Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'streak'>) => {
    if (editHabit) {
      onUpdateHabit({
        ...editHabit,
        ...updatedHabitData,
      });
      setEditHabit(null);
    }
  };
  
  const handleDeleteClick = (habit: Habit) => {
    setDeleteHabit(habit);
  };
  
  const handleConfirmDelete = () => {
    if (deleteHabit) {
      onDeleteHabit(deleteHabit.id);
      setDeleteHabit(null);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search habits..."
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <div className="flex items-center rounded-md border">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-none rounded-l-md",
                  viewMode === "grid" && "bg-muted"
                )}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-none rounded-r-md",
                  viewMode === "list" && "bg-muted"
                )}
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="default"
              size="sm"
              onClick={onShowAddForm}
            >
              <Plus className="mr-1 h-4 w-4" />
              Add Habit
            </Button>
          </div>
        </div>

        {filteredHabits.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">No habits found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {habits.length === 0
                ? "Start building some positive habits today!"
                : "Try a different search term or add a new habit."}
            </p>
            <Button 
              onClick={onShowAddForm} 
              className="mt-4"
            >
              <Plus className="mr-1 h-4 w-4" />
              Add Your First Habit
            </Button>
          </div>
        ) : (
          <>
            {searchQuery && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-2 py-1">
                  {filteredHabits.length} result{filteredHabits.length !== 1 ? "s" : ""}
                </Badge>
                {searchQuery && (
                  <Badge variant="secondary" className="px-2 py-1">
                    "{searchQuery}"
                    <button
                      className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-primary"
                      onClick={() => setSearchQuery("")}
                    >
                      ✕
                    </button>
                  </Badge>
                )}
              </div>
            )}
            <div
              className={cn(
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "flex flex-col gap-3"
              )}
            >
              {filteredHabits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggleCompletion={onToggleCompletion}
                  onEdit={handleEditHabit}
                  onDelete={handleDeleteClick}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Remove local form handling and rely on the parent component */}
      {editHabit && (
        <HabitForm
          open={!!editHabit}
          onClose={() => setEditHabit(null)}
          onSubmit={handleUpdateHabit}
          initialValues={editHabit}
          editMode={true}
        />
      )}
      
      {deleteHabit && (
        <DeleteHabitDialog
          open={!!deleteHabit}
          onClose={() => setDeleteHabit(null)}
          onConfirm={handleConfirmDelete}
          habitName={deleteHabit.name}
        />
      )}
    </>
  );
};

export default HabitList;

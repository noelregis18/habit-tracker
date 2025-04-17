
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HabitList from '@/components/HabitList';
import HabitStats from '@/components/HabitStats';
import WelcomeBanner from '@/components/WelcomeBanner';
import { useHabits } from '@/contexts/HabitContext';
import { Habit } from '@/types/habit';
import HabitForm from '@/components/HabitForm';

const Dashboard = () => {
  const { habits, addHabit, updateHabit, deleteHabit, toggleHabitCompletion } = useHabits();
  const [showAddHabitForm, setShowAddHabitForm] = useState(false);

  // Calculate stats for today
  const today = new Date();
  const habitsCompletedToday = habits.filter(habit => 
    habit.completedDates.some(date => 
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    )
  ).length;

  const handleAddHabit = (habit: Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'streak'>) => {
    addHabit(habit);
    setShowAddHabitForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onAddHabit={() => setShowAddHabitForm(true)} />

      <main className="flex-1 container py-6 space-y-6">
        <WelcomeBanner 
          completedToday={habitsCompletedToday} 
          totalHabits={habits.length} 
          onAddHabit={() => setShowAddHabitForm(true)} 
        />

        <Tabs defaultValue="habits" className="space-y-6">
          <TabsList>
            <TabsTrigger value="habits">My Habits</TabsTrigger>
            <TabsTrigger value="stats">Stats & Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="habits" className="space-y-6">
            <HabitList 
              habits={habits}
              onToggleCompletion={toggleHabitCompletion}
              onAddHabit={handleAddHabit}
              onUpdateHabit={updateHabit}
              onDeleteHabit={deleteHabit}
              onShowAddForm={() => setShowAddHabitForm(true)}
            />
          </TabsContent>
          
          <TabsContent value="stats">
            <div className="space-y-6">
              <HabitStats habits={habits} />
              
              {habits.length === 0 ? (
                <div className="mt-12 text-center">
                  <h3 className="text-lg font-medium">No stats to display yet</h3>
                  <p className="text-muted-foreground mt-1">
                    Add some habits to start tracking your progress
                  </p>
                </div>
              ) : null}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
      
      <HabitForm
        open={showAddHabitForm}
        onClose={() => setShowAddHabitForm(false)}
        onSubmit={handleAddHabit}
      />
    </div>
  );
};

const Index = () => {
  return (
    <Dashboard />
  );
};

export default Index;

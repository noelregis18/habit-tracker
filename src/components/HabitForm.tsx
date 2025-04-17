
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Habit } from "@/types/habit";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const frequencyTypes = ["daily", "weekly", "monthly", "custom"] as const;
type FrequencyType = typeof frequencyTypes[number];

const habitSchema = z.object({
  name: z.string().min(1, "Habit name is required").max(50, "Habit name is too long"),
  description: z.string().max(200, "Description is too long").optional(),
  frequency: z.object({
    type: z.enum(["daily", "weekly", "monthly", "custom"]),
    days: z.array(z.number()).optional(),
    customDays: z.number().min(1).optional(),
  }),
  goal: z.number().min(1).optional(),
  reminderTime: z.string().optional(),
});

type HabitFormValues = z.infer<typeof habitSchema>;

interface HabitFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (habitData: Omit<Habit, 'id' | 'createdAt' | 'completedDates' | 'streak'>) => void;
  initialValues?: Partial<Habit>;
  editMode?: boolean;
}

const HabitForm = ({ open, onClose, onSubmit, initialValues, editMode = false }: HabitFormProps) => {
  // Default frequency type is daily if not provided
  const defaultType = initialValues?.frequency?.type ?? "daily";
  const [frequencyType, setFrequencyType] = useState<FrequencyType>(defaultType as FrequencyType);

  // Create complete form values with required fields
  const form = useForm<HabitFormValues>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      description: initialValues?.description ?? "",
      frequency: {
        type: frequencyType,
        days: initialValues?.frequency?.days ?? [],
        customDays: initialValues?.frequency?.customDays ?? 1,
      },
      goal: initialValues?.goal ?? 21, // 21 days default
      reminderTime: initialValues?.reminderTime ?? "",
    },
  });

  const handleSubmit = (values: HabitFormValues) => {
    onSubmit({
      name: values.name,
      description: values.description,
      frequency: {
        type: values.frequency.type,
        days: values.frequency.days,
        customDays: values.frequency.customDays,
      },
      goal: values.goal,
      reminderTime: values.reminderTime,
      color: initialValues?.color,
      icon: initialValues?.icon,
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editMode ? "Edit Habit" : "Create New Habit"}</DialogTitle>
          <DialogDescription>
            {editMode 
              ? "Update your habit details"
              : "Add a new habit to track. Regular habits lead to lasting change."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Habit Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Drink Water" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Drink 8 glasses of water each day"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="frequency.type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Frequency</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value as FrequencyType);
                      setFrequencyType(value as FrequencyType);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {frequencyType === "custom" && (
              <FormField
                control={form.control}
                name="frequency.customDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Every X Days</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormDescription>
                      How often you want to perform this habit (in days)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="goal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      placeholder="21"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value ? parseInt(e.target.value) : undefined;
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Number of days you aim to maintain this habit
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">{editMode ? "Update" : "Create"}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default HabitForm;

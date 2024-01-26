import React, { useEffect, useState } from "react";
import {
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/lib/AppStateContext";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { Course } from "@/lib/types";
import { courseSchema, facultySchema } from "@/lib/schemas";
import MultiSelect from "../common/MultiSelect";
import HourDistribution from "./HourDistribution";
import AutoComplete from "../common/AutoComplete";

export const AddCourse = (props: any) => {
  const { open, setOpen } = props;
  const [ratioEnabled, setRatioEnabled] = useState(false);
  const [showHourDistribution, setShowHourDistribution] = useState(false);
  const {
    hours,
    days,
    faculties,
    courses,
    groups,
    updateCourses,
    updateGroups,
  } = useAppContext();

  const CourseSchema = z.object({
    code: z
      .string()
      .min(1, { message: "Minimum 1 character" })
      .max(8, { message: "Maximum 8 characters" })
      .refine((value) => {
        const isCodeUnique = courses.every((course) => course.code !== value);
        return isCodeUnique;
      }, "Code must be unique"),
    name: z.string().optional(),
    faculties: z
      .array(facultySchema)
      .min(1, { message: "Select at least one" })
      .max(2, { message: "Select at most two" }),
    hours: z
      .number()
      .min(1, { message: "Enter valid hours" })
      .max((hours ?? 1) * (days ?? 1), { message: "Exceeded max hours" }),
    hoursDistribution: z.array(z.number()).optional(),
    studentGroup: z.string().min(1),
  });

  const form = useForm<z.infer<typeof CourseSchema>>({
    resolver: zodResolver(CourseSchema),
  });

  useEffect(() => {
    const faculties = form.getValues("faculties");
    const hours = form.getValues("hours");
    if (faculties?.length > 1) {
      setShowHourDistribution(true);
    } else {
      setShowHourDistribution(false);
    }
    if (hours == null || hours <= 0) {
      setRatioEnabled(true);
    } else {
      setRatioEnabled(false);
    }
  }, [form.watch("faculties"), form.watch("hours")]);

  function onSubmit(data: z.infer<typeof CourseSchema>) {
    const course: Course = {
      code: data.code,
      name: data.name || "",
      faculties: data.faculties,
      hours: data.hours,
      hoursDistribution: data.hoursDistribution,
      studentGroup: data.studentGroup,
    };
    updateCourses([...courses, course]);
    closeDialog();
    toast({
      title: "New course added successfully",
      description: (
        <p>
          {data.code}
          {data.name && (
            <>
              <span className="mx-1">•</span>
              {data.name}
            </>
          )}
        </p>
      ),
    });
  }

  const closeDialog = () => {
    form.reset();
    setOpen(false);
  };

  return (
    <AlertDialogContent className="sm:max-w-[425px] h-fit max-h-[100dvh] overflow-y-auto">
      <AlertDialogHeader>
        <AlertDialogTitle>New Course</AlertDialogTitle>
        <AlertDialogDescription>
          Create a new Course with unique code. Click add when you&apos;re done.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-1">
          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input
                    placeholder="ABC123"
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Course Name{" "}
                  <span className="opacity-50 text-xs">{`(optional)`}</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="faculties"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Faculties</FormLabel>
                <FormControl>
                  <MultiSelect
                    {...field}
                    data={faculties ?? []}
                    placeholder={
                      faculties?.length === 0
                        ? "No faculties"
                        : "Select Faculties"
                    }
                    value={field.value ?? []}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hours"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hours</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {showHourDistribution && (
            <FormField
              control={form.control}
              name="hoursDistribution"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hour Distribution</FormLabel>
                  <FormControl>
                    <HourDistribution
                      {...field}
                      max={form.getValues("hours")}
                      data={form.getValues("faculties")}
                      disabled={ratioEnabled}
                      value={field.value ?? []}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name="studentGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Group</FormLabel>
                <FormControl>
                  <AutoComplete
                    key={field.value}
                    data={groups}
                    {...field}
                    updateData={updateGroups}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <AlertDialogFooter className="pt-4">
            <Button
              variant={"secondary"}
              type="button"
              onClick={closeDialog}
              className="mt-4 min-[640px]:mt-0"
            >
              Cancel
            </Button>
            <Button type="submit">Add Course</Button>
          </AlertDialogFooter>
        </form>
      </Form>
    </AlertDialogContent>
  );
};

"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "@/lib/AppStateContext";
import { toast } from "@/components/ui/use-toast";
import { JointCourse } from "@/lib/types";
import { MultiSelect } from "@/components/ui/multi-select";
import { courseSchema, joinCoursesSchema } from "@/lib/schemas";
import { Plus } from "lucide-react";

export const AddAssignment = () => {
  const [open, setOpen] = useState(false);
  const {
    hours,
    days,
    lock,
    faculties,
    courses,
    subjects,
    updateJointCourseSchemas,
  } = useAppContext();

  const JointCourseSchema = z.object({
    courses: z.array(courseSchema).min(1, { message: "Select at least 2" }),
    fixedSlots: z.array(z.number()).min(1, { message: "Select at least 1" }),
  });
  const form = useForm<z.infer<typeof JointCourseSchema>>({
    resolver: zodResolver(JointCourseSchema),
  });
  function onSubmit(data: z.infer<typeof JointCourseSchema>) {
    console.log(data);
    const subject: JointCourse = data;
    updateJointCourseSchemas([...subjects, subject]);
    form.reset();
    closeAlertDialog();
    toast({
      title: "New Assignment added successfully",
      description: (
        <p>
          {data.courses && (
            <>
              <span className="mx-1">•</span>
              {data.courses.map((course) => course.code).join(", ")}
            </>
          )}
        </p>
      ),
    });
  }
  const closeAlertDialog = () => {
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger disabled={!lock} asChild>
        <Button disabled={!lock} size={"sm"}>
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px] h-fit max-h-screen overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>{`New Assignment`}</AlertDialogTitle>
          <AlertDialogDescription>
            Create a new unique Assignment. Click add when you&apos;re done.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <ScrollArea>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 px-2"
            >
              <FormField
                control={form.control}
                name="courses"
                render={({ field: { ...field } }) => (
                  <MultiSelect
                    label="Courses"
                    placeholder={`${
                      courses.length > 0 ? "" : "No Courses added yet."
                    } `}
                    data={
                      courses.map((course) => ({
                        id: course.code,
                        value: course.code,
                      })) ?? []
                    }
                    selected={
                      field.value?.map((course) => ({
                        id: course.code,
                        value: course.code,
                      })) ?? []
                    }
                    {...field}
                  />
                )}
              />

              <AlertDialogFooter className="pt-4">
                <Button
                  variant={"secondary"}
                  type="button"
                  onClick={closeAlertDialog}
                  className="mt-4 min-[640px]:mt-0"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={faculties.length == 0 || courses.length == 0}
                >
                  Add Assignment
                </Button>
              </AlertDialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </AlertDialogContent>
    </AlertDialog>
  );
};

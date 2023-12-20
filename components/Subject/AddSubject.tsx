"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "@/lib/AppStateContext";
import { toast } from "@/components/ui/use-toast";
import { Subject, SubjectType } from "@/lib/types";

export const AddSubject = () => {
  const [open, setOpen] = useState(false);
  const { hours, days, faculties, courses, subjects, updateSubjects } =
    useAppContext();
  const [type, setType] = useState<SubjectType>(SubjectType.CORE);

  const FormSchema = z.object({
    code: z
      .string()
      .min(1, { message: "Minimum 1 character" })
      .max(8, { message: "Maximum 8 characters" })
      .refine((value) => {
        const isCodeUnique = (subjects ?? []).every(
          (subject) => subject.code !== value
        );
        return isCodeUnique;
      }, "Code must be unique"),
    name: z.string().optional(),
    faculties: z.array(z.string()),
    courses: z.array(z.string()),
    group: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    // const subject: Subject = {
    //   code: data.code,
    //   name: data.name || "",
    //   type: type,
    //   faculties: faculties.filter((faculty) =>
    //     data.faculties.includes(faculty.code)
    //   ),
    //   courses: courses.filter((course) => data.courses.includes(course.code)),
    //   group: data.group,
    // };
    // updateSubjects([...subjects, subject]);
    form.reset();
    closeDialog();
    toast({
      title: "New Subject added successfully",
      description: (
        <p>
          {data.code}
          {data.name && (
            <>
              <span className="mx-1">•</span>
              {data.name}
            </>
          )}
          <span className="mx-1">•</span>
          {type.toLocaleLowerCase()}
        </p>
      ),
    });
  }
  const closeDialog = () => {
    form.reset();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>Add Subject</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px] h-fit max-h-screen overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>New Subject</AlertDialogTitle>
          <AlertDialogDescription>
            Create a new unique Subject. Click add when you&apos;re done.
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
                  <Input
                    id="code"
                    placeholder=""
                    defaultValue={""}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <Input
                    id="name"
                    placeholder=""
                    defaultValue={""}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <AlertDialogFooter className="pt-4">
              <Button
                variant={"secondary"}
                onClick={closeDialog}
                className="mt-4 min-[640px]:mt-0"
              >
                Cancel
              </Button>
              <Button type="submit">Add Faculty</Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { MultiSelect } from "@/components/ui/multi-select";

export const AddSubject = () => {
  const [open, setOpen] = useState(false);
  const { hours, days, lock, faculties, courses, subjects, updateSubjects } =
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
    faculties: z.array(z.record(z.string().trim())),
    courses: z.array(z.record(z.string().trim())),
    group: z.string(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const facs = data.faculties.map((faculty) => faculty.id);
    const cors = data.courses.map((course) => course.id);
    const subject: Subject = {
      code: data.code,
      name: data.name || "",
      type: type,
      faculties: faculties.filter((faculty) => facs.includes(faculty.code)),
      courses: courses.filter((course) => cors.includes(course.code)),
      group: data.group,
    };
    updateSubjects([...subjects, subject]);
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
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger disabled={!lock} asChild>
        <Button disabled={!lock} size={"sm"}>
          Add Subject
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="dark:border-zinc-700">
        <SheetHeader className="mb-6">
          <SheetTitle>{`New Subject`}</SheetTitle>
          <SheetDescription hidden>
            Create a new unique Subject. Click add when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Tabs
          value={type}
          onValueChange={(value) => {
            setType(value as SubjectType);
          }}
        >
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value={SubjectType.CORE}>Core</TabsTrigger>
            <TabsTrigger value={SubjectType.ELECTIVE}>Elective</TabsTrigger>
            <TabsTrigger value={SubjectType.SHARED}>Shared</TabsTrigger>
          </TabsList>
        </Tabs>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <Input
                    id="code"
                    placeholder=""
                    readOnly={type === SubjectType.ELECTIVE}
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
                  <FormLabel>
                    Name{" "}
                    <span className="opacity-50 text-xs">{`(optional)`}</span>
                  </FormLabel>
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
            <FormField
              control={form.control}
              name="faculties"
              render={({ field: { ...field } }) => (
                <MultiSelect
                  label="Faculties"
                  disabled={faculties.length === 0}
                  placeholder={`${
                    faculties.length > 0 ? "" : "No Faculties added yet."
                  } `}
                  data={
                    faculties.map((faculty) => ({
                      id: faculty.code,
                      value: faculty.code,
                    })) ?? []
                  }
                  selected={field.value ?? []}
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="courses"
              render={({ field: { ...field } }) => (
                <MultiSelect
                  label="Courses"
                  disabled={courses.length === 0}
                  placeholder={`${
                    courses.length > 0 ? "" : "No Courses added yet."
                  } `}
                  data={
                    courses.map((course) => ({
                      id: course.code,
                      value: course.code,
                    })) ?? []
                  }
                  selected={field.value ?? []}
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group</FormLabel>
                  <Input
                    id="group"
                    placeholder=""
                    defaultValue={""}
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter className="pt-4">
              <Button
                variant={"secondary"}
                type="button"
                onClick={closeDialog}
                className="mt-4 min-[640px]:mt-0"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={faculties.length == 0 || courses.length == 0}
              >
                Add Faculty
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

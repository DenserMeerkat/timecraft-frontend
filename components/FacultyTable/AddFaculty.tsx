import React, { useState } from "react";
import {
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
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HourGrid from "@/components/common/HourGrid";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppContext } from "@/lib/AppStateContext";
import { toast } from "@/components/ui/use-toast";
import { Faculty } from "@/lib/types";

export const AddFaculty = (props: any) => {
  const { open, setOpen } = props;
  const { hours, days, faculties, updateFaculties } = useAppContext();
  const [selectedHours, setSelectedHours] = useState<number[]>([]);
  const handleHourChange = (newValue: number[]) => {
    setSelectedHours(newValue);
  };
  const FormSchema = z.object({
    code: z
      .string()
      .min(1, { message: "Minimum 1 character" })
      .max(8, { message: "Maximum 8 characters" })
      .refine((value) => {
        const isCodeUnique = faculties.every(
          (faculty) => faculty.code !== value
        );
        return isCodeUnique;
      }, "Code must be unique"),
    name: z.string().optional(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const faculty: Faculty = {
      code: data.code,
      name: data.name || "",
      occupiedHours: selectedHours,
    };
    updateFaculties([...faculties, faculty]);
    form.reset();
    closeDialog();
    toast({
      title: "New faculty added successfully",
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
    setSelectedHours([]);
    setOpen(false);
  };

  return (
    <AlertDialogContent className="sm:max-w-[425px] h-fit max-h-[100dvh] overflow-y-auto">
      <AlertDialogHeader>
        <AlertDialogTitle>New Faculty</AlertDialogTitle>
        <AlertDialogDescription>
          Create a new Faculty with a unique code. Click add when you&apos;re
          done.
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
                <Input id="code" placeholder="" {...field} />
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
                <Input id="name" placeholder="" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>
              Occupied{" "}
              <span className="opacity-50 text-xs">{`(optional)`}</span>
            </FormLabel>
            <HourGrid
              columns={hours!}
              rows={days!}
              bg="rose"
              value={selectedHours}
              onChange={handleHourChange}
            />
            <FormMessage />
          </FormItem>
          <AlertDialogFooter className="pt-4">
            <Button
              variant={"secondary"}
              type="button"
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
  );
};

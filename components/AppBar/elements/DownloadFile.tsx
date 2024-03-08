"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/components/context/AppStateContext";
import { Download, FileJson, FileText } from "lucide-react";

const fileTypes = [
  { value: "json", label: "JSON", extension: ".json" },
  { value: "txt", label: "TXT", extension: ".txt" },
];

const DownloadFile = () => {
  const [open, setOpen] = useState(false);
  const state = useAppContext();

  const DownloadFileSchema = z.object({
    name: z.string().min(1, { message: "Enter a valid fileName" }),
    type: z.enum(["json", "txt"]),
  });

  const form = useForm<z.infer<typeof DownloadFileSchema>>({
    resolver: zodResolver(DownloadFileSchema),
    defaultValues: {
      name: `timecraft-${new Date().toISOString().split("T")[0]}`,
      type: "json",
    },
  });

  function onSubmit(data: z.infer<typeof DownloadFileSchema>) {
    const json = state.download();
    if (json) {
      const blob = new Blob([JSON.stringify(json)], {
        type: `text/${data.type === "json" ? "json" : "plain"};charset=utf-8`,
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const fileName = data.name.split(".")[0] + "." + data.type;
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      closeDialog();
      toast({
        title: "Download successfull",
        description: (
          <div className="flex items-center">
            {data.type === "json" ? (
              <FileJson className="mr-2 h-4 w-4" />
            ) : (
              <FileText className="mr-2 h-4 w-4" />
            )}
            <span className="text-base">{fileName}</span>
          </div>
        ),
      });
    }
  }

  const closeDialog = () => {
    setOpen((prev: boolean) => !prev);
    form.reset();
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"outline"} asChild>
          <div className="flex w-full cursor-pointer items-center">
            <Download className="mr-2 h-4 w-4" /> Download
          </div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        onEscapeKeyDown={(event: KeyboardEvent) => closeDialog()}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Download</AlertDialogTitle>
          <AlertDialogDescription>
            Download data in your desired format.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Name</FormLabel>
                  <Input
                    id="name"
                    type="text"
                    placeholder="timecraft-data"
                    {...field}
                  />
                  <FormDescription>
                    File Name without extension.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Type</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <div className="mr-4 flex w-full justify-between">
                          <span>
                            {
                              fileTypes.find(
                                (file: any) => file.value == field.value,
                              )?.label
                            }
                          </span>

                          <span>
                            [{" "}
                            {
                              fileTypes.find(
                                (file: any) => file.value == field.value,
                              )?.extension
                            }{" "}
                            ]
                          </span>
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {fileTypes.map((type) => (
                            <SelectItem key={type.value} value={type.value}>
                              {type.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
              <Button type="submit">Download</Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DownloadFile;

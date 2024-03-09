"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Pencil, Upload, FileJson, FileText, FileX } from "lucide-react";
import { useAppContext } from "@/components/context/AppStateContext";
import { cn } from "@/lib/utils";

const FILE_TYPES = ["application/json", "text/plain"];

const UploadFile = () => {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const state = useAppContext();
  const UploadFileSchema = z.object({
    file: z
      .instanceof(FileList, { message: "File required" })
      .refine((files) => {
        return FILE_TYPES.includes(files[0].type);
      }, "File must be of TXT or JSON format"),
  });

  const form = useForm<z.infer<typeof UploadFileSchema>>({
    resolver: zodResolver(UploadFileSchema),
  });
  const fileRef = form.register("file");

  function onSubmit(data: z.infer<typeof UploadFileSchema>) {
    const file = data.file[0];
    const fileName = file.name;
    const reader = new FileReader();

    reader.onload = function (event) {
      if (event.target) {
        const fileContent = event.target.result;
        try {
          const timetableRequest = JSON.parse(fileContent as string);
          state.upload(timetableRequest);
          toast({
            title: "Upload successfull",
            description: (
              <div className="flex items-center">
                {file.type === "application/json" ? (
                  <FileJson className="mr-2 h-4 w-4" />
                ) : (
                  <FileText className="mr-2 h-4 w-4" />
                )}
                <span className="text-base">{fileName}</span>
              </div>
            ),
          });
        } catch (error) {
          toast({
            title: "Error parsing JSON",
            description: (
              <div className="flex items-center">
                <FileX className="mr-2 h-4 w-4" />
                <span className="text-base">{fileName}</span>
              </div>
            ),
          });
        }
      }
    };

    reader.onerror = function () {
      console.error("Error reading file:", reader.error);
    };

    reader.readAsText(file);
    closeDialog();
  }

  const closeDialog = () => {
    setOpen((prev: boolean) => !prev);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"} asChild>
          <div className="flex w-full cursor-pointer items-center">
            <Upload className="mr-2 h-4 w-4" /> Upload
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload</DialogTitle>
          <DialogDescription className="text-orange-500 dark:text-orange-400">
            Warning! The current data will be reset.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-2">
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Name</FormLabel>
                  <div
                    className="border-input relative rounded-md border
                    border-zinc-200 dark:border-zinc-800"
                  >
                    <Input
                      id="file"
                      type="file"
                      accept=".json, .txt"
                      {...fileRef}
                      style={{
                        opacity: 0,
                      }}
                      onChange={(e) => {
                        field.onChange(
                          e.target.files ? e.target.files[0] : null,
                        );
                        setFile(e.target.files ? e.target.files[0] : null);
                      }}
                    />
                    <div className="absolute left-2 right-0 top-0 z-[-4]">
                      {file ? (
                        <div
                          className={cn(
                            "flex items-center",
                            FILE_TYPES.includes(file.type)
                              ? "text-green-700 dark:text-green-500"
                              : "text-red-500",
                          )}
                        >
                          {file.type === "application/json" ? (
                            <FileJson className="mr-2 h-5 w-5" />
                          ) : file.type === "text/plain" ? (
                            <FileText className="mr-2 h-5 w-5" />
                          ) : (
                            <FileX className="mr-2 h-5 w-5" />
                          )}
                          <p className="line-clamp-1 w-full overflow-hidden text-ellipsis font-medium">
                            {file.name}
                          </p>
                          <div className="z-40 p-2 hover:text-red-400">
                            <Pencil
                              className="ml-1 h-4 w-4 text-zinc-900 dark:text-zinc-100"
                              onClick={() => {
                                setFile(null);
                                field.onChange(null);
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <p className="w-full">Upload File</p>
                          <div className="p-2">
                            <Upload className="ml-1 h-4 w-4" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <FormDescription>JSON or TXT file.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4">
              <Button
                variant={"secondary"}
                type="button"
                onClick={closeDialog}
                className="mt-4 min-[640px]:mt-0"
              >
                Cancel
              </Button>
              <Button variant={"destructive"} type="submit">
                Upload & Reset
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default UploadFile;

// "use client";

// import React, { useState } from "react";
// import {
//   AlertDialog,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useAppContext } from "@/lib/AppStateContext";
// import { toast } from "@/components/ui/use-toast";
// import { Assignment, CourseType, Faculty } from "@/lib/types";
// import { MultiSelect } from "@/components/ui/multi-select";
// import { assignmentSchema } from "@/lib/schemas";
// import { Plus } from "lucide-react";

// export const AddAssignment = () => {
//   const [open, setOpen] = useState(false);
//   const { hours, days, lock, faculties, courses, subjects, updateAssignments } =
//     useAppContext();
//   const [type, setType] = useState<CourseType>(CourseType.CORE);
//   const form = useForm<z.infer<typeof assignmentSchema>>({
//     resolver: zodResolver(assignmentSchema),
//   });
//   function onSubmit(data: z.infer<typeof assignmentSchema>) {
//     console.log(data);
//     const subject: Assignment = data;
//     updateAssignments([...subjects, subject]);
//     form.reset();
//     closeAlertDialog();
//     toast({
//       title: "New Assignment added successfully",
//       description: (
//         <p>
//           {data.courseType}
//           {data.courses && (
//             <>
//               <span className="mx-1">•</span>
//               {data.courses.map((course) => course.code).join(", ")}
//             </>
//           )}
//           <span className="mx-1">•</span>
//           {type.toLocaleLowerCase()}
//         </p>
//       ),
//     });
//   }
//   const closeAlertDialog = () => {
//     setOpen(false);
//   };

//   return (
//     <AlertDialog open={open} onOpenChange={setOpen}>
//       <AlertDialogTrigger disabled={!lock} asChild>
//         <Button disabled={!lock} size={"sm"}>
//           <Plus className="h-4 w-4 mr-1" />
//           Add
//         </Button>
//       </AlertDialogTrigger>
//       <AlertDialogContent className="sm:max-w-[425px] h-fit max-h-screen overflow-y-auto">
//         <AlertDialogHeader>
//           <AlertDialogTitle>{`New Assignment`}</AlertDialogTitle>
//           <AlertDialogDescription>
//             Create a new unique Assignment. Click add when you&apos;re done.
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <ScrollArea>
//           <Tabs
//             value={type}
//             onValueChange={(value) => {
//               setType(value as CourseType);
//             }}
//           >
//             <TabsList className="grid w-full grid-cols-3 mb-4">
//               <TabsTrigger value={CourseType.CORE}>Core</TabsTrigger>
//               <TabsTrigger value={CourseType.ELECTIVE}>Elective</TabsTrigger>
//             </TabsList>
//           </Tabs>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(onSubmit)}
//               className="space-y-4 px-2"
//             >
//               {/* <FormField
//                 control={form.control}
//                 name="code"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Code</FormLabel>
//                     <Input
//                       id="code"
//                       placeholder=""
//                       readOnly={type === CourseType.ELECTIVE}
//                       defaultValue={""}
//                       {...field}
//                     />
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>
//                       Name{" "}
//                       <span className="opacity-50 text-xs">{`(optional)`}</span>
//                     </FormLabel>
//                     <Input
//                       id="name"
//                       placeholder=""
//                       defaultValue={""}
//                       {...field}
//                     />
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               /> */}
//               <FormField
//                 control={form.control}
//                 name="faculties"
//                 render={({ field: { ...field } }) => (
//                   <MultiSelect
//                     label="Faculties"
//                     placeholder={`${
//                       faculties.length > 0 ? "" : "No Faculties added yet."
//                     } `}
//                     data={
//                       faculties.map((faculty) => ({
//                         id: faculty.code,
//                         value: faculty.code,
//                       })) ?? []
//                     }
//                     selected={
//                       field.value?.map((faculty) => ({
//                         id: faculty.code,
//                         value: faculty.code,
//                       })) ?? []
//                     }
//                     {...field}
//                   />
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="courses"
//                 render={({ field: { ...field } }) => (
//                   <MultiSelect
//                     label="Courses"
//                     placeholder={`${
//                       courses.length > 0 ? "" : "No Courses added yet."
//                     } `}
//                     data={
//                       courses.map((course) => ({
//                         id: course.code,
//                         value: course.code,
//                       })) ?? []
//                     }
//                     selected={
//                       field.value?.map((course) => ({
//                         id: course.code,
//                         value: course.code,
//                       })) ?? []
//                     }
//                     {...field}
//                   />
//                 )}
//               />
//               <FormField
//                 control={form.control}
//                 name="studentGroup"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Group</FormLabel>
//                     <Input
//                       id="studentGroup"
//                       placeholder=""
//                       defaultValue={""}
//                       {...field}
//                     />
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//               <AlertDialogFooter className="pt-4">
//                 <Button
//                   variant={"secondary"}
//                   type="button"
//                   onClick={closeAlertDialog}
//                   className="mt-4 min-[640px]:mt-0"
//                 >
//                   Cancel
//                 </Button>
//                 <Button
//                   type="submit"
//                   disabled={faculties.length == 0 || courses.length == 0}
//                 >
//                   Add Assignment
//                 </Button>
//               </AlertDialogFooter>
//             </form>
//           </Form>
//         </ScrollArea>
//       </AlertDialogContent>
//     </AlertDialog>
//   );
// };

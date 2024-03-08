"use client";
import React from "react";
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
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useAppContext } from "@/components/context/AppStateContext";

const UploadFile = () => {
  const state = useAppContext();

  function handleClick() {}
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"secondary"} asChild>
          <div className="flex w-full cursor-pointer items-center">
            <Upload className="mr-2 h-4 w-4" /> Upload
          </div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Upload Warning</AlertDialogTitle>
          <AlertDialogDescription>
            Uploading data with JSON resets current data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-transparent p-0 dark:bg-transparent">
            <Button
              variant={"destructive"}
              className="w-full px-6"
              onClick={handleClick}
            >
              Reset & Upload
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default UploadFile;

// import React, { useState, useEffect } from "react";
// import { LuFile, LuUpload, LuPencil } from "react-icons/lu";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/utils/utils";
// import {
//   FormControl,
//   FormDescription,
//   FormItem,
//   FormLabel,
// } from "@/components/ui/form";

// const MAX_FILE_SIZE = 5000000;
// const FILE_TYPES = ["application/pdf"];

// const FileField = (
//   {
//     form,
//     labelStyles,
//     inputStyles,
//     iconStyles,
//     file,
//     setFile,
//     fileHasError,
//     setFileHasError,
//   },
//   ref,
// ) => {
//   const [inputKey, setInputKey] = useState(Date.now());
//   const [fileErrorMessage, setFileErrorMessage] = useState("");
//   function validateFile(file) {
//     if (!file) {
//       setFileHasError(true);
//       setFileErrorMessage("Required");
//     } else if (!FILE_TYPES.includes(file.type)) {
//       setFileHasError(true);
//       setFileErrorMessage("File type must be PDF");
//     } else if (file.size > MAX_FILE_SIZE) {
//       setFileHasError(true);
//       setFileErrorMessage("Max file size is 5MB");
//     } else {
//       setFileHasError(false);
//       setFileErrorMessage("");
//     }
//   }
//   useEffect(() => {
//     validateFile(file);
//   }, [form.formState.isSubmitted, form.formState.isDirty]);

//   useEffect(() => {
//     validateFile(file);
//   }, [file]);
//   return (
//     <FormItem>
//       <FormLabel className={cn(labelStyles)}>File Upload</FormLabel>
//       <FormDescription className="text-xs md:text-[0.8rem]">
//         Upload the project abstract in PDF format.
//       </FormDescription>
//       <FormControl>
//         <div className={cn(inputStyles, "relative select-none")}>
//           <LuFile className={cn(iconStyles)} />
//           <Input
//             key={inputKey}
//             type="file"
//             className="border-0 bg-transparent dark:bg-transparent dark:text-white"
//             accept=".pdf"
//             style={{
//               opacity: 0,
//             }}
//             onChange={(e) => {
//               if (file && e.target.files.length == 0) return;
//               setFile(e.target.files[0]);
//             }}
//           />
//           <div className="absolute left-12 right-0 z-[-4]">
//             {file ? (
//               <div className="flex items-center">
//                 <p className="line-clamp-1 w-full overflow-hidden text-ellipsis">
//                   {file.name}
//                 </p>
//                 <div className="z-40 p-2 hover:text-red-400">
//                   <LuPencil className="ml-1" onClick={() => setFile(null)} />
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-center">
//                 <p className="w-full">Upload Abstract</p>
//                 <div className="p-2">
//                   <LuUpload className="ml-1" />
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </FormControl>

//       <FileMessage msg={fileErrorMessage} error={fileHasError} />
//     </FormItem>
//   );
// };

// export default FileField;

// const FileMessage = ({ className, msg, error }) => {
//   const body = error ? String(msg) : null;

//   if (!body) {
//     return null;
//   }

//   return (
//     <p
//       className={cn(
//         "pr-1.5 text-end text-sm font-medium text-red-500 dark:text-red-500",
//         className,
//       )}
//     >
//       {body}
//     </p>
//   );
// };

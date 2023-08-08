import React from "react";
import { User } from "lucide-react";
import { FaGoogle, FaApple, FaFacebookF } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size={"sm"}
          variant={"outline"}
          className="h-10 border border-zinc-300 dark:border-zinc-800 hover:border-zinc-500 "
        >
          <User className="md:mr-2 h-4 w-4" />
          <p className="hidden md:inline pr-1">Login</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem onClick={() => {}}>
          <div className="flex items-center gap-2">
            <FaGoogle className="p-[0.05rem]" />
            Google
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          <div className="flex items-center gap-2">
            <FaApple className="p-[0.05rem]" />
            Apple
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {}}>
          <div className="flex items-center gap-2">
            <FaFacebookF className="p-[0.05rem]" />
            Facebook
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Login;

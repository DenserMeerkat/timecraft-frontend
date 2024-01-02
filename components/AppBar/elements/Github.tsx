import TooltipElement from "@/components/common/TooltipElement";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import { frontendUrl, backendUrl } from "@/lib/constants";

const GitHubLink = () => {
  return (
    <TooltipElement
      element={
        <Button size="icon" variant={"ghost"} asChild>
          <Link href={frontendUrl} target="_blank">
            <Github className={"p-0.5"} />
          </Link>
        </Button>
      }
      tooltip={"GitHub"}
    ></TooltipElement>
  );
};
export default GitHubLink;

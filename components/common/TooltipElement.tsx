import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TooltipElement = (props: any) => {
  const element = props.element;
  const tooltip = props.tooltip;
  const asChild = props.asChild || true;
  const side = props.side || "top";
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild={asChild}>{element}</TooltipTrigger>
        <TooltipContent sideOffset={20} side={side}>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipElement;

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CartButtonProps {
  icon: React.ReactNode;
  tooltip?: string;
  onClick?: () => void;
}

export const CardButton: React.FC<CartButtonProps> = ({
  icon,
  tooltip,
  onClick,
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={onClick}
          >
            {icon}
          </Button>
        </TooltipTrigger>
        {tooltip && (
          <TooltipContent side="top">
            <p>{tooltip}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

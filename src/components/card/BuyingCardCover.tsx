"use client";
import { Edit, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CardCoverProps {
  children: React.ReactNode;
  onUpdate: () => void;
  onDelete: () => void;
  status: boolean;
}

export function BuyingCardCover({
  children,
  onUpdate,
  onDelete,
  status,
}: CardCoverProps) {
  return (
    <div className="flex flex-row gap-4 h-32 items-center justify-center">
      {children}

      <div className="flex flex-col gap-2">
        {status ? (
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="text-xs text-center">ส่งหลัง</div>
            <Button
              variant="outline"
              size="icon"
              className="bg-gray-200 hover:bg-green-500 border-none"
              onClick={onUpdate}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="text-xs text-center">ส่งหลัง</div>
            <Button
              variant="outline"
              size="icon"
              disabled
              className="bg-gray-200 border-none"
            >
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onUpdate}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

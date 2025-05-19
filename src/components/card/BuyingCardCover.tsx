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
              size="sm"
              className="hover:bg-gray-200 bg-green-500 border-none h-6"
              onClick={onUpdate}
            >
              <Check className="h-4 w-4 text-white" />
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={onDelete}
              className="h-6 hover:bg-gray-200"
            >
              <Trash2 className="h-4 w-4 text-white" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="text-xs text-center">ส่งหลัง</div>
            <Button
              variant="outline"
              size="sm"
              disabled
              className="bg-gray-200 border-none h-6 w-6"
            >
            </Button>
            <Button
              className="h-6"
              variant="outline"
              size="sm"
              onClick={onUpdate}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              className="h-6 hover:bg-gray-200"
              variant="destructive"
              size="sm"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4 text-white" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

import {
  Dialog, DialogClose, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";
import {
  Form, FormField, FormItem, FormLabel, FormControl,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Product } from "@/types/product";

interface SendAfterDialogProps {
  product?: Product;
  quantity: number;
  isPending?: boolean;
  onUpdate: (newQuantity: number) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  status: boolean;
}

const schema = z.object({
  quantity: z.coerce.number().min(1, "ต้องมากกว่า 0"),
});

export const SendAfterDialog: React.FC<SendAfterDialogProps> = ({
  quantity,
  onUpdate,
  isOpen,
  setIsOpen,
  status,
}) => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      quantity: quantity,
    },
  });

  useEffect(() => {
    if (isOpen) {
      form.reset({ quantity });
    }
  }, [isOpen, quantity, form]);

  return (
    <Dialog modal open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>แก้ไขการส่งภายหลัง</DialogTitle>
          <DialogDescription>
            {status
              ? "คุณต้องการยกเลิกการส่งภายหลังใช่ไหม"
              : "คุณต้องการส่งภายหลังใช่ไหม"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              onUpdate(data.quantity);
              setIsOpen(false);
            })}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>จำนวน</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  ยกเลิก
                </Button>
              </DialogClose>
              <Button type="submit">
                บันทึก
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

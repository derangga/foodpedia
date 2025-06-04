"use client";

import { SquarePen } from "lucide-react";
import { Button } from "../button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../dialog";
import { Label } from "../label";
import { Textarea } from "../textarea";
import { useActionState, useEffect, useState } from "react";
import { updateBio } from "@/actions/user";
import ButtonLoading from "../button-loading";
import { toast } from "sonner";

interface EditBioDialog {
  bio: string | null;
}
const EditBioDialog: React.FC<EditBioDialog> = ({ bio }) => {
  const [open, setOpen] = useState(false);
  const [state, formAction, isLoading] = useActionState(updateBio, null);

  useEffect(() => {
    if (state instanceof Error) {
      toast.error("Failed update bio", {
        description: state.message,
        duration: 2000,
      });
    } else if (state === true) {
      setOpen(false);
    }
  }, [state, isLoading]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost" className="rounded-full">
          <SquarePen />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Bio</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              defaultValue={bio || ""}
              placeholder="Describe your personality here"
              maxLength={200}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <ButtonLoading
              type="submit"
              className="text-white"
              isLoading={isLoading}
            >
              Save changes
            </ButtonLoading>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBioDialog;

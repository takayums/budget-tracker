import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from "react";

export function Modal({
  open,
  dataError,
}: {
  open: boolean;
  dataError: Record<string, string>;
}) {
  const [showModal, setShowModal] = useState(open);
  useEffect(() => {
    setShowModal(open);
  }, [open]);

  return (
    <AlertDialog open={showModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Error:</AlertDialogTitle>
          <AlertDialogDescription className="text-red-400">
            {dataError.general}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setShowModal(false)}>
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

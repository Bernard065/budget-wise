"use client";

import React from "react";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useUpdateAccount } from "@/features/accounts/hooks/use-update-account";
import { useConfirm } from "@/features/accounts/hooks/use-confirm";
import { useDeleteAccount } from "@/features/accounts/api/use-delete-account";

type Props = {
  id: string;
};

const Actions = ({ id }: Props) => {
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this transaction."
  );

  const { onOpen } = useUpdateAccount();
  const deleteMutation = useDeleteAccount(id);

  const handleDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate();
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="size-8 p-0 cursor-pointer">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={() => onOpen(id)}
            className="cursor-pointer"
          >
            <Edit className="size-4 mr-2 " /> Edit
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={deleteMutation.isPending}
            onClick={handleDelete}
            className="cursor-pointer"
          >
            <Trash className="size-4 mr-2 text-red-500 " /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default Actions;

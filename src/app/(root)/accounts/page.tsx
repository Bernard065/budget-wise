"use client";

import React from "react";
import { Plus } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNewAccount } from "@/hooks/use-new-accounts";
import { columns, Payment } from "./columns";
import { DataTable } from "./data-table";

const data: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "t@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "f@example.com",
  },
];

const AccountsPage = () => {
  const newAccount = useNewAccount();

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 bg-light-900">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Accounts Page</CardTitle>
          <Button
            onClick={newAccount.onOpen}
            size="sm"
            className="bg-dark-200 text-white rounded"
          >
            <Plus className="size-4 mr-2" /> Add new
          </Button>
        </CardHeader>

        <div className="container mx-auto py-10">
          <DataTable
            columns={columns}
            data={data}
            filterKey="email"
            onDelete={() => {}}
          />
        </div>
      </Card>
    </div>
  );
};

export default AccountsPage;

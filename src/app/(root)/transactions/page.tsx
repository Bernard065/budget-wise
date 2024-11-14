"use client";

import React from "react";
import { Loader2, Plus } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transactions";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";

const TransactionPage = () => {
  const newTransaction = useNewTransaction();
  const transactionQuery = useGetTransactions();
  const transactions = transactionQuery.data || [];
  const deleteTransactions = useBulkDeleteTransactions();

  const isDisabled = transactionQuery.isLoading || deleteTransactions.isPending;

  if (transactionQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-400 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 bg-light-900">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Transactions History
          </CardTitle>
          <Button
            onClick={newTransaction.onOpen}
            size="sm"
            className="bg-dark-200 text-white rounded"
          >
            <Plus className="size-4 mr-2" /> Add new
          </Button>
        </CardHeader>

        <div className="container mx-auto py-10">
          <DataTable
            columns={columns}
            data={transactions}
            filterKey="name"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteTransactions.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </div>
      </Card>
    </div>
  );
};

export default TransactionPage;

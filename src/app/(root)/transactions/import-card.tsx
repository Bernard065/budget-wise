import React, { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImportTable from "./import-table";

type Props = {
  data: string[][];
  onCancel: () => void;
  onSubmit: (data) => void;
};

interface SelectedColumnsState {
  [key: string]: string | null;
}

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["payee", "amount", "date"];

const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
    {}
  );

  const header = data[0];
  const body = data.slice(1);

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 bg-light-900">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Import Transactions
          </CardTitle>
          <div className="flex items-center gap-x-2">
            <Button
              onClick={onCancel}
              size="sm"
              className="w-full bg-dark-200 text-white rounded"
            >
              Cancel
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            header={header}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeadSelectChange={() => {}}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportCard;

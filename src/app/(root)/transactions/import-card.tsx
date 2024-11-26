import React, { useState } from "react";
import { format, parse } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ImportTable from "./import-table";
import { convertAmountToMiliunits } from "@/lib/utils";

type Props = {
  data: string[][];
  onCancel: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
};

interface SelectedColumnsState {
  [key: string]: string | null;
}

const dateFormat = "yyyy-MM-dd HH:mm:ss";
const outputFormat = "yyyy-MM-dd";

const requiredOptions = ["amount", "payee", "date"];

const ImportCard = ({ data, onCancel, onSubmit }: Props) => {
  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsState>(
    {}
  );

  const header = data[0];
  const body = data.slice(1);

  const handleTableHeadSelectChange = (
    columnIndex: number,
    value: string | null
  ) => {
    setSelectedColumns((prevState) => {
      const newSelectedColumns = { ...prevState };

      // Iterate through the keys in the object and update the value if it matches
      for (const key in newSelectedColumns) {
        if (newSelectedColumns[key] === value) {
          newSelectedColumns[key] = null;
        }
      }

      // Update the specific column index
      newSelectedColumns[`column_${columnIndex}`] = value;

      // Return the updated state
      return newSelectedColumns;
    });
  };

  const progress = Object.values(selectedColumns).filter(Boolean).length;

  const handleContinue = () => {
    const getColumnIndex = (column: string) => {
      return column.split("_")[1];
    };

    const mappedData = {
      header: header.map((_header, index) => {
        const columnIndex = getColumnIndex(`column_${index}`);

        return selectedColumns[`column_${columnIndex}`] || null;
      }),

      body: body
        .map((row) => {
          const transformedRow = row.map((cell, index) => {
            const columnIndex = getColumnIndex(`column_${index}`);

            return selectedColumns[`column_${columnIndex}`] ? cell : null;
          });

          return transformedRow.every((item) => item !== null)
            ? []
            : transformedRow;
        })
        .filter((row) => row.length > 0),
    };

    const arrayOfData = mappedData.body.map((row) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return row.reduce((value: any, cell, index) => {
        const header = mappedData.header[index];

        if (header !== null) {
          value[header] = cell;
        }

        return value;
      }, {});
    });

    const formattedData = arrayOfData.map((item) => ({
      ...item,
      amount: convertAmountToMiliunits(parseFloat(item.amount || "0")),
      date: item.date
        ? format(parse(item.date, dateFormat, new Date()), outputFormat)
        : null, // Handle missing or invalid dates
    }));

    console.log("formattedData:", formattedData);

    onSubmit(formattedData);
  };

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 bg-light-900">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">
            Import Transactions
          </CardTitle>
          <div className="flex flex-col lg:flex-row gap-y-2 items-center gap-x-2">
            <Button
              onClick={onCancel}
              size="sm"
              className="w-full bg-dark-200 text-white rounded lg:w-auto"
            >
              Cancel
            </Button>
            <Button
              disabled={progress < requiredOptions.length}
              onClick={handleContinue}
              size="sm"
              className="w-full bg-dark-200 text-white rounded lg:w-auto"
            >
              Continue ({progress} / {requiredOptions.length})
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <ImportTable
            header={header}
            body={body}
            selectedColumns={selectedColumns}
            onTableHeadSelectChange={handleTableHeadSelectChange}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ImportCard;

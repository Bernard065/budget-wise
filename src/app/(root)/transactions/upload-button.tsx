/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

type Props = {
  onUpload: (results: any) => void;
};

const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();

  // TODO: Add a paywall

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button
          size="sm"
          className="w-full lg:w-auto bg-dark-200 text-white"
          {...getRootProps()}
        >
          <Upload className="size-4 mr-2" />
          Import
        </Button>
      )}
    </CSVReader>
  );
};

export default UploadButton;

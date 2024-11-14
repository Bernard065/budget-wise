import React from "react";
import CurrencyInput from "react-currency-input-field";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  value: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
};

const AmountInput = ({ value, onChange, placeholder, disabled }: Props) => {
  return (
    <div>Be</div>
    
  );
};

export default AmountInput;

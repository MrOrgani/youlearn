import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { AlertTriangle, CheckCircleIcon } from "lucide-react";
import React from "react";

const variants = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      variant: {
        warning: "bg-yellow-200/80 text-yellow-300 text-primary",
        success: "bg-emerald-700 border-emerald-700 text-secondary",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  },
);

interface BannerProps extends VariantProps<typeof variants> {
  label: string;
}

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

export const Banner = ({ variant, label }: BannerProps) => {
  const Icon = iconMap[variant || "warning"];

  return (
    <div className={cn(variants({ variant }))}>
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </div>
  );
};

"use client";

import { Category } from "@prisma/client";
import {
  BookOpenText,
  Briefcase,
  Brush,
  Camera,
  Computer,
  GraduationCap,
  HeartPulse,
  LampDesk,
  Landmark,
  LucideIcon,
  Music,
  PersonStanding,
  SprayCan,
  Target,
} from "lucide-react";
import React from "react";
import { CategoryItem } from "./CategoryItem";

interface CategoriesProps {
  items: Category[];
}

const icons: Record<string, LucideIcon> = {
  Development: BookOpenText,
  Business: Briefcase,
  "Finance and Accounting": Landmark,
  "Information Technology and Software": Computer,
  "Office Productivity": LampDesk,
  "Personal Development": PersonStanding,
  Design: Brush,
  Marketing: Target,
  Lifestyle: SprayCan,
  "Photography and Video": Camera,
  "Health and Well-being": HeartPulse,
  Music: Music,
  "Training and Degrees": GraduationCap,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto px-6 ">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          name={item.name}
          icon={icons[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};

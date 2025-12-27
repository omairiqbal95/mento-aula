import { ComponentType } from "react";

export interface FunFactItem {
  id: number;
  title: string;
  value: number;
  suffix: string;
  icon: ComponentType;
  delay?: string;
}

export interface FunFactContent {
  items: FunFactItem[];
}
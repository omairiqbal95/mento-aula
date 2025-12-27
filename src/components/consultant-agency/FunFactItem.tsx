import React from "react";
import type { FunFactItem as FunFactItemType } from "@/types/consultant-agency/fun-fact";
import FunFactCounter from "./FunFactCounter";

interface FunFactItemProps {
  item: FunFactItemType;
}

const FunFactItem = ({ item }: FunFactItemProps) => {
  const IconComponent = item.icon;
  
  return (
    <div className="funfact__item">
      <div className="funfact__content">
        <p>{item.title}</p>
        <IconComponent />
      </div>
      <FunFactCounter value={item.value} suffix={item.suffix} />
    </div>
  );
};

export default FunFactItem;

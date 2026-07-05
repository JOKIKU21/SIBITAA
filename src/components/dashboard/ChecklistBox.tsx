"use client";

import { useState } from "react";
import Input from "@/components/Input";

export function ChecklistBox({ items }: { items: string[] }) {
  const [checkedState, setCheckedState] = useState<boolean[]>(
    new Array(items.length).fill(false)
  );

  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  const checkedCount = checkedState.filter(Boolean).length;

  return (
    <div>
      <div className="text-3 text-neutral-muted mb-2.5">
        {checkedCount}/{items.length} item selesai
      </div>
      <div className="flex flex-col gap-2">
        {items.map((item, index) => {
          const isChecked = checkedState[index];
          return (
            <label
              key={index}
              className={`flex items-center gap-2.5 bg-neutral-bg border-[1.5px] border-transparent rounded-2 py-2.5 px-3.5 text-[13.5px] cursor-pointer select-none transition-[border-color] duration-200 ${
                isChecked ? "text-neutral-light line-through" : "text-neutral-text hover:border-[#D8DEF5]"
              }`}
            >
              <Input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleOnChange(index)}
                className="w-4 h-4 accent-brand cursor-pointer shrink-0"
              />
              {item}
            </label>
          );
        })}
      </div>
    </div>
  );
}

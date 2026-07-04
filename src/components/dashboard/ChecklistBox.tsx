"use client";

import { useState } from "react";

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
      <div className="text-[12px] text-neutral-muted mb-[10px]">
        {checkedCount}/{items.length} item selesai
      </div>
      <div className="flex flex-col gap-[8px]">
        {items.map((item, index) => {
          const isChecked = checkedState[index];
          return (
            <label
              key={index}
              className={`flex items-center gap-[10px] bg-neutral-bg border-[1.5px] border-transparent rounded-[8px] py-[10px] px-[14px] text-[13.5px] cursor-pointer select-none transition-[border-color] duration-200 ${
                isChecked ? "text-neutral-light line-through" : "text-neutral-text hover:border-[#D8DEF5]"
              }`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleOnChange(index)}
                className="w-[16px] h-[16px] accent-brand cursor-pointer shrink-0"
              />
              {item}
            </label>
          );
        })}
      </div>
    </div>
  );
}

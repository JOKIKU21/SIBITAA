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
      <div className="checklist-progress">
        {checkedCount}/{items.length} item selesai
      </div>
      <div className="checklist-items">
        {items.map((item, index) => {
          const isChecked = checkedState[index];
          return (
            <label
              key={index}
              className={`checklist-item ${isChecked ? "checked" : ""}`}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleOnChange(index)}
              />
              {item}
            </label>
          );
        })}
      </div>
    </div>
  );
}

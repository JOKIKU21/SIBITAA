"use client";

import { useState } from "react";
import type { Stage } from "@/lib/stages";
import { ChecklistBox } from "./ChecklistBox";

export function StageForm({ stage }: { stage: Omit<Stage, "icon"> }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Tersimpan!");
    }, 600);
  };

  const checklistItems = stage.fields
    .filter((f) => f.type === "readonly-list" && f.items)
    .flatMap((f) => f.items || []);

  const otherFields = stage.fields.filter((f) => f.type !== "readonly-list");
  const hasChecklist = checklistItems.length > 0;

  return (
    <div className="panel">
      <div className="panel-head">
        {stage.name}
      </div>
      <div className="panel-body">
        <form onSubmit={handleSubmit}>
          {otherFields.map((field, idx) => {
            return (
              <div key={idx} className="dform-group">
                <label>
                  {field.label} <span className="req">*</span>
                </label>

                {field.type === "file" ? (
                  <div className="dropzone">
                    Choose a file or drag & drop it here
                  </div>
                ) : field.type === "textarea" ? (
                  <textarea className="dform-input" />
                ) : (
                  <input
                    type="text"
                    className="dform-input"
                  />
                )}
              </div>
            );
          })}

          <div className="dform-actions">
            <button
              type="button"
              className="btn-cancel"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-submit"
            >
              {loading ? "Menyimpan..." : "Selesai"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

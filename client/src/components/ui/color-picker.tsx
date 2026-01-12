import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const [color, setColor] = useState(value);

  const colors = [
    "#8b5cf6",
    "#10b981",
    "#3b82f6",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
    "#6366f1",
    "#f97316",
    "#0f172a",
    "#64748b",
    "#cbd5e1",
    "#f1f5f9",
    "#ffffff",
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[60px] h-10 border-white/20 bg-white/5"
        >
          <div
            className="w-full h-full rounded"
            style={{ backgroundColor: color }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3">
        <div className="grid grid-cols-5 gap-2">
          {colors.map((c) => (
            <button
              key={c}
              className="w-8 h-8 rounded border"
              style={{ backgroundColor: c }}
              onClick={() => {
                setColor(c);
                onChange(c);
              }}
            />
          ))}
        </div>
        <div className="mt-3">
          <input
            type="text"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
              onChange(e.target.value);
            }}
            className="w-full p-2 text-sm border rounded"
            placeholder="#000000"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

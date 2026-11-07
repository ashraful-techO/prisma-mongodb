"use client";

interface AgeFiltersProps {
  minAge: string;
  maxAge: string;
  onMinAgeChange: (value: string) => void;
  onMaxAgeChange: (value: string) => void;
  onApply: () => void;
  onReset: () => void;
}

export default function AgeFilters({
  minAge,
  maxAge,
  onMinAgeChange,
  onMaxAgeChange,
  onApply,
  onReset,
}: AgeFiltersProps) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <div>
        <label className="block text-sm font-medium mb-2">Min age</label>
        <input
          className="border p-2 rounded w-28"
          placeholder="Min"
          type="number"
          min="0"
          value={minAge}
          onChange={(event) => onMinAgeChange(event.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Max age</label>
        <input
          className="border p-2 rounded w-28"
          placeholder="Max"
          type="number"
          min="0"
          value={maxAge}
          onChange={(event) => onMaxAgeChange(event.target.value)}
        />
      </div>

      <button
        type="button"
        onClick={onApply}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Apply Filters
      </button>

      <button
        type="button"
        onClick={onReset}
        className="border px-4 py-2 rounded"
      >
        Reset Filters
      </button>
    </div>
  );
}

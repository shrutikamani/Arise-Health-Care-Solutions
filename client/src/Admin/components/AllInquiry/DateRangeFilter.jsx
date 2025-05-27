import React from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";

const DateRangeFilter = ({ dateRange, setDateRange }) => {
  const handleReset = () => {
    setDateRange({ startDate: null, endDate: null, key: "selection" });
  };

  return (
    <div className="mt-4 bg-white border border-orange-600 rounded-md p-4">
      <h3 className="text-xl flex text-center font-semibold mb-2 text-orange-700">
        Select Date Range
      </h3>
      <DateRangePicker
        ranges={[dateRange]}
        onChange={(ranges) => setDateRange(ranges.selection)}
        className="border text-lg border-orange-600 bg-white text-orange-700 rounded-md"
      />
      <p className="mt-2 text-xl text-orange-700">
        {dateRange.startDate && dateRange.endDate
          ? `Selected Range: ${format(dateRange.startDate, "dd/MM/yyyy")} - ${format(
              dateRange.endDate,
              "dd/MM/yyyy"
            )}`
          : "No date range selected"}
      </p>
      <button
        onClick={handleReset}
        className="mt-2 bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 transition text-base font-semibold"
      >
        Clear Date Range
      </button>
    </div>
  );
};

export default DateRangeFilter;

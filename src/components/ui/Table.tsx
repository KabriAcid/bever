import React from "react";

const Table: React.FC<{ columns: string[]; rows: string[][] }> = ({
  columns,
  rows,
}) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl border border-primary-100 shadow-sm">
      <table className="w-full table-auto">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className="text-left px-4 py-2 text-sm text-primary-600"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr
              key={i}
              className={`border-t border-primary-100 ${
                i % 2 === 0 ? "bg-white" : "bg-primary-50"
              }`}
            >
              {r.map((cell, ci) => (
                <td key={ci} className="px-4 py-3 text-sm text-primary-950">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

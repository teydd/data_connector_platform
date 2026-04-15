"use client";
import { DataGrid, GridRowModel } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

interface GridProps {
  extractionId: number;
}

const BASE = process.env.NEXT_PUBLIC_BASE_URL; // make sure to use NEXT_PUBLIC_ prefix

export default function Grid({ extractionId }: GridProps) {
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    let mounted = true;

    async function loadData() {
      try {
        const res = await fetch(`${BASE}/extractions/`, {
          signal: controller.signal,
        });
        const data = await res.json();

        if (!mounted) return;

        setRows(
          data.preview.map((row: any, idx: number) => ({ id: idx, ...row }))
        );
        setColumns(
          data.columns.map((col: string) => ({
            field: col,
            headerName: col,
            editable: true,
            flex: 1,
          }))
        );
      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error(err);
        }
      }
    }

    loadData();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, [extractionId]);

  const processRowUpdate = (newRow: GridRowModel, oldRow: GridRowModel) => {
    // Basic validation
    if (newRow.email && !newRow.email.includes("@")) {
      throw new Error("Invalid email address");
    }
    if (newRow.age && newRow.age < 18) {
      throw new Error("Age must be at least 18");
    }

    // Update locally
    setRows((prev) =>
      prev.map((row) => (row.id === oldRow.id ? newRow : row))
    );

    // Send update to backend
    fetch(`${BASE}/extractions/${extractionId}/extract/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newRow),
    });

    return newRow;
  };

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      autoHeight
      pagination
      pageSizeOptions={[50]}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={(error) => alert(error.message)}
    />
  );
}

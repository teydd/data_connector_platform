'use client'
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";

interface GridProps {
  extractionId: number;
}

const BASE = process.env.BASE_URL

export default function Grid({ extractionId }: GridProps) {
  const [rows, setRows] = useState<any[]>([]);
  const [columns, setColumns] = useState<any[]>([]);

  // Fetch data from backend
  useEffect(() => {
  const controller = new AbortController();
  let mounted = true;

  async function loadData() {
    try {
      const res = await fetch(
        `${BASE}/api/extractions/${extractionId}/extract?batch_size=50&offset=0`,
        { signal: controller.signal }
      );
      const data = await res.json();

      if (!mounted) return; // prevent state update after unmount

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
    controller.abort(); // cancel fetch on unmount
  };
}, [extractionId]);


  // Handle inline edits
  const handleEditCommit = (params: any) => {
    // Basic validation example
    if (params.field === "email" && !params.value.includes("@")) {
      alert("Invalid email address");
      return;
    }

    // Update locally
    setRows((prev) =>
      prev.map((row) =>
        row.id === params.id ? { ...row, [params.field]: params.value } : row,
      ),
    );

    // Send update to backend
    fetch(`/api/extractions/${extractionId}/rows/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ column: params.field, value: params.value }),
    });
  };

  return (
    <DataGrid
  rows={rows}
  columns={columns}
  autoHeight
  pagination
  paginationModel={{ pageSize: 50, page: 0 }}
  processRowUpdate={(newRow, oldRow) => {
    // Example validation
    if (newRow.email && !newRow.email.includes('@')) {
      throw new Error('Invalid email address');
    }

    // Update locally
    setRows(prev =>
      prev.map(row => (row.id === oldRow.id ? newRow : row))
    );

    // Send update to backend
    fetch(`/api/extractions/${extractionId}/rows/${oldRow.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ column: 'email', value: newRow.email })
    });

    return newRow; // must return the updated row
  }}
  onProcessRowUpdateError={(error) => {
    alert(error.message);
  }}
/>

  );
}

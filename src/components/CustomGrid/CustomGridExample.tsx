import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import CustomGrid, { ColumnDef } from "./CustomGrid";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
  },
});

const CustomGridExample: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState<ColumnDef[]>([
    {
      field: "id",
      headerName: "ID",
      width: 90,
      sortable: true,
    },
    {
      field: "firstName",
      headerName: "First Name",
      width: 130,
      sortable: true,
      filterable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      width: 130,
      sortable: true,
      filterable: true,
    },
    {
      field: "age",
      headerName: "Age",
      width: 90,
      sortable: true,
      filterable: true,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      sortable: true,
      filterable: true,
      renderCell: ({ row }) => (
        <span
          style={{
            color: row.status === "Active" ? "#4caf50" : "#f44336",
            fontWeight: "bold",
          }}
        >
          {row.status}
        </span>
      ),
    },
  ]);

  // Sample data
  const rows = [
    { id: 1, firstName: "John", lastName: "Doe", age: 30, status: "Active" },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      age: 25,
      status: "Inactive",
    },
    { id: 3, firstName: "Bob", lastName: "Johnson", age: 45, status: "Active" },
    { id: 4, firstName: "Alice", lastName: "Brown", age: 28, status: "Active" },
    {
      id: 5,
      firstName: "Charlie",
      lastName: "Wilson",
      age: 35,
      status: "Inactive",
    },
    {
      id: 6,
      firstName: "David",
      lastName: "Miller",
      age: 32,
      status: "Active",
    },
    { id: 7, firstName: "Emma", lastName: "Davis", age: 27, status: "Active" },
    {
      id: 8,
      firstName: "Frank",
      lastName: "Wilson",
      age: 41,
      status: "Inactive",
    },
    {
      id: 9,
      firstName: "Grace",
      lastName: "Taylor",
      age: 29,
      status: "Active",
    },
    {
      id: 10,
      firstName: "Henry",
      lastName: "Anderson",
      age: 38,
      status: "Active",
    },
  ];

  const handleRowClick = (row: any) => {
    console.log("Clicked row:", row);
  };

  const handleSelectionChange = (selectedRows: any[]) => {
    console.log("Selected rows:", selectedRows);
  };

  const handleColumnOrderChange = (newColumns: ColumnDef[]) => {
    console.log(
      "New column order:",
      newColumns.map((col) => col.field)
    );
    setColumns(newColumns);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div
        style={{
          padding: "20px",
          backgroundColor: darkTheme.palette.background.default,
          minHeight: "100vh",
        }}
      >
        <h1 style={{ color: darkTheme.palette.text.primary }}>
          Custom Grid Example
        </h1>
        <CustomGrid
          columns={columns}
          rows={rows}
          onRowClick={handleRowClick}
          onSelectionChange={handleSelectionChange}
          onColumnOrderChange={handleColumnOrderChange}
          pageSize={5}
          checkboxSelection
          loading={loading}
        />
      </div>
    </ThemeProvider>
  );
};

export default CustomGridExample;

import { Box, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import CustomGrid, { ColumnDef } from "./CustomGrid";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#1e1e1e",
      default: "#121212",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
    divider: "#2d2d2d",
    action: {
      hover: "rgba(255, 255, 255, 0.08)",
      selected: "rgba(255, 255, 255, 0.16)",
    },
  },
});

const exampleColumns: ColumnDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 80,
    sortable: true,
    filterable: true,
    type: "text",
  },
  {
    field: "firstName",
    headerName: "First Name",
    width: 130,
    sortable: true,
    filterable: true,
    type: "text",
  },
  {
    field: "lastName",
    headerName: "Last Name",
    width: 130,
    sortable: true,
    filterable: true,
    type: "text",
  },
  {
    field: "age",
    headerName: "Age",
    width: 90,
    sortable: true,
    filterable: true,
    type: "number",
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    sortable: true,
    filterable: true,
    type: "text",
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    sortable: true,
    filterable: true,
    type: "text",
    renderCell: (params) => (
      <Box
        sx={{
          backgroundColor:
            params.row.status === "Active" ? "success.light" : "error.light",
          color: params.row.status === "Active" ? "success.dark" : "error.dark",
          padding: "4px 8px",
          borderRadius: "4px",
          fontSize: "0.875rem",
          fontWeight: 500,
        }}
      >
        {params.row.status}
      </Box>
    ),
  },
  {
    field: "joinDate",
    headerName: "Join Date",
    width: 130,
    sortable: true,
    filterable: true,
    type: "date",
    renderCell: (params) => new Date(params.row.joinDate).toLocaleDateString(),
  },
  {
    field: "salary",
    headerName: "Salary",
    width: 130,
    sortable: true,
    filterable: true,
    type: "number",
    renderCell: (params) => `$${params.row.salary.toLocaleString()}`,
  },
  {
    field: "department",
    headerName: "Department",
    width: 150,
    sortable: true,
    filterable: true,
    type: "text",
  },
  {
    field: "isActive",
    headerName: "Active",
    width: 100,
    sortable: true,
    filterable: true,
    type: "boolean",
    renderCell: (params) => (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: params.row.isActive
              ? "success.main"
              : "error.main",
          }}
        />
        {params.row.isActive ? "Yes" : "No"}
      </Box>
    ),
  },
];

const exampleRows = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    age: 32,
    email: "john.doe@example.com",
    status: "Active",
    joinDate: "2023-01-15",
    salary: 75000,
    department: "Engineering",
    isActive: true,
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    age: 28,
    email: "jane.smith@example.com",
    status: "Inactive",
    joinDate: "2023-02-20",
    salary: 65000,
    department: "Marketing",
    isActive: false,
  },
  {
    id: "3",
    firstName: "Michael",
    lastName: "Johnson",
    age: 35,
    email: "michael.j@example.com",
    status: "Active",
    joinDate: "2023-03-10",
    salary: 85000,
    department: "Sales",
    isActive: true,
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Brown",
    age: 30,
    email: "emily.b@example.com",
    status: "Active",
    joinDate: "2023-04-05",
    salary: 70000,
    department: "HR",
    isActive: true,
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Wilson",
    age: 45,
    email: "david.w@example.com",
    status: "Inactive",
    joinDate: "2023-05-12",
    salary: 95000,
    department: "Engineering",
    isActive: false,
  },
];

const ExampleUsage: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          padding: "20px",
          bgcolor: "background.default",
          minHeight: "100vh",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <h1 style={{ color: "#ffffff", marginBottom: "20px" }}>
          Custom Grid Example
        </h1>
        <CustomGrid
          columns={exampleColumns}
          rows={exampleRows}
          checkboxSelection
          pageSize={10}
          onRowClick={(row) => console.log("Clicked row:", row)}
          onSelectionChange={(selectedRows) =>
            console.log("Selected rows:", selectedRows)
          }
          onColumnOrderChange={(newColumns) =>
            console.log("New column order:", newColumns)
          }
        />
      </Box>
    </ThemeProvider>
  );
};

export default ExampleUsage;

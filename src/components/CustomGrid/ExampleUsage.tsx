import { Box, Chip, ThemeProvider, createTheme } from "@mui/material";
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

const columns: ColumnDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 80,
    sortable: true,
  },
  {
    field: "name",
    headerName: "Very Long Column Name That Will Be Truncated",
    sortable: true,
    filterable: true,
  },
  {
    field: "email",
    headerName: "Email Address",
    sortable: true,
    filterable: true,
  },
  {
    field: "status",
    headerName: "Status",
    sortable: true,
    filterable: true,
    renderCell: ({ row }) => (
      <Chip
        label={row.status}
        color={row.status === "Active" ? "success" : "error"}
        size="small"
      />
    ),
  },
  {
    field: "description",
    headerName: "Description",
    sortable: true,
    filterable: true,
  },
  {
    field: "longText",
    headerName: "Long Text Field",
    sortable: true,
    filterable: true,
  },
];

// Example data with various content types
const rows = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    status: "Active",
    description:
      "This is a very long description that will be truncated in the grid",
    longText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    status: "Inactive",
    description: "Another long description that needs truncation",
    longText:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    status: "Active",
    description: "Short desc",
    longText:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@example.com",
    status: "Inactive",
    description: "Yet another description that will be truncated",
    longText:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    status: "Active",
    description:
      "A very detailed description that needs to be truncated in the grid view",
    longText:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
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
          columns={columns}
          rows={rows}
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

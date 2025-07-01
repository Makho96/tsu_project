import { ThemeProvider, createTheme } from '@mui/material/styles';
import React, { useState } from 'react';
import CustomGrid from './CustomGrid';
import { ColumnDef } from './Customgrid.types';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
});

const CustomGridExample: React.FC = () => {
  const [loading] = useState(false);
  const [columns, setColumns] = useState<ColumnDef[]>([
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      sortable: true,
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      width: 200,
      sortable: true,
      filterable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 200,
      sortable: true,
      filterable: true,
    },
    {
      field: 'age',
      headerName: 'Age',
      width: 120,
      sortable: true,
      filterable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      sortable: true,
      filterable: true,
      renderCell: ({ row }) => (
        <span
          style={{
            color: row.status === 'Active' ? '#4caf50' : '#f44336',
            fontWeight: 'bold',
          }}
        >
          {row.status}
        </span>
      ),
    },
    {
      field: 'email',
      headerName: 'Email Address',
      width: 300,
      sortable: true,
      filterable: true,
    },
    {
      field: 'department',
      headerName: 'Department',
      width: 200,
      sortable: true,
      filterable: true,
    },
    {
      field: 'salary',
      headerName: 'Salary',
      width: 150,
      sortable: true,
      filterable: true,
    },
  ]);

  // Sample data
  const rows = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      status: 'Active',
      email: 'john.doe@company.com',
      department: 'Engineering',
      salary: '$75,000',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      age: 25,
      status: 'Inactive',
      email: 'jane.smith@company.com',
      department: 'Marketing',
      salary: '$65,000',
    },
    {
      id: 3,
      firstName: 'Bob',
      lastName: 'Johnson',
      age: 45,
      status: 'Active',
      email: 'bob.johnson@company.com',
      department: 'Sales',
      salary: '$85,000',
    },
    {
      id: 4,
      firstName: 'Alice',
      lastName: 'Brown',
      age: 28,
      status: 'Active',
      email: 'alice.brown@company.com',
      department: 'HR',
      salary: '$60,000',
    },
    {
      id: 5,
      firstName: 'Charlie',
      lastName: 'Wilson',
      age: 35,
      status: 'Inactive',
      email: 'charlie.wilson@company.com',
      department: 'Finance',
      salary: '$80,000',
    },
    {
      id: 6,
      firstName: 'David',
      lastName: 'Miller',
      age: 32,
      status: 'Active',
      email: 'david.miller@company.com',
      department: 'Engineering',
      salary: '$90,000',
    },
    {
      id: 7,
      firstName: 'Emma',
      lastName: 'Davis',
      age: 27,
      status: 'Active',
      email: 'emma.davis@company.com',
      department: 'Design',
      salary: '$70,000',
    },
    {
      id: 8,
      firstName: 'Frank',
      lastName: 'Wilson',
      age: 41,
      status: 'Inactive',
      email: 'frank.wilson@company.com',
      department: 'Operations',
      salary: '$78,000',
    },
    {
      id: 9,
      firstName: 'Grace',
      lastName: 'Taylor',
      age: 29,
      status: 'Active',
      email: 'grace.taylor@company.com',
      department: 'Marketing',
      salary: '$72,000',
    },
    {
      id: 10,
      firstName: 'Henry',
      lastName: 'Anderson',
      age: 38,
      status: 'Active',
      email: 'henry.anderson@company.com',
      department: 'Sales',
      salary: '$88,000',
    },
  ];

  const handleRowClick = (row: any) => {
    console.log('Clicked row:', row);
  };

  const handleSelectionChange = (selectedRows: any[]) => {
    console.log('Selected rows:', selectedRows);
  };

  const handleColumnOrderChange = (newColumns: ColumnDef[]) => {
    console.log(
      'New column order:',
      newColumns.map((col) => col.field)
    );
    setColumns(newColumns);
  };

  return (
    <ThemeProvider theme={darkTheme}>
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
    </ThemeProvider>
  );
};

export default CustomGridExample;

// import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  Table,
  TableContainer,
  TablePagination,
  Paper,
  Checkbox,
  CircularProgress,
  useTheme,
  IconButton,
  Tooltip,
  Popover,
  FormGroup,
  FormControlLabel,
  Divider,
  Typography,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { Workbook } from 'exceljs';
import React, { useState, useMemo, useCallback, memo, useEffect } from 'react';
import {
  DndProvider,
  // useDrag, useDrop
} from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useTranslation } from 'react-i18next';
import { theme } from '../../theme';
import TableBody from './components/TableBody';
import TableHead from './components/TableHead';
import { ColumnDef } from './Customgrid.types';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: theme.palette.background.default,
      paper: theme.palette.blue[800],
    },
    primary: {
      main: theme.palette.primary.main,
    },
    secondary: {
      main: theme.palette.secondary.main,
    },
  },
});

interface CustomGridProps {
  columns: ColumnDef[];
  rows: any[];
  onRowClick?: (row: any) => void;
  onSelectionChange?: (selectedRows: any[]) => void;
  pageSize?: number;
  checkboxSelection?: boolean;
  loading?: boolean;
  onColumnOrderChange?: (newColumns: ColumnDef[]) => void;
  tableActions?: React.ReactNode;
}

const CustomGrid: React.FC<CustomGridProps> = ({
  columns: initialColumns,
  rows,
  onRowClick,
  onSelectionChange,
  pageSize = 10,
  checkboxSelection = false,
  loading = false,
  onColumnOrderChange,
  tableActions,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [columns, setColumns] = useState(initialColumns);
  const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>(() => {
    // Use the provided width or calculate based on content if no width is specified
    return initialColumns.reduce((acc, col) => {
      let width = col.width;

      if (!width) {
        // Only calculate width if not explicitly provided
        const headerLength = col.headerName.length;
        const maxContentLength = Math.max(
          headerLength,
          ...rows.map((row) => String(row[col.field]).length)
        );
        // Convert character length to approximate pixel width (assuming ~8px per character)
        const contentWidth = maxContentLength * 8;
        // Add padding and ensure minimum width
        width = Math.max(150, contentWidth + 32); // 32px for padding
      }

      return {
        ...acc,
        [col.field]: width,
      };
    }, {});
  });
  const [visibleColumns, setVisibleColumns] = useState<{
    [key: string]: boolean;
  }>(() => initialColumns.reduce((acc, col) => ({ ...acc, [col.field]: true }), {}));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [orderBy, setOrderBy] = useState<string>('');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string[] }>(() => {
    return initialColumns.reduce((acc, col) => ({ ...acc, [col.field]: [''] }), {});
  });

  const [filterAnchorEl, setFilterAnchorEl] = useState<{
    [key: string]: HTMLElement | null;
  }>({});
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<HTMLElement | null>(null);

  // Update internal state when props change
  useEffect(() => {
    setColumns(initialColumns);

    // Update column widths based on new columns
    const newColumnWidths = initialColumns.reduce((acc, col) => {
      let width = col.width;

      if (!width) {
        // Only calculate width if not explicitly provided
        const headerLength = col.headerName.length;
        const maxContentLength = Math.max(
          headerLength,
          ...rows.map((row) => String(row[col.field]).length)
        );
        // Convert character length to approximate pixel width (assuming ~8px per character)
        const contentWidth = maxContentLength * 8;
        // Add padding and ensure minimum width
        width = Math.max(150, contentWidth + 32); // 32px for padding
      }

      return {
        ...acc,
        [col.field]: width,
      };
    }, {});

    setColumnWidths(newColumnWidths);

    // Update visible columns
    const newVisibleColumns = initialColumns.reduce(
      (acc, col) => ({ ...acc, [col.field]: true }),
      {}
    );
    setVisibleColumns(newVisibleColumns);
  }, [initialColumns, rows]);

  const handleFilterClick = useCallback((event: React.MouseEvent<HTMLElement>, field: string) => {
    event.stopPropagation();
    setFilterAnchorEl((prev) => ({
      ...prev,
      [field]: prev[field] ? null : event.currentTarget,
    }));
  }, []);

  const handleFilterClose = useCallback((field: string) => {
    setFilterAnchorEl((prev) => ({
      ...prev,
      [field]: null,
    }));
  }, []);

  const moveColumn = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      setColumns((prevColumns) => {
        const newColumns = [...prevColumns];
        const draggedColumn = newColumns[dragIndex];
        newColumns.splice(dragIndex, 1);
        newColumns.splice(hoverIndex, 0, draggedColumn);
        onColumnOrderChange?.(newColumns);
        return newColumns;
      });
    },
    [onColumnOrderChange]
  );

  const handleSort = useCallback(
    (field: string) => {
      setOrder((prevOrder) => {
        const isAsc = orderBy === field && prevOrder === 'asc';
        return isAsc ? 'desc' : 'asc';
      });
      setOrderBy(field);
    },
    [orderBy]
  );

  const handleFilter = useCallback((field: string, value: string, index: number) => {
    setFilters((prev) => {
      const newFilters = [...prev[field]];
      newFilters[index] = value;
      return {
        ...prev,
        [field]: newFilters,
      };
    });
  }, []);

  const handleSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelected = rows.map((row) => row.id);
        setSelected(newSelected);
        onSelectionChange?.(rows);
        return;
      }
      setSelected([]);
      onSelectionChange?.([]);
    },
    [rows, onSelectionChange]
  );

  const handleClick = useCallback(
    (id: string) => {
      setSelected((prevSelected) => {
        const selectedIndex = prevSelected.indexOf(id);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
          newSelected = newSelected.concat(prevSelected, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(prevSelected.slice(1));
        } else if (selectedIndex === prevSelected.length - 1) {
          newSelected = newSelected.concat(prevSelected.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            prevSelected.slice(0, selectedIndex),
            prevSelected.slice(selectedIndex + 1)
          );
        }

        onSelectionChange?.(rows.filter((row) => newSelected.includes(row.id)));
        return newSelected;
      });
    },
    [rows, onSelectionChange]
  );

  const isSelected = useCallback((id: string) => selected.indexOf(id) !== -1, [selected]);

  const filteredAndSortedRows = useMemo(() => {
    let processedRows = [...rows];

    // Apply filters directly
    Object.entries(filters).forEach(([field, value]) => {
      if (value) {
        processedRows = processedRows.filter((row) =>
          value.some((v, index) => {
            if (index === 0) {
              return String(row[field]).toLowerCase().includes(v.toLowerCase());
            }
            return !!v.length && String(row[field]).toLowerCase().includes(v.toLowerCase());
          })
        );
      }
    });

    // Apply sorting
    if (orderBy) {
      processedRows.sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (order === 'asc') {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
    }

    return processedRows;
  }, [rows, filters, orderBy, order]);

  const paginatedRows = useMemo(() => {
    return filteredAndSortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [filteredAndSortedRows, page, rowsPerPage]);

  const handleChangePage = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const handleClearFilter = useCallback((field: string, index: number) => {
    setFilters((prev) => {
      const newFilters = [...prev[field]];
      newFilters[index] = '';
      return {
        ...prev,
        [field]: newFilters,
      };
    });
  }, []);

  const handleColumnResize = useCallback((field: string, width: number) => {
    setColumnWidths((prev) => ({
      ...prev,
      [field]: width,
    }));
  }, []);

  // Update columns with resize handler
  const columnsWithResize = useMemo(() => {
    return columns.map((col) => ({
      ...col,
      width: columnWidths[col.field],
      onResize: (width: number) => handleColumnResize(col.field, width),
    }));
  }, [columns, columnWidths, handleColumnResize]);

  const handleSettingsClick = (event: React.MouseEvent<HTMLElement>) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };

  const handleColumnVisibilityChange =
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setVisibleColumns((prev) => ({
        ...prev,
        [field]: event.target.checked,
      }));
    };

  // Filter columns based on visibility
  const visibleColumnsWithResize = useMemo(() => {
    return columnsWithResize.filter((col) => visibleColumns[col.field]);
  }, [columnsWithResize, visibleColumns]);

  // Calculate total width of all visible columns
  const totalTableWidth = useMemo(() => {
    const checkboxWidth = checkboxSelection ? 48 : 0;
    const columnsWidth = visibleColumnsWithResize.reduce((total, col) => {
      return total + (col.width || 150);
    }, 0);
    return checkboxWidth + columnsWidth;
  }, [visibleColumnsWithResize, checkboxSelection]);

  const handleExport = async () => {
    // Get the current view of the data (filtered and sorted)
    const dataToExport = filteredAndSortedRows.map((row) => {
      const rowData: { [key: string]: any } = {};
      columnsWithResize.forEach((column) => {
        let value;
        if (column.renderCell) {
          const renderedCell = column.renderCell({ row });
          if (React.isValidElement(renderedCell)) {
            value = String(renderedCell);
          } else if (typeof renderedCell === 'object' && renderedCell !== null) {
            value = JSON.stringify(renderedCell);
          } else {
            value = renderedCell;
          }
        } else {
          value = row[column.field];
        }
        rowData[column.headerName] = value;
      });
      return rowData;
    });

    // Create a new workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Data');

    // Add headers
    const headers = columnsWithResize.map((col) => col.headerName);
    worksheet.addRow(headers);

    // Style the header row
    const headerRow = worksheet.getRow(1);
    headerRow.height = 25;
    headerRow.font = {
      bold: true,
      color: { argb: 'FFFFFFFF' }, // White text
    };
    headerRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FF4F81BD' }, // Blue background
    };
    headerRow.alignment = {
      vertical: 'middle',
      horizontal: 'center',
    };

    // Add data rows
    dataToExport.forEach((row) => {
      worksheet.addRow(headers.map((header) => row[header]));
    });

    // Set column widths
    columnsWithResize.forEach((col, index) => {
      const maxLength = Math.max(
        col.headerName.length,
        ...dataToExport.map((row) => String(row[col.headerName] || '').length)
      );
      worksheet.getColumn(index + 1).width = maxLength + 2;
    });

    // Style all cells
    worksheet.eachRow((row, rowNumber) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        if (rowNumber > 1) {
          cell.alignment = {
            vertical: 'middle',
            horizontal: 'left',
          };
        }
      });
    });

    // Generate and download the file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'grid-export.xlsx';
    link.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={400}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <DndProvider backend={HTML5Backend}>
        <Paper
          sx={{
            width: '100%',
            overflow: 'hidden',
            bgcolor: theme.palette.blue[900],
            backgroundImage: 'none',
            height: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 1,
              borderBottom: 1,
              borderColor: 'divider',
              gap: 1,
            }}
          >
            {tableActions}
            <Tooltip title={t('grid.exportToExcel')}>
              <IconButton
                onClick={handleExport}
                size="small"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                <FileDownloadIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('grid.columnsVisibility')}>
              <IconButton
                onClick={handleSettingsClick}
                size="small"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
            <Popover
              open={Boolean(settingsAnchorEl)}
              anchorEl={settingsAnchorEl}
              onClose={handleSettingsClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              PaperProps={{
                sx: {
                  p: 2,
                  minWidth: 200,
                  boxShadow: theme.shadows[3],
                },
              }}
            >
              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                  {t('grid.columnsVisibility')}
                </Typography>
              </Box>
              <Divider sx={{ mb: 1 }} />
              <FormGroup>
                {columns.map((column) => (
                  <FormControlLabel
                    key={column.field}
                    control={
                      <Checkbox
                        checked={visibleColumns[column.field]}
                        onChange={handleColumnVisibilityChange(column.field)}
                        size="small"
                        sx={{
                          color: 'text.secondary',
                          '&.Mui-checked': {
                            color: 'primary.main',
                          },
                        }}
                      />
                    }
                    label={column.headerName}
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        color: 'text.primary',
                      },
                    }}
                  />
                ))}
              </FormGroup>
            </Popover>
          </Box>
          <TableContainer
            sx={{
              height: `calc(100% - 104px)`,
              overflowX: 'auto',
              '&::-webkit-scrollbar': {
                height: 8,
              },
              '&::-webkit-scrollbar-track': {
                background: theme.palette.background.default,
              },
              '&::-webkit-scrollbar-thumb': {
                background: theme.palette.divider,
                borderRadius: 4,
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: theme.palette.action.hover,
              },
            }}
          >
            <Table
              stickyHeader
              sx={{
                tableLayout: 'fixed',
                minWidth: `${totalTableWidth}px`,
                width: '100%',
              }}
            >
              <TableHead
                checkboxSelection={checkboxSelection}
                selected={selected}
                filteredAndSortedRows={filteredAndSortedRows}
                handleSelectAllClick={handleSelectAllClick}
                visibleColumnsWithResize={visibleColumnsWithResize}
                moveColumn={moveColumn}
                orderBy={orderBy}
                order={order}
                handleSort={handleSort}
                filters={filters}
                handleFilterClick={handleFilterClick}
                filterAnchorEl={filterAnchorEl}
                handleFilterClose={handleFilterClose}
                handleFilter={handleFilter}
                handleClearFilter={handleClearFilter}
                setFilters={setFilters}
              />
              <TableBody
                paginatedRows={paginatedRows}
                checkboxSelection={checkboxSelection}
                isSelected={isSelected}
                onRowClick={onRowClick}
                handleChekboxClick={handleClick}
                visibleColumnsWithResize={visibleColumnsWithResize}
                columnWidths={columnWidths}
              />
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredAndSortedRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            labelRowsPerPage={t('grid.rowPerPage')}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              bgcolor: theme.palette.blue[900],
              color: 'text.primary',
              borderTop: 1,
              borderColor: 'divider',
              '& .MuiTablePagination-select': {
                color: 'text.primary',
              },
              '& .MuiTablePagination-selectIcon': {
                color: 'text.secondary',
              },
              '& .MuiTablePagination-displayedRows': {
                color: 'text.primary',
              },
              '& .MuiTablePagination-actions': {
                color: 'text.secondary',
              },
              '& .MuiIconButton-root': {
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                },
              },
            }}
          />
        </Paper>
      </DndProvider>
    </ThemeProvider>
  );
};

export default memo(CustomGrid);

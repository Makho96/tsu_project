import ClearIcon from "@mui/icons-material/Clear";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import FilterListIcon from "@mui/icons-material/FilterList";
import FilterListOffIcon from "@mui/icons-material/FilterListOff";
import SettingsIcon from "@mui/icons-material/Settings";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  Paper,
  Checkbox,
  TextField,
  CircularProgress,
  useTheme,
  IconButton,
  Tooltip,
  Popover,
  InputAdornment,
  FormGroup,
  FormControlLabel,
  Switch,
  Divider,
  Typography,
} from "@mui/material";
import React, {
  useState,
  useMemo,
  useCallback,
  memo,
  useRef,
  useEffect,
} from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export interface ColumnDef {
  field: string;
  headerName: string;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  renderCell?: (params: any) => React.ReactNode;
  type?: "text" | "number" | "date" | "boolean" | "custom";
  onResize?: (width: number) => void;
}

interface CustomGridProps {
  columns: ColumnDef[];
  rows: any[];
  onRowClick?: (row: any) => void;
  onSelectionChange?: (selectedRows: any[]) => void;
  pageSize?: number;
  checkboxSelection?: boolean;
  loading?: boolean;
  onColumnOrderChange?: (newColumns: ColumnDef[]) => void;
}

interface DraggableHeaderProps {
  column: ColumnDef;
  index: number;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
}

const DraggableHeader: React.FC<DraggableHeaderProps> = ({
  column,
  index,
  moveColumn,
  children,
}) => {
  const ref = React.useRef<HTMLTableCellElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: "COLUMN",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "COLUMN",
    hover: (item: { index: number }, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleX =
        (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientX = clientOffset!.x - hoverBoundingRect.left;

      if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
        return;
      }

      moveColumn(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.pageX;
    const startWidth = column.width || 150;
    const minWidth = 100;

    const onMouseMove = (e: MouseEvent) => {
      const width = Math.max(minWidth, startWidth + (e.pageX - startX));
      if (column.onResize) {
        column.onResize(width);
      }
    };

    const onMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  drag(drop(ref));

  return (
    <TableCell
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "move",
        width: column.width,
        minWidth: 150,
        maxWidth: column.width,
        padding: "16px",
        whiteSpace: "nowrap",
        position: "sticky",
        top: 0,
        zIndex: 2,
        backgroundColor: "background.paper",
      }}
    >
      <Box display="flex" alignItems="center">
        <IconButton size="small" sx={{ cursor: "move", mr: 1 }}>
          <DragIndicatorIcon />
        </IconButton>
        {children}
      </Box>
      <Box
        component="div"
        onMouseDown={onMouseDown}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
            e.preventDefault();
            const newWidth =
              e.key === "ArrowLeft"
                ? Math.max(150, (column.width || 150) - 10)
                : (column.width || 150) + 10;
            if (column.onResize) {
              column.onResize(newWidth);
            }
          }
        }}
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "8px",
          cursor: "col-resize",
          backgroundColor: isResizing ? "primary.main" : "transparent",
          border: "none",
          padding: 0,
          zIndex: 3,
          "&:hover": {
            backgroundColor: "primary.main",
          },
        }}
        aria-label="Resize column"
        role="slider"
        aria-valuemin={150}
        aria-valuemax={500}
        aria-valuenow={column.width || 150}
        tabIndex={0}
      />
    </TableCell>
  );
};

const CustomGrid: React.FC<CustomGridProps> = ({
  columns: initialColumns,
  rows,
  onRowClick,
  onSelectionChange,
  pageSize = 10,
  checkboxSelection = false,
  loading = false,
  onColumnOrderChange,
}) => {
  const theme = useTheme();
  const [columns, setColumns] = useState(initialColumns);
  const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>(
    () => {
      // Calculate initial widths based on content
      return initialColumns.reduce((acc, col) => {
        // Get the maximum length between header and content
        const headerLength = col.headerName.length;
        const maxContentLength = Math.max(
          headerLength,
          ...rows.map((row) => String(row[col.field]).length)
        );
        // Convert character length to approximate pixel width (assuming ~8px per character)
        const contentWidth = maxContentLength * 8;
        // Add padding and ensure minimum width
        const totalWidth = Math.max(150, contentWidth + 32); // 32px for padding
        return {
          ...acc,
          [col.field]: totalWidth,
        };
      }, {});
    }
  );
  const [visibleColumns, setVisibleColumns] = useState<{
    [key: string]: boolean;
  }>(() =>
    initialColumns.reduce((acc, col) => ({ ...acc, [col.field]: true }), {})
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pageSize);
  const [orderBy, setOrderBy] = useState<string>("");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [selected, setSelected] = useState<string[]>([]);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});
  const [filterAnchorEl, setFilterAnchorEl] = useState<{
    [key: string]: HTMLElement | null;
  }>({});
  const [settingsAnchorEl, setSettingsAnchorEl] = useState<HTMLElement | null>(
    null
  );

  const handleFilterClick = useCallback(
    (event: React.MouseEvent<HTMLElement>, field: string) => {
      event.stopPropagation();
      setFilterAnchorEl((prev) => ({
        ...prev,
        [field]: prev[field] ? null : event.currentTarget,
      }));
    },
    []
  );

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
        const isAsc = orderBy === field && prevOrder === "asc";
        return isAsc ? "desc" : "asc";
      });
      setOrderBy(field);
    },
    [orderBy]
  );

  const handleFilter = useCallback((field: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
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

  const isSelected = useCallback(
    (id: string) => selected.indexOf(id) !== -1,
    [selected]
  );

  const filteredAndSortedRows = useMemo(() => {
    let processedRows = [...rows];

    // Apply filters directly
    Object.entries(filters).forEach(([field, value]) => {
      if (value) {
        processedRows = processedRows.filter((row) =>
          String(row[field]).toLowerCase().includes(value.toLowerCase())
        );
      }
    });

    // Apply sorting
    if (orderBy) {
      processedRows.sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];
        if (order === "asc") {
          return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        } else {
          return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
        }
      });
    }

    return processedRows;
  }, [rows, filters, orderBy, order]);

  const paginatedRows = useMemo(() => {
    return filteredAndSortedRows.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredAndSortedRows, page, rowsPerPage]);

  const handleChangePage = useCallback((_event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  const handleClearFilter = useCallback((field: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: "",
    }));
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

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={400}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Paper
        sx={{
          bgcolor: "background.paper",
          width: "100%",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 1,
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Tooltip title="Column Settings">
            <IconButton
              onClick={handleSettingsClick}
              size="small"
              sx={{
                color: "text.secondary",
                "&:hover": {
                  color: "primary.main",
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
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            PaperProps={{
              sx: {
                p: 2,
                minWidth: 200,
                bgcolor: "background.paper",
                boxShadow: theme.shadows[3],
              },
            }}
          >
            <Box sx={{ mb: 1 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                Visible Columns
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
                        color: "text.secondary",
                        "&.Mui-checked": {
                          color: "primary.main",
                        },
                      }}
                    />
                  }
                  label={column.headerName}
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      color: "text.primary",
                    },
                  }}
                />
              ))}
            </FormGroup>
          </Popover>
        </Box>
        <TableContainer
          sx={{
            maxHeight: 400,
            overflowX: "auto",
            "&::-webkit-scrollbar": {
              height: 8,
            },
            "&::-webkit-scrollbar-track": {
              background: theme.palette.background.default,
            },
            "&::-webkit-scrollbar-thumb": {
              background: theme.palette.divider,
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: theme.palette.action.hover,
            },
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {checkboxSelection && (
                  <TableCell
                    padding="checkbox"
                    sx={{
                      width: 48,
                      minWidth: 48,
                      padding: "16px 8px",
                      bgcolor: "background.paper",
                      color: "text.primary",
                      position: "sticky",
                      top: 0,
                      zIndex: 2,
                    }}
                  >
                    <Checkbox
                      indeterminate={
                        selected.length > 0 &&
                        selected.length < filteredAndSortedRows.length
                      }
                      checked={
                        filteredAndSortedRows.length > 0 &&
                        selected.length === filteredAndSortedRows.length
                      }
                      onChange={handleSelectAllClick}
                      sx={{
                        color: "text.secondary",
                        "&.Mui-checked": {
                          color: "primary.main",
                        },
                      }}
                    />
                  </TableCell>
                )}
                {visibleColumnsWithResize.map((column, index) => (
                  <DraggableHeader
                    key={column.field}
                    column={column}
                    index={index}
                    moveColumn={moveColumn}
                  >
                    <Tooltip title={column.headerName} placement="top">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          minWidth: 0,
                        }}
                      >
                        <Box
                          sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            flex: 1,
                          }}
                        >
                          {column.sortable ? (
                            <TableSortLabel
                              active={orderBy === column.field}
                              direction={
                                orderBy === column.field ? order : "asc"
                              }
                              onClick={() => handleSort(column.field)}
                              sx={{
                                color: "text.primary",
                                "&.MuiTableSortLabel-root": {
                                  color: "text.primary",
                                },
                                "&.MuiTableSortLabel-root:hover": {
                                  color: "primary.main",
                                },
                                "&.Mui-active": {
                                  color: "primary.main",
                                },
                                "& .MuiTableSortLabel-icon": {
                                  color: "primary.main !important",
                                },
                              }}
                            >
                              {column.headerName}
                            </TableSortLabel>
                          ) : (
                            column.headerName
                          )}
                        </Box>
                        {column.filterable && (
                          <Tooltip
                            title={
                              filters[column.field]
                                ? "Filter active"
                                : "Show filter"
                            }
                          >
                            <IconButton
                              size="small"
                              onClick={(e) =>
                                handleFilterClick(e, column.field)
                              }
                              sx={{
                                color: filters[column.field]
                                  ? "primary.main"
                                  : "text.secondary",
                                "&:hover": {
                                  color: "primary.main",
                                },
                                flexShrink: 0,
                              }}
                            >
                              <FilterListIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </Box>
                    </Tooltip>
                    {column.filterable && (
                      <Popover
                        open={Boolean(filterAnchorEl[column.field])}
                        anchorEl={filterAnchorEl[column.field]}
                        onClose={() => handleFilterClose(column.field)}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "left",
                        }}
                        PaperProps={{
                          sx: {
                            p: 2,
                            mt: 1,
                            bgcolor: "background.paper",
                            boxShadow: theme.shadows[3],
                          },
                        }}
                      >
                        <TextField
                          size="small"
                          value={filters[column.field] || ""}
                          onChange={(e) =>
                            handleFilter(column.field, e.target.value)
                          }
                          placeholder={`Filter ${column.headerName}`}
                          fullWidth
                          InputProps={{
                            endAdornment: filters[column.field] && (
                              <InputAdornment position="end">
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    handleClearFilter(column.field)
                                  }
                                  edge="end"
                                >
                                  <ClearIcon fontSize="small" />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            minWidth: 200,
                            "& .MuiInputBase-root": {
                              color: "text.primary",
                            },
                            "& .MuiInputLabel-root": {
                              color: "text.secondary",
                            },
                            "& .MuiOutlinedInput-notchedOutline": {
                              borderColor: "divider",
                            },
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                              borderColor: "primary.main",
                            },
                          }}
                        />
                      </Popover>
                    )}
                  </DraggableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => {
                const isItemSelected = isSelected(row.id);
                return (
                  <TableRow
                    hover
                    onClick={() => onRowClick?.(row)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{
                      "&:hover": {
                        bgcolor: "action.hover",
                      },
                      "&.Mui-selected": {
                        bgcolor: "action.selected",
                      },
                      "&.Mui-selected:hover": {
                        bgcolor: "action.selected",
                      },
                    }}
                  >
                    {checkboxSelection && (
                      <TableCell
                        padding="checkbox"
                        sx={{
                          width: 48,
                          minWidth: 48,
                          padding: "16px 8px",
                          bgcolor: "background.paper",
                          color: "text.primary",
                        }}
                      >
                        <Checkbox
                          checked={isItemSelected}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClick(row.id);
                          }}
                          sx={{
                            color: "text.secondary",
                            "&.Mui-checked": {
                              color: "primary.main",
                            },
                          }}
                        />
                      </TableCell>
                    )}
                    {visibleColumnsWithResize.map((column) => (
                      <TableCell
                        key={column.field}
                        sx={{
                          width: columnWidths[column.field],
                          minWidth: 150,
                          maxWidth: columnWidths[column.field],
                          padding: "16px",
                          whiteSpace: "nowrap",
                          bgcolor: "background.paper",
                          color: "text.primary",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {column.renderCell
                          ? column.renderCell({ row })
                          : row[column.field]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredAndSortedRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            bgcolor: "background.paper",
            color: "text.primary",
            borderTop: 1,
            borderColor: "divider",
            "& .MuiTablePagination-select": {
              color: "text.primary",
            },
            "& .MuiTablePagination-selectIcon": {
              color: "text.secondary",
            },
            "& .MuiTablePagination-displayedRows": {
              color: "text.primary",
            },
            "& .MuiTablePagination-actions": {
              color: "text.secondary",
            },
            "& .MuiIconButton-root": {
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
              },
            },
          }}
        />
      </Paper>
    </DndProvider>
  );
};

export default memo(CustomGrid);

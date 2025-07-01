import { TableBody as MuiTableBody, TableCell, TableRow, Checkbox } from '@mui/material';

type TableBodyProps = {
  paginatedRows: any[];
  checkboxSelection: boolean;
  isSelected: (id: string) => boolean;
  onRowClick?: (row: any) => void;
  handleChekboxClick: (id: string) => void;
  visibleColumnsWithResize: {
    width: number;
    onResize: (width: number) => void;
    field: string;
    headerName: string;
    sortable?: boolean;
    filterable?: boolean;
    renderCell?: (params: any) => React.ReactNode;
    type?: 'text' | 'number' | 'date' | 'boolean' | 'custom';
  }[];
  columnWidths: {
    [key: string]: number;
  };
};

const TableBody = ({
  paginatedRows,
  checkboxSelection,
  isSelected,
  onRowClick,
  handleChekboxClick,
  visibleColumnsWithResize,
  columnWidths,
}: TableBodyProps) => {
  return (
    <MuiTableBody>
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
              '&:hover': {
                bgcolor: 'action.hover',
                opacity: 0.7,
              },
              '&.Mui-selected': {
                bgcolor: 'action.selected',
              },
              '&.Mui-selected:hover': {
                bgcolor: 'action.selected',
              },
            }}
          >
            {checkboxSelection && (
              <TableCell
                padding="checkbox"
                sx={{
                  width: '48px',
                  minWidth: '48px',
                  maxWidth: '48px',
                  padding: '16px 8px',
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                }}
              >
                <Checkbox
                  checked={isItemSelected}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleChekboxClick(row.id);
                  }}
                  sx={{
                    color: 'text.secondary',
                    '&.Mui-checked': {
                      color: 'primary.main',
                    },
                  }}
                />
              </TableCell>
            )}
            {visibleColumnsWithResize.map((column) => (
              <TableCell
                key={column.field}
                sx={{
                  width: `${columnWidths[column.field] || 150}px`,
                  minWidth: `${columnWidths[column.field] || 150}px`,
                  maxWidth: `${columnWidths[column.field] || 150}px`,
                  padding: '16px',
                  whiteSpace: 'nowrap',
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '16px',
                }}
              >
                {column.renderCell ? column.renderCell({ row }) : row[column.field]}
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </MuiTableBody>
  );
};

export default TableBody;

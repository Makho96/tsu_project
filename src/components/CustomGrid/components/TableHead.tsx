import { TableHead as MuiTableHead, TableRow, TableCell, Checkbox, Box } from '@mui/material';
import React, { useState, useRef } from 'react';
import { theme } from '../../../theme';
import { ColumnDef } from '../Customgrid.types';
import TH from './TH';

interface DraggableHeaderProps {
  column: ColumnDef;
  index: number;
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
}

type TableHeadProps = {
  checkboxSelection: boolean;
  selected: string[];
  filteredAndSortedRows: any[];
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  visibleColumnsWithResize: ColumnDef[];
  moveColumn: (dragIndex: number, hoverIndex: number) => void;
  orderBy: string;
  order: 'asc' | 'desc';
  handleSort: (field: string) => void;
  filters: {
    [key: string]: string[];
  };
  handleFilterClick: (event: React.MouseEvent<HTMLElement>, field: string) => void;
  filterAnchorEl: {
    [key: string]: HTMLElement | null;
  };
  handleFilterClose: (field: string) => void;
  handleFilter: (field: string, value: string, index: number) => void;
  handleClearFilter: (field: string, index: number) => void;
  setFilters: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string[];
    }>
  >;
};

const DraggableHeader: React.FC<DraggableHeaderProps> = ({
  column,
  // index,
  // moveColumn,
  children,
}) => {
  const ref = useRef<HTMLTableCellElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  // const [{ isDragging }, drag] = useDrag({
  //   type: 'COLUMN',
  //   item: { index },
  //   collect: (monitor) => ({
  //     isDragging: monitor.isDragging(),
  //   }),
  // });

  // const [, drop] = useDrop({
  //   accept: 'COLUMN',
  //   hover: (item: { index: number }, monitor) => {
  //     if (!ref.current) {
  //       return;
  //     }
  //     const dragIndex = item.index;
  //     const hoverIndex = index;

  //     if (dragIndex === hoverIndex) {
  //       return;
  //     }

  //     const hoverBoundingRect = ref.current.getBoundingClientRect();
  //     const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
  //     const clientOffset = monitor.getClientOffset();
  //     const hoverClientX = clientOffset!.x - hoverBoundingRect.left;

  //     if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
  //       return;
  //     }

  //     if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
  //       return;
  //     }

  //     moveColumn(dragIndex, hoverIndex);
  //     item.index = hoverIndex;
  //   },
  // });

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
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  //commented
  // drag(drop(ref));

  return (
    <TableCell
      ref={ref}
      sx={{
        // opacity: isDragging ? 0.5 : 1,
        // cursor: 'move',
        width: `${column.width || 150}px`,
        minWidth: `${column.width || 150}px`,
        maxWidth: `${column.width || 150}px`,
        padding: '16px',
        whiteSpace: 'nowrap',
        position: 'sticky',
        top: 0,
        zIndex: 2,
        bgcolor: theme.palette.blue[900],
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '18px',
      }}
    >
      <Box display="flex" alignItems="center">
        {/* <IconButton size="small" sx={{ cursor: 'move', mr: 1 }}>
          <DragIndicatorIcon />
        </IconButton> */}
        {children}
      </Box>
      <Box
        component="div"
        onMouseDown={onMouseDown}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            const newWidth =
              e.key === 'ArrowLeft'
                ? Math.max(150, (column.width || 150) - 10)
                : (column.width || 150) + 10;
            if (column.onResize) {
              column.onResize(newWidth);
            }
          }
        }}
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '8px',
          cursor: 'col-resize',
          backgroundColor: isResizing ? 'primary.main' : 'transparent',
          border: 'none',
          padding: 0,
          zIndex: 3,
          '&:hover': {
            backgroundColor: 'primary.main',
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

const TableHead = ({
  checkboxSelection,
  selected,
  filteredAndSortedRows,
  handleSelectAllClick,
  visibleColumnsWithResize,
  moveColumn,
  orderBy,
  order,
  handleSort,
  filters,
  handleFilterClick,
  filterAnchorEl,
  handleFilterClose,
  handleFilter,
  handleClearFilter,
  setFilters,
}: TableHeadProps) => {
  return (
    <MuiTableHead>
      <TableRow>
        {checkboxSelection && (
          <TableCell
            padding="checkbox"
            sx={{
              width: '48px',
              minWidth: '48px',
              maxWidth: '48px',
              padding: '16px 8px',
              bgcolor: theme.palette.blue[900],
              color: 'text.primary',
              position: 'sticky',
              top: 0,
              zIndex: 2,
              fontSize: '18px',
            }}
          >
            <Checkbox
              indeterminate={selected.length > 0 && selected.length < filteredAndSortedRows.length}
              checked={
                filteredAndSortedRows.length > 0 && selected.length === filteredAndSortedRows.length
              }
              onChange={handleSelectAllClick}
              sx={{
                color: 'text.secondary',
                '&.Mui-checked': {
                  color: 'primary.main',
                },
              }}
            />
          </TableCell>
        )}
        {visibleColumnsWithResize.map((column, index) => (
          <DraggableHeader key={column.field} column={column} index={index} moveColumn={moveColumn}>
            <TH
              column={column}
              orderBy={orderBy}
              order={order}
              handleSort={handleSort}
              handleFilterClick={handleFilterClick}
              handleFilterClose={handleFilterClose}
              handleFilter={handleFilter}
              handleClearFilter={handleClearFilter}
              filters={filters}
              filterAnchorEl={filterAnchorEl}
              setFilters={setFilters}
            />
          </DraggableHeader>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};

export default TableHead;

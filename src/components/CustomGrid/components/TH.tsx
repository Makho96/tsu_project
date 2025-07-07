import ClearIcon from '@mui/icons-material/Clear';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Popover,
  TableSortLabel,
  TextField,
  Tooltip,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { theme } from '../../../theme';
import { ColumnDef } from '../Customgrid.types';

type THProps = {
  column: ColumnDef;
  orderBy: string;
  order: 'asc' | 'desc';
  filterAnchorEl: {
    [key: string]: HTMLElement | null;
  };
  handleSort: (field: string) => void;
  handleFilterClick: (event: React.MouseEvent<HTMLElement>, field: string) => void;
  handleFilterClose: (field: string) => void;
  handleFilter: (field: string, value: string, index: number) => void;
  handleClearFilter: (field: string, index: number) => void;
  filters: {
    [key: string]: string[];
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      [key: string]: string[];
    }>
  >;
};

const TH = ({
  column,
  orderBy,
  order,
  handleSort,
  handleFilterClick,
  handleFilterClose,
  handleFilter,
  handleClearFilter,
  filters,
  filterAnchorEl,
  setFilters,
}: THProps) => {
  const { t } = useTranslation();

  const handleAddFilter = useCallback(() => {
    setFilters((prev) => ({
      ...prev,
      [column.field]: [...prev[column.field], ''],
    }));
  }, [column.field, setFilters]);

  const handleDeleteFilter = useCallback(
    (index: number) => {
      setFilters((prev) => {
        const newFilters = [...prev[column.field]];
        newFilters.splice(index, 1);
        return {
          ...prev,
          [column.field]: newFilters,
        };
      });
    },
    [column.field, setFilters]
  );

  return (
    <>
      <Tooltip title={column.headerName} placement="top">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            minWidth: 0,
          }}
        >
          <Box
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
            }}
          >
            {column.sortable ? (
              <TableSortLabel
                active={orderBy === column.field}
                direction={orderBy === column.field ? order : 'asc'}
                onClick={() => handleSort(column.field)}
                sx={{
                  color: 'text.primary',
                  '&.MuiTableSortLabel-root': {
                    color: 'text.primary',
                  },
                  '&.MuiTableSortLabel-root:hover': {
                    color: 'primary.main',
                  },
                  '&.Mui-active': {
                    color: 'primary.main',
                  },
                  '& .MuiTableSortLabel-icon': {
                    color: 'primary.main !important',
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
            <Tooltip title={filters[column.field] ? t('grid.filterActive') : t('grid.showFilter')}>
              <IconButton
                size="small"
                onClick={(e) => handleFilterClick(e, column.field)}
                sx={{
                  color: filters[column.field] ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
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
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          PaperProps={{
            sx: {
              p: 2,
              mt: 1,
              bgcolor: 'background.paper',
              boxShadow: theme.shadows[3],
            },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {filters[column.field]?.map((filterValue, index) => {
              return (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    size="small"
                    value={filterValue || ''}
                    onChange={(e) => handleFilter(column.field, e.target.value, index)}
                    placeholder={`${t('grid.filter')} ${column.headerName}`}
                    fullWidth
                    InputProps={{
                      endAdornment: filters[column.field] && (
                        <InputAdornment position="end">
                          <IconButton
                            size="small"
                            onClick={() => handleClearFilter(column.field, index)}
                            edge="end"
                          >
                            <ClearIcon fontSize="small" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      minWidth: 200,
                      '& .MuiInputBase-root': {
                        color: 'text.primary',
                      },
                      '& .MuiInputLabel-root': {
                        color: 'text.secondary',
                      },
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'divider',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'primary.main',
                      },
                    }}
                  />
                  {index > 0 && (
                    <DeleteOutlineOutlinedIcon
                      sx={{ fontSize: 24, cursor: 'pointer', color: 'red.500' }}
                      onClick={() => handleDeleteFilter(index)}
                    />
                  )}
                </Box>
              );
            })}

            <Button
              disabled={!filters[column.field]?.[filters[column.field].length - 1]?.length}
              variant="contained"
              color="primary"
              onClick={handleAddFilter}
            >
              {t('grid.add_filter')}
            </Button>
          </Box>
        </Popover>
      )}
    </>
  );
};

export default TH;

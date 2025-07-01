import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Box,
  IconButton,
  InputAdornment,
  Popover,
  TableSortLabel,
  TextField,
  Tooltip,
} from '@mui/material';
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
  handleFilter: (field: string, value: string) => void;
  handleClearFilter: (field: string) => void;
  filters: {
    [key: string]: string;
  };
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
}: THProps) => {
  const { t } = useTranslation();
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
          <TextField
            size="small"
            value={filters[column.field] || ''}
            onChange={(e) => handleFilter(column.field, e.target.value)}
            placeholder={`${t('grid.filter')} ${column.headerName}`}
            fullWidth
            InputProps={{
              endAdornment: filters[column.field] && (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => handleClearFilter(column.field)}
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
        </Popover>
      )}
    </>
  );
};

export default TH;

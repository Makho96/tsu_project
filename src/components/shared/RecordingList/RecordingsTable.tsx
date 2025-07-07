import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useEvent from '../../../hooks/useEvent';
import { Recordings } from '../../../store/recordings/recordings.types';
import CustomGrid from '../../CustomGrid/CustomGrid';
import { ColumnDef } from '../../CustomGrid/Customgrid.types';
import Loader from '../Loader/Loader';
import { ConfirmModal } from '../Modals';
import RecordingsModal from '../RecordingsModal/RecordingsModal';

type RecordingsTableProps = {
  recordings: {
    id: number;
    data: Record<string, Recordings>;
  }[];
};

const RecordingsTable = ({ recordings }: RecordingsTableProps) => {
  const { t } = useTranslation();
  const [columns, setColumns] = useState<ColumnDef[]>([]);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCopyModalOpen, setIsCopyModalOpen] = useState(false);

  const editModalInputsData = useMemo(() => {
    if (!selectedItems.length) return [];

    const recording = recordings.find((recording) => recording.id === selectedItems[0].id);
    if (!recording) return [];
    return Object.values(recording.data).map((item) => ({
      inputKey: item.formKey,
      inputName: item.formName,
      inputType: item.inputType,
      inputValue: item.inputValue,
      id: recording.id,
    }));
  }, [selectedItems, recordings]);

  const handleCopy = useEvent(() => {
    console.log('copy');
  });

  const handleDelete = useEvent(() => {
    console.log('delete');
  });

  const handleSetColumns = useEvent(() => {
    const firstElement = recordings[0].data;

    const columns = Object.entries(firstElement).map(([key, value]) => {
      return {
        field: key,
        headerName: value.formName,
        filterable: true,
        sortable: true,
      };
    });
    setColumns(columns);
  });

  const tableData = useMemo(() => {
    if (!columns.length || !recordings.length) return [];
    return recordings.map((recording) => {
      const row = columns.reduce((acc, column) => {
        return {
          ...acc,
          [column.field]: recording.data[column.field]?.inputValue,
        };
      }, {});
      return {
        id: recording.id,
        ...row,
      };
    });
  }, [recordings, columns]);

  useEffect(() => {
    handleSetColumns();
  }, [handleSetColumns]);

  if (!columns.length || !tableData.length) return <Loader />;

  return (
    <>
      <CustomGrid
        columns={columns}
        rows={tableData}
        checkboxSelection
        pageSize={10}
        onSelectionChange={setSelectedItems}
        tableActions={
          <Box display="flex" gap={1} justifyContent="flex-start" alignItems="center">
            <Tooltip title={t('grid.copy')}>
              <IconButton
                onClick={() => setIsCopyModalOpen(true)}
                size="small"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
                disabled={!selectedItems.length}
              >
                <ContentCopyOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('grid.edit')}>
              <IconButton
                onClick={() => setIsEditModalOpen(true)}
                size="small"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
                disabled={!selectedItems.length}
              >
                <EditOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={t('grid.delete')}>
              <IconButton
                onClick={() => setIsDeleteModalOpen(true)}
                size="small"
                sx={{
                  color: 'text.secondary',
                  '&:hover': {
                    color: 'primary.main',
                  },
                }}
                disabled={!selectedItems.length}
              >
                <DeleteOutlineOutlinedIcon sx={{ color: 'red.500' }} />
              </IconButton>
            </Tooltip>
          </Box>
        }
      />
      {isDeleteModalOpen && (
        <ConfirmModal
          title={t('grid.deleteRecord')}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          modalBody={<Typography variant="body1">{t('grid.deleteRecordConfirmation')}</Typography>}
          confirmButtonText={t('grid.deleteRecord')}
          cancelButtonText={t('grid.cancel')}
        />
      )}
      {isCopyModalOpen && (
        <ConfirmModal
          title={t('grid.copyRecord')}
          onClose={() => setIsCopyModalOpen(false)}
          onConfirm={handleCopy}
          modalBody={<Typography variant="body1">{t('grid.copyRecordConfirmation')}</Typography>}
          confirmButtonText={t('grid.copyRecord')}
          cancelButtonText={t('grid.cancel')}
        />
      )}
      {isEditModalOpen && (
        <RecordingsModal setIsOpen={setIsEditModalOpen} formInputs={editModalInputsData} />
      )}
    </>
  );
};

export default RecordingsTable;

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import { Box, Tooltip, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslateDepartment } from '../../../hooks/useTranslateDepartment';
import { deleteDepartment } from '../../../store/departments';
import { Department } from '../../../store/departments/departments.types';
import { useAppDispatch } from '../../../store/hooks/useTypedSelector';
import DepartmentsModal from '../DepartmentsModal/DepartmentsModal';
import { ConfirmModal } from '../Modals';

type DepartmentCardProps = {
  department: Department;
};

const DepartmentCard = ({ department }: DepartmentCardProps) => {
  const { t } = useTranslation();
  const { departmentFields } = useTranslateDepartment(department);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const companyId = useMemo(() => Number(params.id), [params.id]);
  const actionId = useMemo(() => Number(params.actionId), [params.actionId]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEditAction = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteAction = () => {
    dispatch(deleteDepartment({ actionId, departmentId: department.id }));
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr 1fr 80px"
        padding={3}
        sx={{
          backgroundColor: 'white.100',
          borderRadius: 1,
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'blue.800',
          },
          transition: 'all 0.3s ease',
        }}
        onClick={() =>
          navigate(`/company/${companyId}/actions/${actionId}/department/${department.id}`)
        }
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
          overflow="hidden"
        >
          <ReceiptLongOutlinedIcon />
          <Tooltip title={departmentFields?.title}>
            <Typography
              variant="h6"
              sx={{
                width: 'calc(100% - 36px)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {departmentFields?.title}
            </Typography>
          </Tooltip>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
          overflow="hidden"
        >
          <PersonOutlineOutlinedIcon />
          <Tooltip title={departmentFields?.contactPerson}>
            <Typography
              variant="h6"
              sx={{
                width: 'calc(100% - 36px)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {departmentFields?.contactPerson}
            </Typography>
          </Tooltip>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
          overflow="hidden"
        >
          <LocalPhoneOutlinedIcon />
          <Tooltip title={departmentFields?.tell}>
            <Typography
              variant="h6"
              sx={{
                width: 'calc(100% - 36px)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {departmentFields?.tell}
            </Typography>
          </Tooltip>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
          overflow="hidden"
        >
          <EmailOutlinedIcon />
          <Tooltip title={departmentFields?.email}>
            <Typography
              variant="h6"
              sx={{
                width: 'calc(100% - 36px)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {departmentFields?.email}
            </Typography>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Tooltip title={t('pages.action.edit')}>
            <EditOutlinedIcon
              sx={{ fontSize: 20, cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                handleEditAction();
              }}
            />
          </Tooltip>
          <Tooltip title={t('pages.action.delete')}>
            <DeleteOutlineOutlinedIcon
              sx={{ fontSize: 20, cursor: 'pointer', color: 'red.500' }}
              onClick={(e) => {
                e.stopPropagation();
                setIsDeleteModalOpen(true);
              }}
            />
          </Tooltip>
        </Box>
      </Box>
      {isEditModalOpen && (
        <DepartmentsModal initialData={department} setIsOpen={setIsEditModalOpen} />
      )}
      {isDeleteModalOpen && (
        <ConfirmModal
          title={t('pages.action.delete')}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteAction}
          modalBody={
            <Typography variant="body1">{t('pages.action.deleteConfirmation')}</Typography>
          }
          confirmButtonText={t('pages.action.delete')}
          cancelButtonText={t('pages.action.cancel')}
        />
      )}
    </>
  );
};

export default DepartmentCard;

import { useEffect, useMemo, useState } from 'react';
import useEvent from '../../../hooks/useEvent';
import { Recordings } from '../../../store/recordings/recordings.types';
import CustomGrid from '../../CustomGrid/CustomGrid';
import { ColumnDef } from '../../CustomGrid/Customgrid.types';
import Loader from '../Loader/Loader';

type RecordingsTableProps = {
  recordings: {
    id: number;
    data: Record<string, Recordings>;
  }[];
};

const RecordingsTable = ({ recordings }: RecordingsTableProps) => {
  const [columns, setColumns] = useState<ColumnDef[]>([]);

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

  return <CustomGrid columns={columns} rows={tableData} checkboxSelection pageSize={10} />;
};

export default RecordingsTable;

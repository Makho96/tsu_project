type ColumnDef = {
  field: string;
  headerName: string;
  width?: number;
  sortable?: boolean;
  filterable?: boolean;
  renderCell?: (params: any) => React.ReactNode;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'custom';
  onResize?: (width: number) => void;
};

export type { ColumnDef };

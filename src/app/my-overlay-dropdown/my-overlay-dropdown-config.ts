export interface MyOverlayDropdownConfig {
  classVal?: string;
  optionLabel: string;
  optionValue: string;
  rowsPerPage: number;
  columns: MyOverlayDropdownColumnConfig[];
}

interface MyOverlayDropdownColumnConfig {
  label: string;
  type: 'text' | 'image' | 'number';
  field: string;
}

import { ChangeEvent } from 'react';
import { SingleValue } from 'react-select';

export interface SearchFiltersProps {
  title: string;
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  fileType: string;
  onChangeFileType: (newValue: SingleValue<any>) => void;
  sort: string;
  onChangeSort: (newValue: SingleValue<any>) => void;
  enableFilters?: boolean;
}

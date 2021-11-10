import { SortBy, SortOrder } from 'src/app/shared/models';

export interface SortOptionModel {
  value: string;
  label: string;
  description: string;
  sortBy: SortBy;
  sortDir: SortOrder;
}

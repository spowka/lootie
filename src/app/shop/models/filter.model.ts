import { SortBy, SortOrder } from 'src/app/shared/models';

export interface FilterModel {
  sortBy?: SortBy;
  sortDir?: SortOrder;
  search?: string;
  mKey?: string;
  pKey?: string;
  sKey?: string;
  priceFrom?: string;
  priceTo?: string;
  typeFilter?: string;
}

export interface SidebarFilterModel {
  value?: string;
  name?: string;
  type?: string;
  label?: string;
}

export interface SidebarFilterDataModel {
  title: string;
  value: string;
  type: string;
  data: SidebarFilterModel[];
}

export enum FilterTypes {
  categories = 'categories',
  sizes = 'sizes',
  genders = 'genders',
}

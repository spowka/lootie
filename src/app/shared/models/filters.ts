export type SortOrder = 'asc' | 'desc';
export type SortBy = 'name' | 'value' | 'price' | 'featured' | 'any_price' | 'most_popular' | 'best_float' | 'createdAt';

export class Filters {
  orderDir: SortOrder;
  orderBy: SortBy;
}

export class SidebarFilters {
  mKey?: string;
  pKey?: string;
  sKey?: string;
  priceFrom?: string;
  priceTo?: string;
}

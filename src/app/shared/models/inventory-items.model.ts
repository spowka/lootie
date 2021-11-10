import { SiteItemsModel } from './site-items.model';

export class InventoryItemsModel {
  _id: string;
  user: string;
  item: SiteItemsModel;
  createdAt: string;
  updatedAt: string;
  battle?: string;
}

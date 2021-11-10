import { SiteItemsModel } from 'src/app/shared/models';

export class CaseItemModel {
  _id?: string;
  index?: number;
  item: SiteItemsModel;
  odd: number;
}

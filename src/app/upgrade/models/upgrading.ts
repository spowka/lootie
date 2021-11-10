import { DiceModel } from 'src/app/cases/models/dice.model';
import { InventoryItemsModel, SiteItemsModel } from 'src/app/shared/models';

export class UpgradingModel {
    _id: string;
    winChance: string;
    multiplier: number;
    winChanceDirection: 'UP' | 'DOWN';
    userItems: InventoryItemsModel[];
    targetItems: SiteItemsModel[];
    dice: DiceModel;
    seed: string;
}

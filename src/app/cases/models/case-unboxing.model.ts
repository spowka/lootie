import { DiceModel } from './dice.model';

export class CaseUnboxingModel {
    _id: string;
    dices?: DiceModel[];
    dice: DiceModel;
    winItems?: string[];
    case?: string;
    slug?: string;
    user?: string;
    createdAt?: string;
    updatedAt?: string;
}

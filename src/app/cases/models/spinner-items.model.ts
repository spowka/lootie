import { CaseModel } from './case.model';

export class SpinnerItems {
    itemInfo: any[];
    caseInfo: CaseModel;
    orderArray: string[];
}

export type SpinnerItemType = 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Exotic' | 'Legendary';

export enum SpinnerItemTypes {
    common = 'Common',
    uncommon = 'Uncommon',
    rare = 'Rare',
    epic = 'Epic',
    exotic = 'Exotic',
    legendary = 'Legendary',
}

export enum SpinnerItemPossibility {
    // in percent
    Common = 30,
    Uncommon = 25,
    Rare = 20,
    Epic = 15,
    Exotic = 7,
    Legendary = 3,
}

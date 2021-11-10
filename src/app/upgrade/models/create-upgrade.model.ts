export class CreateUpgradeModel {
    userItems: string[];
    targetItems: string[];
    multiplier: number;
    winChanceDirection: 'UP' | 'DOWN';
    seed: string;
}

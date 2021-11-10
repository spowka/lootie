export const config: AffilateConfig = {
  refStages: [0, 50, 200, 1000, 5000],
  referralCutLevels: [0.05, 0.06, 0.07, 0.08, 0.1],
  rewardUnit: 3
};

interface AffilateConfig {
  refStages: Array<number>;
  referralCutLevels: Array<number>;
  rewardUnit: number;
}

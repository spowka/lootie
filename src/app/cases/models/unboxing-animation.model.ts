export interface UnboxingAnimation {
  name: string;
  order: number;
  duration: number;
}

export interface UnboxingAnimationMap {
  [key: string]: UnboxingAnimation;
}

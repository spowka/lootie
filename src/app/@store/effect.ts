import { RouterEffects } from './router/router.effect';
import { LayoutEffects } from './layout/layout.effect';
import { HistoryEffects } from './history/history.effect';
import { ProvablyFairEffects } from './provably-fair/provably-fair.effect';

export const effects: any[] = [
  RouterEffects,
  LayoutEffects,
  HistoryEffects,
  ProvablyFairEffects,
];

export * from './router/router.effect';
export * from './layout/layout.effect';
export * from './history/history.effect';
export * from './provably-fair/provably-fair.effect';

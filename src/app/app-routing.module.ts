import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AUTH_ROUTES } from 'src/app/auth/auth.routes';
import { AuthGuard } from './auth/guards/auth.guard';
import { environment } from '../environments/environment';

import {
  PageNotFoundComponent
} from './core/containers/index';

const devRoutes = environment.production ? [] : [
  {
    path: 'battle',
    loadChildren: () => import('./battle/battle.module').then(m => m.BattleModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopModule),
    canActivate: [AuthGuard]
  },
];

const routes: Routes = [
  // { path: '', redirectTo: 'mysterybox', pathMatch: 'full' },
  { path: '', loadChildren: () => import('./cases/cases.module').then(m => m.CasesModule) },
  { path: 'auth', children: AUTH_ROUTES },
  { path: 'mysterybox', loadChildren: () => import('./cases/cases.module').then(m => m.CasesModule) },
  {
    path: 'unboxings',
    loadChildren: () => import('./unboxings/unboxings.module').then(m => m.UnboxingsModule)
  },
  // { path: 'upgrade', loadChildren: './upgrade/upgrade.module#UpgradeModule' },
  {
    path: 'inventory',
    loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'product/:id',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  // {
  //   path: 'rewards',
  //   loadChildren: './rewards/rewards.module#RewardsModule',
  //   canActivate: [AuthGuard]
  // },
  { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
  {
    path: 'affiliates',
    loadChildren: () => import('./affiliates/affiliates.module').then(m => m.AffiliatesModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'withdraw',
    loadChildren: () => import('./withdraw/withdraw.module').then(m => m.WithdrawModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'provably-fair',
    loadChildren: () => import('./provably-fair/provably-fair.module').then(m => m.ProvablyFairModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'deposit',
    loadChildren: () => import('./deposit/deposit.module').then(m => m.DepositModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'p/:code',
    loadChildren: () => import('./promocode/promocode.module').then(m => m.PromocodeModule),
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then(m => m.HistoryModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'leader-board',
    loadChildren: () => import('./leader-board/leader-board.module').then(m => m.LeaderBoardModule),
    // canActivate: [AuthGuard]
  },
  // {
  //   path: 'redirect/discord',
  //   loadChildren: './rewards/rewards.module#RewardsModule',
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'partner',
    loadChildren: () => import('./partner/partner.module').then(m => m.PartnerModule)
  },
  {
    path: 'support',
    loadChildren: () => import('./support/support.module').then(m => m.SupportModule)
  },
  {
    path: 'tos',
    loadChildren: () => import('./terms-of-service/terms-of-service.module').then(m => m.TermsOfServiceModule)
  },
  {
    path: 'privacy',
    loadChildren: () => import('./privacy/privacy.module').then(m => m.PrivacyModule)
  },
  {
    path: 'shipping-refund',
    loadChildren: () => import('./shipping-refund/shipping-refund.module').then(m => m.ShippingRefundModule)
  },
  {
    path: 'calendar',
    loadChildren: () => import('./christmas-box/christmas-box.module').then(m => m.ChristmasBoxModule)
  },
  {
    path: 'eula',
    loadChildren: () => import('./eula-terms/eula-terms.module').then(m => m.EulaTermsModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then(m => m.VerifyEmailModule)
  },
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then(m => m.ContactUsModule)
  },
  {
    path: 'giveaway',
    loadChildren: () => import('./giveaway/giveaway.module').then(m => m.GiveawayModule)
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'how-it-works/upgrade',
    loadChildren: () => import('./how-it-works-upgrade/how-it-works-upgrade.module').then(m => m.HowItWorksUpgradeModule)
  },
  {
    path: 'how-it-works/deposit',
    loadChildren: () => import('./how-it-works-deposit/how-it-works-deposit.module').then(m => m.HowItWorksDepositModule)
  },
  {
    path: 'offline',
    loadChildren: () => import('./offline/offline.module').then(m => m.OfflineModule)
  },
  {
    path: 'unavailable',
    loadChildren: () => import('./not-available/not-available.module').then(m => m.NotAvailableModule)
  },
  ...devRoutes,
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

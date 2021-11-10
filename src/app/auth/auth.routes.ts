import { Routes } from '@angular/router';
import { SteamReturnComponent } from './components/steam-return/steam-return.component';
import { OpskinsReturnComponent } from './components/opskins-return/opskins-return.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'steam-return',
    component: SteamReturnComponent,
  },
  {
    path: 'opskins-return',
    component: OpskinsReturnComponent,
  }
];


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import { CountUpModule } from 'countup.js-angular2';
import { PipeModule } from 'src/app/pipes/pipe.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MdePopoverModule } from '@material-extended/mde';
import { DragScrollModule } from 'ngx-drag-scroll';
import { TranslateModule } from '@ngx-translate/core';

import {
  CaseBoxComponent,
  CaseItemComponent,
  ChatTogglerComponent,
  ClaimAndStatsComponent,
  DepositsComponent,
  ItemInfoComponent,
  FiltersComponent,
  NavbarComponent,
  UnboxingsComponent,
  UpgradesComponent,
  WithdrawalsComponent,
  CasesSliderComponent,
  DialogUserInfoComponent,
  DialogVerifyComponent,
  BriefInstructionComponent,
  ReviewInstructionComponent,
  LoadingBlockComponent,
  FilterButtonComponent,
  FilterInputComponent,
  FilterDropdownComponent,
  PaginatorComponent,
  FilterToggleComponent,
  FilterToggleContentComponent,
  ConfirmDialogComponent,
} from './components/index';

import { GooglePlacesDirective } from 'src/app/shared/directives';
import {
  MatIconModule,
  MatCardModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatExpansionModule,
  MatButtonModule,
  MatButtonToggleModule
} from '@angular/material';
import { PreloadImagesComponent } from './components/preload-images/preload-images.component';
import { DraggableDirective } from './directives/draggable/draggable.directive';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ClipboardModule,
    PipeModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    MdePopoverModule,
    DragScrollModule,
    CountUpModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatExpansionModule,
    MatButtonModule,
    MatButtonToggleModule,
    TranslateModule,
  ],
  declarations: [
    CaseBoxComponent,
    CaseItemComponent,
    ChatTogglerComponent,
    ClaimAndStatsComponent,
    DepositsComponent,
    ItemInfoComponent,
    FiltersComponent,
    NavbarComponent,
    UnboxingsComponent,
    UpgradesComponent,
    WithdrawalsComponent,
    CasesSliderComponent,
    DialogUserInfoComponent,
    DialogVerifyComponent,
    BriefInstructionComponent,
    ReviewInstructionComponent,
    GooglePlacesDirective,
    LoadingBlockComponent,
    FilterButtonComponent,
    FilterInputComponent,
    FilterDropdownComponent,
    PaginatorComponent,
    FilterToggleComponent,
    FilterToggleContentComponent,
    ConfirmDialogComponent,
    PreloadImagesComponent,
    DraggableDirective,
  ],
  exports: [
    CaseBoxComponent,
    CaseItemComponent,
    ChatTogglerComponent,
    ClaimAndStatsComponent,
    DepositsComponent,
    ItemInfoComponent,
    FiltersComponent,
    NavbarComponent,
    UnboxingsComponent,
    UpgradesComponent,
    WithdrawalsComponent,
    CasesSliderComponent,
    BriefInstructionComponent,
    ReviewInstructionComponent,
    CommonModule,
    FormsModule,
    PipeModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    TranslateModule,
    GooglePlacesDirective,
    LoadingBlockComponent,
    FilterButtonComponent,
    FilterInputComponent,
    FilterDropdownComponent,
    PaginatorComponent,
    FilterToggleComponent,
    FilterToggleContentComponent,
    ConfirmDialogComponent,
    PreloadImagesComponent,
    DraggableDirective
  ],
  entryComponents: [DialogUserInfoComponent, ConfirmDialogComponent, DialogVerifyComponent],
})
export class SharedModule { }

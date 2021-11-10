import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Store, select } from '@ngrx/store';
import * as fromRoot from 'src/app/@store';
import * as fromBattles from 'src/app/battle/@store';
import * as fromRouter from 'src/app/@store/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-battle-header',
  templateUrl: './battle-header.component.html',
  styleUrls: ['./battle-header.component.scss']
})
export class BattleHeaderComponent implements OnInit {
  @Input() battleId: string;

  @Output() provablyFair: EventEmitter<void> = new EventEmitter();

  public isMobile$: Observable<boolean>;

  public fromURL$: Observable<string>;

  constructor(private store: Store<fromRoot.State>, private toast: ToastrService, private router: Router) {
    this.isMobile$ = this.store.pipe(select(fromRoot.selectIsMobile));
    this.fromURL$ = this.store.pipe(select(fromBattles.selectUrlFrom));
  }

  ngOnInit() {
  }

  onCopySuccess() {
    this.toast.success('Battle path copied to clipboard');
  }

  onCopyFailure() {
    this.toast.error('Copy failed');
  }

  goToProvablyFair(): void {
    this.provablyFair.emit();
  }

  goBack() {
    this.fromURL$.pipe(take(1)).subscribe(url => {
      this.router.navigate([url]);
    });
  }

}

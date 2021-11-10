import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CasesService } from 'src/app/cases/services/cases.service';

import { CaseModel } from 'src/app/cases/models';

@Component({
  selector: 'app-battle-box',
  templateUrl: './battle-box.component.html',
  styleUrls: ['./battle-box.component.scss']
})
export class BattleBoxComponent implements OnInit {
  @Input() box: CaseModel;
  @Input() isSelected = false;
  @Input() priceOnTop = false;
  @Input() isMultiple = true;
  @Input() isRemove = false;

  @Output() changeCount: EventEmitter<any> = new EventEmitter();
  @Output() addToSelected: EventEmitter<any> = new EventEmitter();
  @Output() removeFromSelected: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<any> = new EventEmitter();

  public color: string;

  constructor(private fromService: CasesService) {
    this.color = this.fromService.generateColor();
  }

  ngOnInit() {
  }

  public onCustomChangeCount(): void {
    if (isNaN(+this.box.count) || +this.box.count <= 0) {
      this.box.count = 1;
    }

    this.changeCount.emit({ id: this.box._id, count: +this.box.count });
  }

  public onChangeCount(order: number): void {
    if (this.box.count + order <= 0) {
      return;
    }

    this.changeCount.emit({ id: this.box._id, count: this.box.count += order });
  }

  selectItem(): void {
    if (!this.isSelected) {
      this.addToSelected.emit(this.box);
      return;
    }

    this.removeFromSelected.emit(this.box);
  }

  onRemove(): void {
    this.remove.emit(this.box);
  }

}

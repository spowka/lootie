import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { CasesService } from 'src/app/cases/services/cases.service';
import { ToastrService } from 'ngx-toastr';
import { CaseType } from 'src/app/cases/models';

@Component({
  selector: 'app-case-box',
  templateUrl: './case-box.component.html',
  styleUrls: ['./case-box.component.scss']
})
export class CaseBoxComponent implements OnInit {
  @Input() isLoggedIn = false;

  public hoveredIndex: number;

  public color: string;

  public link: string;

  public CaseType = CaseType;

  public isLabelShown = true;

  public isEditShown = false;

  @Input() fullViewMode = false;
  @Input() item: any;
  @Input() label: string = 'CASE_BOX.UNBOXES';
  @Input() itemIndex: number;
  @Input() canEdit: boolean;
  @Input() caseType: string;

  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() copy: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() unbox: EventEmitter<any> = new EventEmitter();

  constructor(private fromService: CasesService, private toast: ToastrService) {
    this.color = this.fromService.generateColor();
    this.link = document.location.protocol + '//' + document.location.hostname + '/mysterybox/unbox/';
  }

  ngOnInit() {
  }

  toggleLabel(): void {
    if (this.canEdit && !this.isEditShown) {
      this.isLabelShown = false;
      this.isEditShown = true;
    }
  }

  toHexColor(color: string): string {
    return `#${color}`;
  }

  deleteCase(): void {
    this.delete.emit(this.item);
  }

  onCopySuccess() {
    this.toast.success('Box id copied to clipboard');
  }

  onCopyFailure() {
    this.toast.error('Copy failed');
  }

  copyCase(): void {
    this.copy.emit(this.item);
  }

  editCase(): void {
    this.edit.emit(this.item._id);
  }

  unboxCase(): void {
    this.unbox.emit(this.item);
  }
}

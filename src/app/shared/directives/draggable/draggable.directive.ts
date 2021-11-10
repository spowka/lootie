import {
  AfterContentInit,
  AfterViewInit,
  ContentChild,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2
} from '@angular/core';

const CSS_DRAGGING = 'lootie-dragging';

const isMobile = (evt: TouchEvent | MouseEvent): evt is TouchEvent => !!(evt as TouchEvent).touches;
const clientX = (evt: TouchEvent | MouseEvent) => isMobile(evt) ? evt.touches[0].clientX : evt.clientX;
const clientY = (evt: TouchEvent | MouseEvent) => isMobile(evt) ? evt.touches[0].clientY : evt.clientY;

export interface DragStartEvent {
  element: HTMLElement;
}

export interface DropEvent {
  element: HTMLElement;
  reset: () => void;
  x: number;
  y: number;
}

export interface DragEvent {
  x: number;
  y: number;
}

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements AfterContentInit, AfterViewInit, OnDestroy {
  @Input('draggableX') x = 0;
  @Input('draggableY') y = 0;

  // Better switch to directive, like in CDK
  @ContentChild('draggableHandler', {static: true}) handler: ElementRef<HTMLElement>;

  @Output() drag: EventEmitter<DragEvent> = new EventEmitter();
  @Output() drop = new EventEmitter<DropEvent>();
  @Output() dragStart = new EventEmitter<DragStartEvent>();

  /**
   * Reference to directive element
   */
  element: HTMLElement;

  scrollElement: HTMLElement;

  isMoving = false;

  beginX = 0;
  beginY = 0;

  mouseX = 0;
  mouseY = 0;

  listenMouseMoveFn: Function[] = [];
  listenMouseUpFn: Function[] = [];

  get scrollTop() {
    const doc = document.documentElement;
    return (window.pageYOffset || doc.scrollTop || (this.scrollElement && this.scrollElement.scrollTop)) - (doc.clientTop || 0);
  }

  /**
   * Default constructor
   */
  constructor(elementRef: ElementRef, private renderer: Renderer2) {
    this.element = elementRef.nativeElement;
  }

  ngAfterContentInit(): void {
    this.element.style.transform = this.transform;
    const handler = this.handler ? this.handler.nativeElement : this.element;

    this.renderer.listen(handler, 'mousedown', (event) => this.onMousedown(event));
    this.renderer.listen(handler, 'touchstart', (event) => this.onMousedown(event));
  }

  ngAfterViewInit() {
    this.scrollElement = this.element.parentElement;
    // TODO: check performance here
    while (this.scrollElement) {
      if (getComputedStyle(this.scrollElement).overflowY === 'auto') {
        break;
      }
      this.scrollElement = this.scrollElement.parentElement;
    }

    // TODO: Scroll element - when it is scrolled should recalculate position of dragged elem (rare case, nice to have)
  }

  ngOnDestroy(): void {
    this.listenMouseMoveFn.forEach(destroy => destroy());
    this.listenMouseUpFn.forEach(destroy => destroy());
  }

  private get transform(): string {
    return `translate(${this.x}px, ${this.y}px)`;
  }

  onMousedown(evt) {
    this.beginX = this.x;
    this.beginY = this.y - this.scrollTop;

    this.renderer.addClass(this.element, CSS_DRAGGING);

    // TODO: Check performance
    this.mouseX = clientX(evt);
    this.mouseY = clientY(evt);

    this.listenMouseMoveFn.push(this.renderer.listen('window', 'mousemove', e => this.onMouseMove(e)));
    this.listenMouseMoveFn.push(this.renderer.listen('window', 'touchmove', e => this.onMouseMove(e)));

    this.listenMouseUpFn.push(this.renderer.listen('window', 'mouseup', e => this.onMouseUp()));
    this.listenMouseUpFn.push(this.renderer.listen('window', 'touchend', e => this.onMouseUp()));

    this.dragStart.emit({element: this.element});

    evt.preventDefault();
  }

  onMouseMove(evt: TouchEvent) {
    const doc = document.documentElement;
    const left = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
    const top = (window.pageYOffset || doc.scrollTop || (this.scrollElement && this.scrollElement.scrollTop)) - (doc.clientTop || 0);

    this.x = this.beginX + clientX(evt) - this.mouseX + left;
    this.y = this.beginY + clientY(evt) - this.mouseY + top;

    // TODO: check performance - might be run outside angular zone
    requestAnimationFrame(() => this.element.style.transform = this.transform);
    this.drag.emit({x: this.x, y: this.y});
  }

  onMouseUp() {
    // removes listeners
    this.listenMouseMoveFn.forEach(destroy => destroy());
    this.listenMouseUpFn.forEach(destroy => destroy());

    this.listenMouseMoveFn = [];
    this.listenMouseUpFn = [];

    this.renderer.removeClass(this.element, CSS_DRAGGING);

    this.drop.emit({
      element: this.element,
      x: this.x,
      y: this.y,
      reset: () => {
        this.x = 0;
        this.y = 0;
      }
    });
  }

}

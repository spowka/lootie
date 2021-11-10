import {
  trigger,
  state,
  transition,
  animate,
  style,
  query,
  animateChild,
} from '@angular/animations';

export const battleAnimations = [
  trigger('spinner', [
    state('stop', style({ transform: '{{ stop }}' }), { params: { stop: 'translateY(-6390px)' }}),
    state('start', style({ transform: '{{ start }}' }), { params: { start: 'translateY(-115px)' }}),
    transition('stop => start', [
      animate('3200ms cubic-bezier(0,1.04,0,1)'),
    ]),
  ]),

  trigger('labelFade', [
    state('hide', style({ opacity: 0 })),
    state('show', style({ opacity: 1 })),
    transition('hide => show', [
      animate('600ms'),
    ]),
    transition('show => void', [
      animate('200ms', style({ opacity: 0 })),
    ]),
  ]),

  trigger('glowEffect', [
    state('hide', style({ opacity: 0 })),
    state('show', style({ opacity: .2 })),
    transition('hide => show', [
      animate('600ms'),
    ]),
    transition('show => void', [
      animate('200ms', style({ opacity: 0 })),
    ]),
  ]),

  trigger('imageScale', [
    state('*', style({ transform: 'scale(1.07)' })),
    transition('* => void', [animate('0s')]),
    transition('* => *', [
      style({ transform: 'scale(1)' }),
      animate('700ms 1500ms', style({ transform: 'scale(1.07)' }))
    ]),
  ])
];

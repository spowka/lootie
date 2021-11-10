import {
  trigger,
  state,
  transition,
  animate,
  style,
  query,
  animateChild,
} from '@angular/animations';

export const upgradeAnimations = [
  // -------------------- LEFT BORDER --------------------
  trigger('inventoryItemBorder', [
    // -------------------- START --------------------
    state('start', style({
      transform: '{{ translate }} rotate(0deg) scale(1.1)',
      borderRadius: '40%',
      borderWidth: '1px'
    }), { params: { translate: 'translate(260px, 296px)' } }),
    transition('stop => start', [
      animate('250ms cubic-bezier(.34,-0.27,1,1)',
        style({ transform: 'rotate(3deg) scale(1.1)' })
      ),
      animate('700ms cubic-bezier(1,-0.2,.60,.60)',
        style({ transform: '{{translate}} rotate(4deg) scale(1.15)', borderRadius: '40%', borderWidth: '1px' })
      ),
      animate('5s cubic-bezier(1.000, 0.000, 0.000, 1.000)',
        style({ transform: '{{translate}} rotate(3600deg) scale(1.1)', borderRadius: '40%', borderWidth: '1px' })
      ),
    ], { params: { translate: 'translate(260px, 296px)' } }),

    // -------------------- STOP --------------------
    state('reset', style({ transform: 'translate(0px, 0px)', borderRadius: '0px', borderWidth: '3px' })),
    transition('* => reset', [
      animate('500ms cubic-bezier(.34,-0.27,1,1)',
        style({ transform: '{{ translate }} rotate(0deg) scale(1.15)', borderRadius: '40%', borderWidth: '1px' })
      ),
      animate('300ms cubic-bezier(.34,-0.27,1,1)',
        style({ transform: 'translate(0px, 0px) rotate(1080deg)', borderRadius: '0px', borderWidth: '3px' })
      ),
      animate('3s',
        style({ transform: 'translate(0px, 0px) rotate(1080deg)', borderRadius: '0px', borderWidth: '3px' })
      ),
    ], { params: { translate: 'translate(260px, 296px)' } }),

    state('instant', style({})),
    transition('* => instant', [
      animate('3s'),
    ]),

    state('stop', style({
      transform: 'translate(0px, 0px)'
    })),
    transition('* => stop', [
      animate('1s')
    ]),
  ]),
  // ------------------------------------------------------

  // -------------------- RIGHT BORDER --------------------
  trigger('siteItemBorder', [
    // -------------------- START --------------------
    state('start', style({
      transform: '{{ translate }} rotate(-45deg) scale(1.1)',
      borderRadius: '40%',
      borderWidth: '1px'
    }), { params: { translate: 'translate(260px, 296px)' } }),
    transition('stop => start', [
      animate('250ms cubic-bezier(.34,-0.27,1,1)',
        style({ transform: 'rotate(-3deg) scale(1.1)' })
      ),
      animate('700ms cubic-bezier(1,-0.2,.60,.60)',
        style({ transform: '{{ translate }} rotate(-4deg) scale(1.15)', borderRadius: '40%', borderWidth: '1px' })
      ),
      animate('5s cubic-bezier(1.000, 0.000, 0.000, 1.000)',
        style({ transform: '{{ translate }} rotate(-3645deg) scale(1.1)', borderRadius: '40%', borderWidth: '1px' })
      ),
    ], { params: { translate: 'translate(260px, 296px)' } }),

    // -------------------- STOP --------------------
    state('reset', style({ transform: 'translate(0px, 0px)', borderRadius: '0px', borderWidth: '3px' })),
    transition('* => reset', [
      animate('500ms cubic-bezier(.34,-0.27,1,1)',
        style({ transform: '{{ translate }} rotate(-45deg) scale(1.15)', borderRadius: '40%', borderWidth: '1px' })
      ),
      animate('300ms cubic-bezier(.34,-0.27,1,1)',
        style({ transform: 'translate(0px, 0px) rotate(1080deg)', borderRadius: '0px', borderWidth: '3px' })
      ),
      animate('3s',
        style({ transform: 'translate(0px, 0px) rotate(1080deg)', borderRadius: '0px', borderWidth: '3px' })
      ),
    ], { params: { translate: 'translate(260px, 296px)' } }),
    state('stop', style({
      transform: 'translate(0px, 0px)'
    })),
    transition('* => stop', [
      animate('1s')
    ]),
  ]),
  // ------------------------------------------------------

  // ------------------- FADE OUT DOWN --------------------
  trigger('fadeOutDown', [
    // -------------------- START --------------------
    state('start', style({ transform: 'translateY(50px)', opacity: '0' })),
    transition('stop => start', [
      animate('300ms 300ms')
    ]),
  ]),

  // ------------------- ROUND BUTTON --------------------
  trigger('roundButton', [
    // -------------------- START --------------------
    state('start', style({
      width: '{{ size }}',
      height: '{{ size }}',
      borderRadius: '100%'
    }), { params: { size: '184px' } }),
    transition('stop => start', [
      animate('300ms 600ms',
        style({
          width: '{{ size }}',
          height: '{{ size }}',
          borderRadius: '100%'
        })
      ),
      query('@buttonContent', [
        animateChild()
      ])
    ], { params: { size: '184px' } }),
    transition('void => win', [
      style({ opacity: 0 }),
      animate(300, style({
        opacity: 1,
      }))
    ]),
    transition('void => lose', [
      style({ opacity: 0 }),
      animate(300, style({
        opacity: 1,
      }))
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate(300, style({
        opacity: 0,
      }))
    ]),
  ]),

  trigger('buttonContent', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate(300, style({
        opacity: 1,
      }))
    ])
  ]),

  // ------------------- LEFT LABEL MOVE -------------------
  trigger('moveLeftLabel', [
    // ------------------- START --------------------
    state('start', style({ transform: 'translateX(130px)' })),
    transition('stop => start', [
      animate('500ms 500ms ease-in-out'),
    ]),
    // ------------------- STOP --------------------
    state('stop', style({ transform: 'translateX(0)' })),
    transition('start => stop', [
      animate('500ms ease-in-out'),
    ]),
  ]),

  // ------------------- RIGHT LABEL MOVE --------------------
  trigger('moveRightLabel', [
    // ------------------- START --------------------
    state('start', style({ transform: 'translateX(-130px)' })),
    transition('stop => start', [
      animate('500ms 500ms ease-in-out'),
    ]),
    // ------------------- STOP --------------------
    state('stop', style({ transform: 'translateX(0)' })),
    transition('start => stop', [
      animate('500ms ease-in-out'),
    ]),
  ])
];

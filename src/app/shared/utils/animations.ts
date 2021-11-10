import { style, animate, trigger, state, transition } from '@angular/animations';

export const modalAnimation = [
    trigger('modalAnimation', [
        state('leftClosed', style({
            backgroundColor: '#22252C',
            position: 'fixed',
            width: '100%',
            top: 0,
            bottom: 0,
            left: '-100%',
            padding: 0,
            zIndex: 1000,
        })),
        state('rightClosed', style({
            backgroundColor: '#22252C',
            position: 'fixed',
            width: '100%',
            top: 0,
            bottom: 0,
            left: '100%',
            padding: 0,
            zIndex: 1000,
        })),
        state('opened', style({
            backgroundColor: '#22252C',
            position: 'fixed',
            width: '100%',
            top: 0,
            bottom: 0,
            padding: 0,
            zIndex: 1000,
            left: 0,
        })),
        transition('* => opened', animate('.3s ease-in-out')),
        transition('opened => *', animate('.3s ease-in-out'))
    ])
];

export const rightModalAnimation = [
    trigger('rightModalAnimation', [
        state('*', style({
            backgroundColor: '#22252C',
            position: 'fixed',
            top: 0,
            bottom: 0,
            right: '100%',
            left: 0,
            padding: 0,
            zIndex: 1000,
        })),
        state('opened', style({
            position: 'fixed',
            backgroundColor: '#22252C',
            top: 0,
            bottom: 0,
            right: 0,
            padding: 0,
            zIndex: 1000,
            left: 0,
        })),
        transition('* => opened', animate('.3s ease-in-out')),
        transition('opened => *', animate('.3s ease-in-out'))
    ])
];

export const mobileMenuAnimation = [
    trigger('mobileMenuAnimation', [
        state('*', style({ right: 'calc(-100% + 110px)' })),
        state('opened', style({ right: '0px' })),
        transition('* => opened', animate('.3s ease-in-out')),
        transition('opened => *', animate('.3s ease-in-out'))
    ])
];

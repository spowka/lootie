import { MetaReducer, ActionReducer } from '@ngrx/store';
import { storeLogger, LoggerOptions } from 'ngrx-store-logger';
import { environment } from '../../environments/environment';
import { State } from './reducer';

export function logger(reducer: ActionReducer<State>): any {
    const options: LoggerOptions = {
        filter: {
            blacklist: [
                '@ngrx/store/update-reducers',
                '@ngrx/effects/init',
                '[History] Add Latest Drop',
                '[Upgrade] Add Latest Upgrade',
                '[Chat] Update Online Users',
            ]
        }
    };
    return storeLogger(options)(reducer);
}

export const metaReducers: MetaReducer<any>[] = environment.production ? [] : [logger];

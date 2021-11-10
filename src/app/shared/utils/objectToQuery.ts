import { keys } from 'lodash';

export function filtersObjectToQuery(obj: object) {
    if (keys(obj).length === 0) {
        return '';
    }

    const query: string[] = [];

    keys(obj).forEach(key => {
        if (obj[key]) {
            query.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
        }
    });

    return query.join('&');
}

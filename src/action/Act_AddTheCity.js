import { ADD_CITY } from '../reducer/types';

export const addthecity = city => (
    {
        type: ADD_CITY,
        data: city
    }
)
import { ADD_CITY_DATA } from '../reducer/types';

export const addcitydata = data => (
    {
        type: ADD_CITY_DATA,
        data: data
    }
)
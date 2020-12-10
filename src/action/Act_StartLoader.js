import { START_LOADER } from '../reducer/types';

export const startloader = data => (
    {
        type: START_LOADER,
        data: data
    }
)
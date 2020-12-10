import { STOP_LOADER } from '../reducer/types';

export const stoploader = data => (
    {
        type: STOP_LOADER,
        data: data
    }
)
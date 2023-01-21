import { writable } from 'svelte/store';
import type { RecordsResponse } from './types';
type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

type Records = Overwrite<RecordsResponse, { date: Date }>;

export const recordsStore = writable<Records[]>([]);

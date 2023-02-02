import { writable } from 'svelte/store';
import type { RecordsLanguageOptions, RecordsResponse } from './types';
type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

export type Records = Overwrite<RecordsResponse, { date: Date; tags: string[] }>;

export const recordsStore = writable<Records[]>([]);

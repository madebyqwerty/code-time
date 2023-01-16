import { writable } from 'svelte/store';
import type { RecordsLanguageOptions } from './types';

export const languageStore = writable<RecordsLanguageOptions[]>([]);

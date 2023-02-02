import { writable } from 'svelte/store';

export const openEditTag = writable(false);
export const openCreateTag = writable(false);
export const selectedTags = writable([]);
export const editedTag = writable({
    name: '',
    color: '00ff00',
    id: ''
});
export const openRecord= writable(false);
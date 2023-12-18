import { writable } from 'svelte/store';

export const directoryFilter = writable<string>('A');
export const usernameFilter = writable<string>('');
export const firstNameFitler = writable<string>('');
export const lastNameFitler = writable<string>('');
export const professionFilter = writable<string>('');

import { atom } from 'jotai/vanilla';

const closeActiveMenu = atom<(() => void) | null>(null);

export { closeActiveMenu };

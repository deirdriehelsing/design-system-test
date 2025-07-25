import type { Config } from '../types';

import { atom } from 'jotai';

const configAtom = atom<Config>({});
const readonlyConfigAtom = atom((get) => get(configAtom));

export { configAtom, readonlyConfigAtom };

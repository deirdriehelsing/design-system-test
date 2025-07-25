import { atom } from 'jotai';

const activeStepAtom = atom<number>(0);
const labelsAtom = atom<Record<number, string>>({});
const stepsCountAtom = atom<number>(0);

export { activeStepAtom, labelsAtom, stepsCountAtom };

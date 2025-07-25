import type { ElementClosedEvent, ElementOpenedEvent } from '.';
import type { DialogProps } from '@blueshift-ui/feedback';

type TrackedDialogOptions = {
  id: string;
  trackedProperties?: {
    close?: Partial<Omit<ElementClosedEvent, 'element_type'>>;
    open?: Partial<Omit<ElementOpenedEvent, 'element_type'>>;
  };
};

type TrackedDialogProps = DialogProps & TrackedDialogOptions;

export type { TrackedDialogOptions, TrackedDialogProps };

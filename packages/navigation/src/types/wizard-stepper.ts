import type { ComponentType } from 'react';
import type { IconWeight } from '@phosphor-icons/react';

interface WizardStepperThemeProps {
  backgroundStop1?: string;
  backgroundStop2?: string;
  barColor?: string;
  color?: string;
  completedBarColor?: string;
  currentIconBackground1?: string;
  currentIconBackground2?: string;
  currentIconBackground3?: string;
  currentIconColor?: string;
  iconBackground?: string;
  iconColor?: string;
}

type WizardStepperStepIcon = ComponentType<{ className?: string; weight?: IconWeight }>;

interface WizardStepperStep {
  icon: WizardStepperStepIcon;
  text: string;
}

interface WizardStepperProps {
  /**
   * Styles the user as anchored to the bottom of the window or container, which also affects its
   * placement in `fixed` mode and `autoHide` behavior.
   */
  anchor?: 'top' | 'bottom';
  /**
   * Hides the stepper on mobile devices when the user scrolls down and shows it when the user scrolls up.
   */
  autoHide?: 'mobile';
  currentStepIndex?: number;
  /**
   * Fixes the stepper to the top or bottom of the window. Used with the `anchor` property.
   */
  fixed?: boolean;
  /**
   * Uses simplified styles with number-only icons on mobile.
   */
  mobileSimplified?: boolean;
  steps: WizardStepperStep[];
  theme?: WizardStepperThemeProps;
}

interface WizardStepperStepProps extends WizardStepperStep {
  currentStepIndex?: number;
  index: number;
  isLastStep: boolean;
  mobileSimplified?: boolean;
  stepperId: string;
}

export type {
  WizardStepperProps,
  WizardStepperStep,
  WizardStepperStepIcon,
  WizardStepperStepProps,
  WizardStepperThemeProps,
};

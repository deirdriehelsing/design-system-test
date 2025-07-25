import type { ReactElement, ReactNode } from 'react';

import Step from '../../components/step';
import { isValidElement } from 'react';

function validateStepComponent(child: ReactNode): child is ReactElement<typeof Step> {
  return isValidElement(child) && child.type === Step;
}

export default validateStepComponent;

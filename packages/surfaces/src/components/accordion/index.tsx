import type { AccordionDetailsProps as MuiAccordionDetailsProps } from '@mui/material/AccordionDetails';
import type { AccordionProps as MuiAccordionProps } from '@mui/material/Accordion';
import type { AccordionSummaryProps as MuiAccordionSummaryProps } from '@mui/material/AccordionSummary';

import { CaretDown as CaretDownIcon } from '@phosphor-icons/react';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import React from 'react';
import Typography from '@blueshift-ui/theme/dist/components/typography';

interface AccordionProps extends Omit<MuiAccordionProps, 'title'> {
  accordionDetailsProps?: MuiAccordionDetailsProps;
  accordionSummaryProps?: MuiAccordionSummaryProps;
  title: boolean | React.ReactNode;
}

function Accordion({
  accordionDetailsProps,
  accordionSummaryProps,
  children,
  title,
  ...accordionProps
}: AccordionProps) {
  return (
    <MuiAccordion {...accordionProps}>
      <MuiAccordionSummary
        aria-controls="accordion-summary"
        expandIcon={<CaretDownIcon size="1rem" weight="bold" />}
        {...accordionSummaryProps}
      >
        {['boolean', 'number', 'string'].includes(typeof title) ? (
          <Typography>{`${title}`}</Typography>
        ) : (
          title
        )}
      </MuiAccordionSummary>
      <MuiAccordionDetails {...accordionDetailsProps}>{children}</MuiAccordionDetails>
    </MuiAccordion>
  );
}

export default Accordion;

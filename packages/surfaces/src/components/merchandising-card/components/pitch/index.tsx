import type { ReactNode } from 'react';
import type { RichContent } from '@blueshift-ui/nsp';

import NspRichContent from '@blueshift-ui/nsp/dist/components/nsp-rich-content';
import { Typography } from '@mui/material';
import { isValidElement } from 'react';
import { pitchVariants } from '../../index.css';

interface PitchProps {
  content: RichContent | ReactNode;
  variant?: 'amethyst' | 'coral' | 'gold';
}

function Pitch({ content, variant }: PitchProps) {
  if (!content) {
    return null;
  }

  // If it's an object and a valid React element, it can't be of type RichContent
  if (typeof content === 'object' && isValidElement(content)) {
    return content;
  }

  return (
    <Typography className={pitchVariants[variant ?? 'default']} component="div" variant="caption">
      {typeof content === 'object' ? <NspRichContent data={content as RichContent} /> : content}
    </Typography>
  );
}

export default Pitch;

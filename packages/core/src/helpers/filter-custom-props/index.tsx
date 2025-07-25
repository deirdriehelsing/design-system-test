import type { Ref } from 'react';

import { forwardRef } from 'react';

const filterCustomProps = (toFilter: string[], component: React.ElementType) =>
  forwardRef((props: any, ref: Ref<HTMLDivElement>) => {
    const { innerComponent, ...rest } = props;
    const Component = component;

    toFilter.forEach((prop) => {
      delete rest[prop];
    });

    return <Component {...rest} ref={ref} />;
  });

export default filterCustomProps;

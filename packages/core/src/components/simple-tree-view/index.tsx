import type { SimpleTreeViewProps } from '@mui/x-tree-view/SimpleTreeView';

import { SimpleTreeView as MuiSimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';

const DEFAULT_INDENTATION = 24;
const INDENTATION_WITH_CHECKBOXES = 32;

function SimpleTreeView(props: SimpleTreeViewProps<boolean | undefined>) {
  return (
    <MuiSimpleTreeView
      itemChildrenIndentation={
        props.checkboxSelection ? INDENTATION_WITH_CHECKBOXES : DEFAULT_INDENTATION
      }
      {...props}
    />
  );
}

export default SimpleTreeView;

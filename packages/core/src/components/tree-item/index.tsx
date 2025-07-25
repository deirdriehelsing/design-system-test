import type { TreeItemProps } from '@mui/x-tree-view/TreeItem';

import { TreeItem as MuiTreeItem } from '@mui/x-tree-view/TreeItem';

function TreeItem(props: TreeItemProps) {
  return <MuiTreeItem {...props} />;
}

export default TreeItem;

import type { NestedNav } from '../../../../types/nav-item';

import { CaretDown as CaretDownIcon, CaretRight as CaretRightIcon } from '@phosphor-icons/react';
import Collapse from '../../../collapse';
import MuiListItemButton from '@mui/material/ListItemButton';
import MuiListItemText from '@mui/material/ListItemText';
import NavList from '../nav-list';
import { useState } from 'react';

interface NestedListItemProps {
  item: NestedNav;
}

function NestedListItem({ item: { active = false, items, text } }: NestedListItemProps) {
  const [open, setOpen] = useState(active);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <MuiListItemButton
        aria-expanded={open}
        aria-haspopup={true}
        disableRipple={true}
        onClick={handleClick}
        selected={active}
      >
        <MuiListItemText>{text}</MuiListItemText>
        {open ? <CaretDownIcon weight="bold" /> : <CaretRightIcon weight="bold" />}
      </MuiListItemButton>

      <Collapse in={open} timeout="auto" unmountOnExit={true}>
        <NavList items={items} />
      </Collapse>
    </>
  );
}

export default NestedListItem;

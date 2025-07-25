import { EventScopeContext } from '../../state';
import { useContext } from 'react';

function useEventScope() {
  return useContext(EventScopeContext);
}

export default useEventScope;

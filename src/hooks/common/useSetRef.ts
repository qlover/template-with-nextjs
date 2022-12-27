import { isFunction } from 'lodash';
import { MutableRefObject, useCallback, useRef } from 'react';

function getDRef(initRef?: any | (() => any)) {
  if (!initRef) {
    return undefined;
  }
  if (isFunction(initRef)) {
    return initRef();
  }
  return initRef;
}

/**
 * ref 设置与获取
 *
 * @returns
 */
export default function useSetRef<R>(
  initRef?: R | (() => R)
): [MutableRefObject<R | undefined>, (dom: R) => void] {
  const domRef = useRef<R>(getDRef(initRef));

  const setDomRef = useCallback((dom: R) => {
    domRef.current = dom;
  }, []);

  return [domRef, setDomRef];
}

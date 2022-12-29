/* eslint-disable react-hooks/exhaustive-deps */
import useCacheState from '@/hooks/common/useCacheState';
import { isSameNull } from 'maroonlis-utils';
import { useCallback, useEffect, useRef } from 'react';

export type DropdwonConfig = {
  /**
   * 是否显示
   */
  open?: boolean;

  /**
   * 状态更新, 可返回 true|false
   */
  onChangeOpen?: (open: boolean) => void | boolean;

  triggerMode?: 'hover' | 'click';
};
export default function useDropdown({
  triggerMode,
  open,
  onChangeOpen,
}: DropdwonConfig = {}) {
  const [innerState, setInnerState, staged] = useCacheState({
    open: isSameNull(open) ? false : open,
  });

  const setOpen = useCallback((vis: boolean) => {
    staged().open !== vis && setInnerState({ open: vis });
  }, []);
  const triggerRef = useRef<HTMLElement | null>(null);

  const setTrigger = useCallback((ele: HTMLElement | null) => {
    triggerRef.current = ele;
  }, []);

  const _onLeave = useCallback((e: MouseEvent) => {
    triggerOpen(false);
  }, []);

  const _onHover = useCallback((e: MouseEvent) => {
    triggerOpen(true);
  }, []);

  const _onClick = useCallback((e: MouseEvent) => {
    triggerOpen(!staged().open);
    e.stopPropagation();
  }, []);

  const domClick = useCallback((e: MouseEvent) => {
    triggerOpen(false);
  }, []);

  useEffect(() => {
    setInnerState({ open: !!open });
    // triggerOpen(!!open);
  }, [open]);

  useEffect(() => {
    const trigger = triggerRef.current;
    document.removeEventListener('click', domClick);

    if (trigger) {
      trigger.removeEventListener('mousemove', _onHover);
      trigger.removeEventListener('mouseleave', _onLeave);
      trigger.removeEventListener('click', _onClick);
      if (triggerMode === 'hover') {
        trigger.addEventListener('mousemove', _onHover);
        trigger.addEventListener('mouseleave', _onLeave);
      } else {
        trigger.addEventListener('click', _onClick);
        document.addEventListener('click', domClick);
      }
    }

    return () => {
      if (trigger) {
        trigger.removeEventListener('mousemove', _onHover);
        trigger.removeEventListener('mouseleave', _onLeave);
        trigger.removeEventListener('click', _onClick);
        document.removeEventListener('click', domClick);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerMode]);

  const triggerOpen = (visible: boolean) => {
    if (onChangeOpen) {
      // 返回值更新
      setOpen(!!onChangeOpen(visible));
      return;
    }
    setOpen(visible);
  };

  return {
    open: innerState.open,
    setTrigger,
    triggerOpen,
  };
}

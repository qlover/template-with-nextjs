import { useCallback, useRef, useState } from 'react';
// import useMergedState from 'rc-util/lib/hooks/useMergedState';

type Action<S> = (prevState: S) => S;
type StateCommit<S> = (
  state?: Action<S> | Partial<S>,
  staged?: boolean
) => S | void;

function isObject(obj: any): obj is Object {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
function update(_new: any, old: any) {
  if (isObject(_new) && isObject(old)) {
    return { ...old, ..._new };
  }
  if (Array.isArray(_new) && Array.isArray(old)) {
    return [...old, ..._new];
  }
  return _new;
}

/**
 * 用来解决同时更新多个状态,支持
 *
 * 提供第三个返回值获取 非JS 空间获取不到最新状态值 api
 * ```
 * const [pageState, commit, prevState] = useCacheState<TapTapPageState>(() => ({
 *   panel1: {
 *     download: 66666,
 *     follow: 8888,
 *     comment: 66666,
 *   },
 *   panel2: {
 *     positive: 10,
 *     negative: 44,
 *   }
 * }))
 *
 * // 用法一
 * prevState().pandel2.positive = 20
 * commit() // update
 *
 * // 用法2
 * commit((s) => ({...s, panel2:{...s.pandel2, positive:20}})) // update
 *
 * // 用法3
 * commit({ panel1: { ...prevState(), negative:20 } }, true)
 * commit({ panel1: {download: 66666, follow: 8888, comment: 66666} }, true)
 * commit()  // update
 * ```
 *
 *
 * @param initialState
 * @returns [原始状态值, 状态更新方法, 暂存状态值]
 */
export default function useCacheState<S>(
  initialState: S | (() => S)
): [Readonly<S>, StateCommit<S>, () => S] {
  const [innerState, set_InnerState] = useState<S>(initialState);

  // 未来版本需要，保证不能与 innerState 相等
  const stagedStateRef = useRef<S>(innerState);

  const commit = useCallback<StateCommit<S>>((state, staged) => {
    // 触发更新
    // commit() 更新
    if (state === void 0) {
      !staged &&
        set_InnerState(update(stagedStateRef.current, stagedStateRef.current));
      return;
    }

    if (typeof state === 'function') {
      const newState = (state as StateCommit<S>)(stagedStateRef.current);
      stagedStateRef.current = update(newState, stagedStateRef.current);
    } else {
      stagedStateRef.current = update(state, stagedStateRef.current);
    }

    !staged && set_InnerState(stagedStateRef.current);
  }, []);

  const getStaged = () => stagedStateRef.current;

  return [innerState, commit, getStaged];
}

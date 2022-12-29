import CenteredWithBottomBorder from '@/components/example/TailWindHead';
import useCacheState from '@/hooks/common/useCacheState';
import useSetRef from '@/hooks/common/useSetRef';
import classNames from 'classnames';
import css from './index.module.less';

export type PageHeaderProps = {
  wrapperClassName?: string;
};

/**
 * @param param0
 * @returns
 */
function PageHeader({ wrapperClassName }: PageHeaderProps) {
  const [headerRef, setRef] = useSetRef<HTMLHeadElement>();
  const [innerState, setInnerState] = useCacheState({
    openDrawer: false,
    drawerType: 'nav' as 'nav' | 'lang',
    currentNavKey: '',
    scrolled: false,
  });

  return (
    <header
      ref={setRef}
      className={classNames(css['page-haeder'], wrapperClassName, {
        [css['scrolled']]: innerState.scrolled,
      })}
    >
      <CenteredWithBottomBorder />
    </header>
  );
}

export default PageHeader;

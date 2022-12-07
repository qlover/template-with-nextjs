/**
 * 自定义组件类型通用属性
 */
declare namespace BaseComponent {
  type TailWindClass = string;

  type HTMLString = string;

  /**
   * 通用的 ui组件类包含属性
   */
  type UI<Props = {}> = {
    /**
     * TODO: 直接定义成 classNames 样式
     */
    className?: string | TailWindClass;
    style?: React.CSSProperties;
  } & Props;

  /**
   * 通用的 ui 组件类包含子节点
   */
  type UIChildren<Props = {}> = UI<Props> & {
    children?: C;
  };

  /**
   * 渲染一组类型的组件
   */
  type ListComponet<T> = UI<
    WithOptions<T> & {
      renderCell?: MapRenderComponent<T>;
    }
  >;

  type WithChildren<Props, C = React.ReactNode> = Omit<Props, 'children'> & {
    children?: C;
  };

  type AS = {
    as?: React.ElementType<any>;
  };

  type FuncRenderNode<P> = (prop?: P) => React.ReactElement;

  /**
   * 渲染通用 ReactElement 类型
   */
  type WithFuncNode<P = any> = React.ReactElement | FuncRenderNode<P>;

  type OverlayUI = {
    getContainer?:
      | ((ele: HTMLElement) => HTMLElement | null)
      | HTMLElement
      | null;
  };

  /**
   * 包含通用 `options` 选项值的属性
   */
  type WithOptions<OptionType> = {
    options?: Array<OptionType>;
  };

  /**
   * 通用受控组件属性，
   *
   * 包含 value,onChange
   */
  type ControlledProps<V> = {
    value?: V;
    onChange?: (value: V) => void;
  };

  type MapRenderProps<T> = {
    item: T;
    index: number;
    key: string;
    defaultNode?: React.ReactNode;
  };

  type MapRenderComponent<T> = (props: MapRenderProps<T>) => React.ReactNode;

  /**
   * 本地数据因为从 i18n.json 过来，next 会将数据从 __namespace 带过来
   */
  type LocalesNamespace = {
    __namespaces?: any;
  };
}

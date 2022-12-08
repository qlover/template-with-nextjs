import { ConfigProvider } from 'antd';
import { ConfigProviderProps } from 'antd/es/config-provider';
import { FC } from 'react';

type AntdContinerProps = ConfigProviderProps & {};
const AntdContiner: FC<AntdContinerProps> = (props) => {
  return <ConfigProvider {...props}></ConfigProvider>;
};

export default AntdContiner;

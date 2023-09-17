import { StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';

export default function ConfigProviderAntd({ children = null }) {
  return <ConfigProvider theme={{
    token: {
      // tabs tab padding
      paddingSM: 6,
      // tabs nav margin
      margin: 8,
      colorPrimary: '#4f46e5',
      colorPrimaryHover: '#6366f1',
    }
  }} >
    <StyleProvider
      hashPriority="high"
    >
      {children}
    </StyleProvider>
  </ConfigProvider>
}

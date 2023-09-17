
import '../../styles/preflight.css';
import '../../styles/tailwind.css';
import '../../styles/utils.css'
import '../../styles/popup.css'
import '../../styles/nav.css'
import '../../styles/form.css'
import '../../styles/popconfirm.css'

import PopupRoutes from './popup/Routes'
import { ConfigProvider } from 'antd'
import { useInitStorage } from '../../utils/pstore';

export default function PopupMain() {
  useInitStorage();

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
    <PopupRoutes />
  </ConfigProvider>
}

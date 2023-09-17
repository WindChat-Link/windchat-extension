import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "@/pages/popup/popup/PopupLayout";
import Home from '@/pages/popup/popup/Home'
import Settings from './Settings';
import ActivatePage from './ActivatePage';
import InstanceList from './settings/InstanceList';
import { useEffect } from 'react';
import { storageGet } from '../../../utils/chrome';
import Pricing from './Pricing';
import { useInstanceList, useLicenseInfo, PStoreKeys } from '../../../utils/pstore';

const App = () => {
  const [instanceList, setInstanceList] = useInstanceList();
  const [licenseInfo, setLicenseInfo] = useLicenseInfo();

  async function init() {
    const instanceListData = await storageGet(PStoreKeys.instanceList)
    setInstanceList(instanceListData || []);

    const licenseInfoData = await storageGet(PStoreKeys.licenseInfo)
    setLicenseInfo(licenseInfoData || null)
  }

  useEffect(() => {
    init()
  }, []);

  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home></Home>} />
            <Route path="/settings" element={<Settings></Settings>} />
            <Route path="/pricing" element={<Pricing></Pricing>} />
            <Route path="/activate" element={<ActivatePage></ActivatePage>} />
            <Route path="/instances" element={<InstanceList></InstanceList>} />
          </Routes>
        </Layout>
      </Router>
    </>
  );
};

export default App;

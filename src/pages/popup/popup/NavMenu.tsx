import { Layout, Menu, Switch } from "antd";
import { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom";

const AppActiveKey = 'app_active';
const { Content, Sider, Footer } = Layout;

export function key1() {
  return ``
};

interface LayoutProps {
  className?: string;
  children?: React.ReactNode;
}

function Nav(props: LayoutProps) {
  const [active, setActive] = useState<any>(true);

  async function init() {
    const saved = await chrome.storage.local.get(AppActiveKey)
    const savedActive = saved?.[AppActiveKey];
    setActive(savedActive);
  }

  useEffect(() => {
    init()
  }, []);


  return (
    <div
      style={{
        boxShadow: '0px -1px 3px 0px rgba(0, 0, 0,0.1) '
      }}
      className={`sha2dow-[0_35px_20px_-15px_rgba(0,0,0,0.3)] w-full`}
    >
      <Menu
        className={`flex h-[50px]`}
        mode="horizontal"
        defaultSelectedKeys={["1"]}>
        <Menu.Item
          className={`p-0 `}
          key="1" icon={
            <div className='flex ac jc'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[20px] h-[20px]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>

            </div>
          }>
          <NavLink to={"/dashboard"}></NavLink>
        </Menu.Item>

        {/* <div className='relative px-4 flex fdc ac jc shdadow rounded-[10px] bordder border-indigo-500 bg-idndigo-200'>
          <Switch
            checkedChildren="on" unCheckedChildren="off"
            className={``} checked={active} onClick={onClick}></Switch>
        </div> */}

        <Menu.Item className={``} key="3" icon={
          <div className='flex ac jc'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-[20px] h-[20px]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
          </div>

        }>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Nav;

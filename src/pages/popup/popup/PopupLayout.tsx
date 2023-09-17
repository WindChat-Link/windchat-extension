import { Button, Layout } from "antd";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface LayoutProps {
  children?: React.ReactNode;
  onChange?: (e) => {}
}
enum Buttons {
  home = 'home',
  settings = 'settings'
}
enum TabRoute {
  home = '/',
  settings = '/settings',
}
export default (props: LayoutProps) => {
  const { children, onChange = () => { } } = props;
  const [tab, setTab] = useState<any>(Buttons.home);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname

  useEffect(() => {
    const t = pathname.split('/')?.[1] || Buttons.home
    setTab(t)
  }, [pathname]);

  function onButtonChange(e) {
    onChange(e)
    setTab(e)
    navigate(TabRoute[e])
  }

  return (
    <div className={` pb-[50px] relative h-[360px] w-[300px] border box-border overflow-hidden `}>
      <div className={`px-4 h-full overflow-y-auto`}>{children}</div>
      <div
        style={{
          boxShadow: '0,0,0,rgba(0,0,0,1)'
        }}
        className={`bg-slate-50 shadow-[0_0px_10px_2px_rgba(0,0,0,0.1)] border-t border-slate-300 bg-white flex w-full absolute bottom-0 h-[50px]`}
      >
        <div className='w-full flex jc ac'>
          <Button.Group className={``}>
            <Button
              onClick={() => onButtonChange(Buttons.home)}
              className={`!px-8`}
              type={tab === Buttons.home ? 'primary' : 'default'}>Home</Button>

            <Button
              onClick={() => onButtonChange(Buttons.settings)}
              className={`!px-8`}
              type={tab === Buttons.settings ? 'primary' : 'default'}>Settings</Button>
          </Button.Group>
        </div>
      </div>
    </div>
  );
};

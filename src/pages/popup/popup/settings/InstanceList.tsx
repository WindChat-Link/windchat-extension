import api from '@/api-swagger';
import { Button, Popconfirm, Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import { messageError } from '../../../../utils/error';
import { useLicenseInfo, useInstanceList } from '../../../../utils/pstore';
import { fetchInstanceList } from './services';
import LoadingBlock from '../LoadingBlock';

export default function InstanceList() {
  const [licenseInfo, setLicenseInfo] = useLicenseInfo()
  const instanceId = licenseInfo?.instanceId;
  const licenseKey = licenseInfo?.licenseKey;
  const email = licenseInfo?.email;
  const [instanceList = [], setInstanceList] = useInstanceList()
  const [loading, setLoading] = useState<any>(false);
  const activationLimit = licenseInfo?.activationLimit || ''

  async function getList({ licenseKey, email }) {
    setLoading(true)
    try {
      const data = await fetchInstanceList({
        // @ts-ignore
        licenseKey, email
      })
      setInstanceList(data)
      if (data?.length === 0) {
        setLicenseInfo(p => {
          return {
            ...p,
            instanceId: null,
            valid: false,
          }
        })
      } else {
        setLicenseInfo(p => {
          return {
            ...p,
            activationUsage: data?.length,
          }
        })
      }
    } catch (error: any) {
      console.error(error);
      messageError(error);
    }
    setLoading(false)
  }

  useEffect(() => {
    if (licenseKey && email) {
      getList({ licenseKey, email })
    }
  }, [licenseKey, email]);

  async function deactivateInstanec(instanceIdToDeactivate) {
    try {
      const resp: any = await api.keyInstance.keyInstanceControllerDeactivate({
        instanceId: instanceIdToDeactivate, email, licenseKey
      })
      const data = await resp?.json();
      const deactivated = data?.deactivated;
      const error = data?.error;
      if (error) {
        message.error(error);
      } else if (deactivated) {
        message.success('Success')
        if (instanceIdToDeactivate === instanceId) {
          setLicenseInfo(oldInfo => {
            return {
              licenseKey: oldInfo.licenseKey,
              email: oldInfo.email,
              instanceId: null,
              valid: false
            }
          })
        }
      }
    } catch (error: any) {
      console.error(error);
      messageError(error);
    }
    await getList({ licenseKey, email })
  }

  if (loading && (!instanceList || instanceList.length === 0)) {
    return <div className='mt-12'>
      <LoadingBlock></LoadingBlock>
    </div>
  }

  return <div className={`pb-[20px]`}>
    {!instanceList || instanceList.length === 0 && <div className='mt-12 text-sm text-gray-400 flex jc'>
      (Empty)
    </div>}

    {instanceList && instanceList.length > 0 && activationLimit && <div className=''>
      <div className='pt-2 pb-4'>
        ActivationUsage: {instanceList?.length} / {activationLimit}
      </div>
      <div className='w-full h-[1px] bg-slate-300'></div>
    </div>
    }


    {instanceList.map((item, idx) => {
      const current = instanceId === item.id;

      return <div key={'b34286' + item.id} >
        <div className={`flex jb py-3`}>
          <div className='flex gap-1'>
            <div className=''>
              {item.id?.split('-')[0]}-***
            </div>
            {current ? <Tag className={`bg-indigo-50 border-indigo-300 text-indigo-600 text-[12px] px-1 py-0`}>Current</Tag> : null}
          </div>

          <Popconfirm
            okText='Delete'
            onConfirm={() => deactivateInstanec(item.id)} title={'Are you sure?'}>
            <Button danger size='small' className={``}>Delete</Button>
          </Popconfirm>
        </div>
        <div className='w-full h-[1px] bg-slate-300'></div>
      </div>
    })}



  </div>;
}

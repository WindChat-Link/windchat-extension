
import api from '@/api-swagger';
import { Button, Form, Input, message } from 'antd';
import { useState } from 'react';
import { messageError } from '../../../../utils/error';
import { useLicenseInfo } from '../../../../utils/pstore';

export default function LicenseForm({
  onSuccess = (...args) => { },
  onReachLimit = (...args) => { }
}) {
  const [reachLimit, setReachLimit] = useState<any>(false);
  const [tab, setTab] = useState<any>('form');
  const [licenseInfo = {}, setLicenseInfo] = useLicenseInfo()
  const instanceId = licenseInfo?.instanceId;
  const activated = licenseInfo?.activated;
  const [loading, setLoading] = useState<any>(false);

  async function onFinish(values) {
    setReachLimit(false);

    setLoading(true)

    const email = values.email;
    const licenseKey = values.licenseKey;

    try {
      const resp = await api.keyInstance.keyInstanceControllerActivate({
        email, licenseKey
      })
      const data: any = await resp?.json();
      const activated = data?.activated;
      const instanceId = data?.instanceId;
      const activationUsage = data?.activationUsage;
      const activationLimit = data?.activationLimit;

      const token = data?.token;
      const error = data?.error;

      // Success
      if (activated && !error) {
        setLicenseInfo(oldInfo => {
          return {
            ...oldInfo,
            valid: true,
            email,
            licenseKey,
            activated,
            instanceId,
            token,
            activationLimit,
            activationUsage,
          }
        })
        onSuccess(data);
      } else if (error) {
        // Error
        if (error.indexOf('activation limit') > -1) {
          setReachLimit(true);
          onReachLimit(true)
          setLicenseInfo({
            ...licenseInfo,
            email,
            licenseKey,
            valid: false
          })

          setTimeout(() => {
            setTab('instances')
          }, 300);
        }
        console.error('error', error);
        message.error(error);
      }
    } catch (error: any) {
      console.error(error);
      messageError(error);
    }

    setLoading(false)
  }

  return <div>
    <Form onFinish={onFinish}
      initialValues={{
        email: licenseInfo?.email || '',
        licenseKey: licenseInfo?.licenseKey || '',
      }}
    >
      <Form.Item name='email' label='Email'>
        <Input></Input>
      </Form.Item>
      <Form.Item name='licenseKey' label='LicenseKey'>
        <Input></Input>
      </Form.Item>
      <Form.Item label=''>
        <Button loading={loading} type='primary' className={`mt-2`} htmlType='submit'>Activate</Button>
      </Form.Item>
    </Form>
  </div >;
}

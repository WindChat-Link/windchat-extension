import api from '@/api-swagger';
import { message } from 'antd';
import { messageError } from '../../../../utils/error';

export async function fetchInstanceList({ email, licenseKey }) {
  try {
    const resp = await api.keyInstance.keyInstanceControllerListkeyInstances({
      // @ts-ignore
      licenseKey, email
    })
    const data = await resp?.json();
    return data;
  } catch (error: any) {
    console.error(error);
    messageError(error);
  }
}


export async function deactivateInstanec({ email, licenseKey, instanceId }) {
  try {
    const resp: any = await api.keyInstance.keyInstanceControllerDeactivate({
      instanceId, email, licenseKey
    })
    const data = await resp?.json();
    const deactivated = data?.deactivated;
    const error = data?.error;
    if (error) {
      message.error(error);
    } else if (deactivated) {
      message.success('Deactivate success')
    }
    return data;
  } catch (error: any) {
    console.error(error);
    messageError(error);
  }
}

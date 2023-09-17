import { message } from 'antd';

export function getErrorMessage(error) {
  return (
    error?.response?.errors?.[0]?.message ||
    error?.response?.data?.error ||
    error?.response?.data?.message ||
    error?.response?.error ||
    error?.response?.message ||
    error?.data?.message ||
    error?.['messages[0]'] ||
    error?.['data.messages[0]'] ||
    error?.message ||
    error?.error
  );
}
const hasWindow = typeof window !== 'undefined'

export async function messageError(error, prefix = '') {
  const msg = getErrorMessage(error);

  if (prefix) {
    const m = `${prefix}: ${msg}`;
    console.error("error", m);

    if (hasWindow) {
      message.error(m);
    }
  } else {
    console.error("error", msg);

    if (hasWindow) {
      message.error(msg);
    }
  }
}

export async function notifyError(error, prefix = '') {
  const msg = getErrorMessage(error);

  if (prefix) {
    const m = `${prefix}: ${msg}`;
    console.error("error", m);

    if (hasWindow) {
      message.error(m);
    }
  } else {
    console.error("error", msg);

    if (hasWindow) {
      message.error(msg);
    }
  }
}

export function getErrorCode(error) {
  const code = error?.statusCode ||
    error?.code ||
    error?.response?.status ||
    error?.response?.data?.statusCode ||
    error?.response?.data?.status ||
    error?.status

  return code
}

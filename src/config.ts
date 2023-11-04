const viteAppEnv = import.meta.env.VITE_APPENV;
export const isDev = viteAppEnv === 'dev' || viteAppEnv === 'local';
export const isLocal = viteAppEnv === 'local';

export const apiHost = import.meta.env.VITE_API_HOST

export const PLANS = {
  plan1: 'plan1',
  plan2: 'plan2',
}

export const SIG_SECRET = import.meta.env.VITE_SIG_SECRET

export const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile"
];


export const AppPrefix = `windchat-chart`

export const PLANS = {
  plan_monthly: 'plan_monthly',
  plan_yearly: 'plan_yearly',
  plan_lifetime: 'plan_lifetime',
}

export function getIsVip(loginInfo) {
  const plans = loginInfo?.plans || [];
  if (plans.includes(PLANS.plan_monthly)
    || plans.includes(PLANS.plan_yearly)
    || plans.includes(PLANS.plan_lifetime)) {
    return true;
  }
  return false;
}

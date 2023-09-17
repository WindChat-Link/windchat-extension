const features = [
  'Preview existing chat messages',
  'Live preview ongoing chat',
  'Unlimited chat groups',
  'Unlimited chat messages',
];

const incommingFeatures = [
  'Merge multiple adjacent HTML snippets and preview as complete one',
  'In page code editor and live preview',
  'Prompt library',
  'More features...'
];

export const freeTier = {
  title: 'Plan Free',
  price: 'Free',
  frequency: '',
  description: 'Free use.',
  features,
  cta: 'Free',
  mostPopular: false,
}

export const pricingData = {
  tiers: [
    {
      title: 'Plan 1',
      price: `$1.99`,
      frequency: '/month',
      frequencyText: 'Per month',
      description: `All features with an affordable price.
`,
      features,
      incommingFeatures,
      cta: 'Monthly billing',
      mostPopular: false,
      href: 'https://windchat.lemonsqueezy.com/checkout/buy/59c2b638-b6e9-49b0-8cd6-2f7b0b2469a7',

    },
    {
      title: 'Plan 2',
      price: `$9.99`,
      frequency: '/year',
      frequencyText: 'Per year',
      description: `All features, save 50% compared to Plan 1.`,
      features,
      incommingFeatures,
      cta: 'Yearly billing',
      mostPopular: false,
      href: 'https://windchat.lemonsqueezy.com/checkout/buy/a4651054-af22-4bc5-95dc-e80c0503f8a5',

    },
    {
      title: 'Plan 3',
      price: `$19.99`,
      frequency: 'lifetime',
      frequencyText: 'Lifetime',
      description: 'All features, lifetime use.',
      features,
      incommingFeatures,
      cta: 'One-time Payment',
      mostPopular: true,
      href: 'https://windchat.lemonsqueezy.com/checkout/buy/ca18d720-9444-4753-a32e-f47d4915226b',

    },
  ],
}


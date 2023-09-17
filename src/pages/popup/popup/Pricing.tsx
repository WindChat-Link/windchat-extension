import { freeTier, pricingData } from './pricingData'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

function FeatureItem({ feature, incomming = false }) {
  return <li key={feature} className="flex">
    <div className='mr-3 flex jc pt-1'>
      {!incomming ?
        <svg className={`text-indigo-600 flex-shrink-0 w-4 h-4 text-indigo-500`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        :
        <svg className={`text-gray-600 flex-shrink-0 w-4 h-4 text-indigo-500`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      }
    </div>

    {incomming ? <div className=''>
      <span className="text-gray-500">{feature} (Incomming)</span>
    </div> :
      <span className="text-indigo-500">{feature}</span>
    }

  </li >
}

function TierCard({ tier }) {
  return <div
    className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col"
  >
    <div className="flex-1">
      <h3 className="text-xl font-semibold text-gray-900">{tier.title}</h3>
      {tier.mostPopular ? (
        <p className="absolute top-0 py-1.5 px-4 bg-indigo-500 rounded-full text-xs font-semibold uppercase tracking-wide text-white transform -translate-y-1/2">
          Most popular
        </p>
      ) : null}
      <p className="mt-4 flex items-baseline text-gray-900">
        <span className="text-5xl font-extrabold tracking-tight">{tier.price}</span>
        <span className="ml-1 text-xl font-semibold">{tier.frequency}</span>
      </p>
      <p className="whitespace-pre-wrap mt-6 text-gray-500">{tier.description}</p>

      <ul role="list" className="mt-6 space-y-6">
        {tier.features.map((feature) => (
          <FeatureItem key={feature} feature={feature}></FeatureItem>
        ))}
        {tier.incommingFeatures.map((feature) => (
          <FeatureItem key={feature} incomming={true} feature={feature}></FeatureItem>
        ))}
      </ul>
    </div>

    <a
      target='_blank'
      href={tier.href}
      className={classNames(
        tier.mostPopular
          ? 'bg-indigo-500 text-white hover:bg-indigo-600'
          : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100',
        'mt-8 block w-full py-3 px-6 border border-transparent rounded-md text-center font-medium'
      )}
    >
      {tier.cta}
    </a>
  </div>
}
const description = `We offer a variety of plans to fit your needs.
Free users can activate 1 chat group at the same, and can preview latest 5 messages in one chat. More advanced features are only available to premium users.`

export default function Example() {
  return (
    <div className="max-w-7xl mx-auto py-24 px-4 bg-white sm:px-6 lg:px-8">
      <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl sm:leading-none sm:tracking-tight lg:text-6xl">
        <span className={`text-indigo-600`}>WindChat</span> Pricing
      </h2>
      <p className="whitespace-pre-wrap mt-6 max-w-2xl text-lg md:text-xl text-gray-500">
        {description}
      </p>

      {/* Tiers */}
      <div className="mt-24 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8">
        {pricingData.tiers.map((tier) => (
          <TierCard key={tier.title} tier={tier}></TierCard>
        ))}
      </div>

    </div>
  )
}

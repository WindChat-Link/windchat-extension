import { cn } from '../../../utils/cn';

export default function Button({ disabled = false, type, className = '', children = null, }) {
  switch (type) {
    case 'primary':
      return <button className={cn(
        'min-h-[38px]',
        'transition-all',
        disabled ? 'cursor-not-allowed' : '',
        'bg-indigo-600 text-white',
        'hover:bg-indigo-500 active:bg-indigo-700',
        'rounded px-[12px] py-[6px]', className)}>
        {children}
      </button>;
    default:
      return <button className={cn(
        'min-h-[38px]',
        'transition-all',
        disabled ? 'cursor-not-allowed' : '',
        `border`,
        `active:border-indigo-700 active:bg-gray-100 hover:border-indigo-500 hover:text-indigo-500`,
        'rounded px-[12px] py-[6px]', className)}>
        {children}
      </button>;
  }
}

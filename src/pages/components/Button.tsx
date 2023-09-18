import { cn } from '../../../utils/cn';

export default function Button({ style = {}, disabled = false, type = '', className = '', children = null }) {
  const commonStyle = {
    ...style,
    height: '24px',
    lineHeight: '24px',
  }

  const commonClasses = [
    'border',
    'flex items-center',
    'flex-nowrap',
    'transition-all',
    'rounded',
    'whitespace-no-wrap',
  ]

  let buttonTypeClasses = []
  switch (type) {
    case 'outline':
      buttonTypeClasses = [
        ...commonClasses,
        'border-indigo-600',
        'hover:shadow',
        disabled ? 'cursor-not-allowed' : '',
        'active:bg-gray-100',
        'text-indigo-600',
        'rounded px-3',
      ];
      break;
    case 'primary':
      buttonTypeClasses = [
        ...commonClasses,
        disabled ? 'cursor-not-allowed' : '',
        'border-indigo-600',
        'bg-indigo-600 text-white',
        'hover:bg-indigo-600 active:bg-indigo-700',
        'rounded px-3',
      ];
      break;
    default:
      buttonTypeClasses = [
        ...commonClasses,
        disabled ? 'cursor-not-allowed' : '',
        'text-indigo-600',
        'active:border-indigo-700 active:bg-gray-100 hover:border-indigo-600 hover:text-indigo-600',
        'rounded px-3',
      ];
      break;
  }

  const buttonClassName = cn(...buttonTypeClasses, className)

  return (
    <button style={commonStyle} className={buttonClassName}>
      {children}
    </button>
  );
}

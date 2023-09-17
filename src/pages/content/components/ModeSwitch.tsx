import { cn } from '../../../../utils/cn';

export default function ModeSwitch({ className = '', children = null, }) {
  return <div className={cn('text-sm grid grid-cols-2', className)}>
    <button
      style={{ height: '24px' }}
      className={cn(
        `rounded-l text-sm whitespace-no-wrap
      border-indigo-600
      border-l border-t border-b
       bg-indigo-600 hover:shadow text-white px-3 `,
      )}>tailwindcss</button>
    <button
      style={{ height: '24px' }}
      className={cn(
        `rounded-r text-sm whitespace-no-wrap
      border-r border-t border-b
      border-indigo-600
       text-indigo-600 hover:shadow  px-3 `,
      )}>React</button>
  </div>;
}

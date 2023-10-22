import { cn } from '../../../../utils/cn';
import { MODE } from '../config';

export default function ModeSwitch({ mode, setMode, className = '', children = null, }) {
  return <div className={cn('text-sm grid grid-cols-2', className)}>
    <button
      onClick={() => setMode(MODE.tailwind)}
      style={{ height: '24px' }}
      className={cn(
        `rounded-l text-sm whitespace-no-wrap
      border-indigo-600
      border-l border-t border-b
        hover:shadow text-white px-3 `,
        mode === MODE.tailwind ? 'bg-indigo-600' : '',
      )}>TailwindCSS</button>
    <button
      onClick={() => setMode(MODE.react)}
      style={{ height: '24px' }}
      className={cn(
        `rounded-r text-sm whitespace-no-wrap
      border-r border-t border-b
      border-indigo-600
       text-indigo-600 hover:shadow  px-3 `,
        mode === MODE.react ? 'bg-indigo-600' : '',
      )}>React (Beta)</button>
  </div>;
}

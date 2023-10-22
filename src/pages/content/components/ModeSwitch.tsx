// import { cn } from '../../../../utils/cn';
// import { MODE } from '../config';

// export default function ModeSwitch({ mode, setMode, className = '', children = null, }) {
//   return <div className={cn('text-sm grid grid-cols-2', className)}>
//     <button
//       onClick={() => setMode(MODE.tailwind)}
//       style={{ height: '24px' }}
//       className={cn(
//         `rounded-l text-sm whitespace-no-wrap
//       border-indigo-600
//       border-l border-t border-b
//         hover:shadow text-white px-3 `,
//         mode === MODE.tailwind ? 'bg-indigo-600' : '',
//       )}>TailwindCSS</button>
//     <button
//       onClick={() => setMode(MODE.react)}
//       style={{ height: '24px' }}
//       className={cn(
//         `rounded-r text-sm whitespace-no-wrap
//       border-r border-t border-b
//       border-indigo-600
//        text-indigo-600 hover:shadow  px-3 `,
//         mode === MODE.react ? 'bg-indigo-600' : '',
//       )}>React (Beta)</button>
//   </div>;
// }

import { cn } from '../../../../utils/cn';
import { MODE } from '../config';

export function ToggleButton({ value, options, onChange, className = '', children = null, }) {
  return <div className={cn('text-sm grid grid-cols-2', className)}>
    {options.map((item, idx) => {
      return <div key={'7793f6' + item.value}>
        <button
          onClick={() => onChange(item.value)}
          style={{
            height: '24px',
            borderRadius: idx === 0 ? '0.25em 0 0 0.25em' : '0 0.25em 0.25em 0'
          }}
          className={cn(
            idx === 0 ? 'rounded-l-lg border-l border-r' : 'border-r rounded-r-lg ',
            `text-sm whitespace-no-wrap
      border-indigo-600
      border-t border-b
        hover:shadow  px-3 `,
            value === item.value ? 'text-white bg-indigo-600' : 'text-indigo-600',
          )}>{item.label}</button>
      </div>
    })}
  </div>;
}

export default function ModeSwitch({ mode, setMode, className = '', children = null, }) {
  function onChange(v) {
    setMode(v);
  }
  const options = [
    {
      label: 'TailwindCSS',
      value: MODE.tailwind
    },
    {
      label: 'React (beta)',
      value: MODE.react,
    },
  ]
  return <ToggleButton value={mode}
    options={options}
    onChange={onChange}></ToggleButton>
}

export function DarkModeSwitch({ darkMode, setDarkMode, className = '', children = null, }) {
  function onChange(v) {
    setDarkMode(v);
  }
  const options = [
    {
      label: 'Light',
      value: 'light',
    },
    {
      label: 'Dark',
      value: 'dark',
    },
  ]
  return <ToggleButton value={darkMode}
    options={options}
    onChange={onChange}></ToggleButton>
}

// export default function ModeSwitch({ mode, setMode, className = '', children = null, }) {
//   return <div className={cn('text-sm grid grid-cols-2', className)}>
//     <button
//       onClick={() => setMode(MODE.tailwind)}
//       style={{ height: '24px' }}
//       className={cn(
//         `rounded-l text-sm whitespace-no-wrap
//       border-indigo-600
//       border-l border-t border-b
//         hover:shadow text-white px-3 `,
//         mode === MODE.tailwind ? 'bg-indigo-600' : '',
//       )}>tailwindcss</button>
//     <button
//       onClick={() => setMode(MODE.react)}
//       style={{ height: '24px' }}
//       className={cn(
//         `rounded-r text-sm whitespace-no-wrap
//       border-r border-t border-b
//       border-indigo-600
//        text-indigo-600 hover:shadow  px-3 `,
//         mode === MODE.react ? 'bg-indigo-600' : '',
//       )}>React</button>
//   </div>;
// }

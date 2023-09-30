
import { cn } from '../../../../utils/cn';

export const codeBlockTailwindClassName = 'CodeBlockTailwind';

export default function CodeBlockTailwind({ code, className = '', children = null, }) {
  return <div className={cn(codeBlockTailwindClassName, className)}>
    <div className='' dangerouslySetInnerHTML={{ __html: code }}></div>
  </div>;
}

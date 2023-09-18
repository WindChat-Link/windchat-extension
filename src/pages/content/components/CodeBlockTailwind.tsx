
import React from 'react';
import { useState, useEffect } from 'react';
import { cn } from '../../../../utils/cn';

export default function CodeBlockTailwind({ code, className = '', children = null, }) {
  return <div className={cn('', className)}>
    <div className='' dangerouslySetInnerHTML={{ __html: code }}></div>
  </div>;
}

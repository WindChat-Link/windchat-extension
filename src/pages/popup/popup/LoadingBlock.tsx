import { Spin } from 'antd';
import React from 'react';
import { useState, useEffect } from 'react';

export default function LoadingBlock() {
  return <div className={`flex ac jc`}>
    <Spin></Spin>
  </div>;
}

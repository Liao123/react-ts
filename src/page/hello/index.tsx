import React, { useState, useEffect } from 'react';
import './index.less';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
}

function Hello({ name, enthusiasmLevel = 1 }: Props) {
  useEffect(()=>{
    console.log(11121122121,process.env.NODE_ENV);
  })

  if (enthusiasmLevel <= 0) {
    throw new Error('You co222uld be a little more enthusiastic. :D');
  }

  return (
    <div className="hello">
      <div className="greeting color-red">
        Hello {name + getExclamationMarks(enthusiasmLevel)}
        <img style={{width:'100px'}} src={require('@/static/img/empty.png')}></img>
      </div>
    </div>
  );
}

export default Hello;

// helpers

function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
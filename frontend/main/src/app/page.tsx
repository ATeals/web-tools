'use client';

import { useState } from 'react';
import { Button, Progress } from '@fe/design/ui';

export default function Home() {
  const [state, setState] = useState(0);

  const handleClick = () => {
    if (state < 10) return setState(state + 1);

    alert('Max value reached');
  };

  return (
    <div className="flex flex-col gap-5 justify-center items-center w-1/2 mx-auto h-dvh">
      <h1 className="text-2xl font-bold">Hello, world!</h1>
      <Progress value={state * 10} max={10} />
      <Button variant={'default'} onClick={handleClick}>
        Click me
      </Button>
    </div>
  );
}

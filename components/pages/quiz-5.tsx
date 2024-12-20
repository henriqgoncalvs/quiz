'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import { useRef } from 'react';

export default function Quiz5() {
  const noButtonRef = useRef<HTMLButtonElement | null>(null);

  const router = useRouter();

  function changePosition() {
    const i = Math.floor(Math.random() * 500) + 1;
    const j = Math.floor(Math.random() * 500) + 1;

    if (noButtonRef.current) {
      noButtonRef.current.style.position = 'absolute';
      noButtonRef.current.style.left = i + 'px';
      noButtonRef.current.style.top = j + 'px';
    }
  }

  return (
    <div className="flex flex-col w-full items-center justify-center gap-4 relative">
      <h1 className="text-center text-3xl mb-16 mx-3">
        Agora pra desbloquear o último presente...
      </h1>

      <p className="w-full text-center underline text-lg">
        Você promete não deixar de amar Henrique?
      </p>

      <div className="flex items-center gap-2">
        <Button ref={noButtonRef} onClick={changePosition}>
          Não
        </Button>
        <Button onClick={() => router.push('finish')}>Sim</Button>
      </div>
    </div>
  );
}

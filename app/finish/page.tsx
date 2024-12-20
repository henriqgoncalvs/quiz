'use client';

import Confetti from 'react-confetti';

import { useWindowSize } from '@/lib/use-window-size';
import { useEffect, useRef } from 'react';

export default function Page() {
  const { width, height } = useWindowSize();

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, [audioRef]);

  return (
    <div className="flex flex-col w-full items-center justify-center gap-4">
      <h1 className="text-center text-3xl mb-16 mx-3">
        Aguarde enquanto ele vai pegar o presente...
      </h1>

      <Confetti width={width} height={height} run={true} />

      <audio src="/drum.mp3" ref={audioRef} />
    </div>
  );
}

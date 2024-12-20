'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import Confetti from 'react-confetti';

import { useRef, useState } from 'react';
import { useWindowSize } from '@/lib/use-window-size';

import { ScratchCard } from 'next-scratchcard';

export default function Quiz3() {
  const [canGoToNextStep, setCanGoToNextStep] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const { width, height } = useWindowSize();

  const router = useRouter();

  const handleComplete = () => {
    setCanGoToNextStep(true);

    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-center gap-4">
      <h1 className="text-center text-3xl mb-16 mx-3">Raspe aqui para revelar a memória</h1>

      <ScratchCard finishPercent={90} brushSize={30} height={200} onComplete={handleComplete}>
        <img height="auto" width="100%" src="/foto-1.jpeg" />
      </ScratchCard>

      <Confetti width={width} height={height} run={canGoToNextStep} />

      <audio src="/nostalgia.mp3" ref={audioRef} />

      {canGoToNextStep && (
        <div className="flex flex-col items-center justify-center my-4 gap-2">
          <p className="w-full text-center">
            Que saudade!! 👏👏 Além disso você ganhou um jantar surpresa
          </p>
          <Button onClick={() => router.push('quiz-4')}>Clique para ver</Button>
        </div>
      )}
    </div>
  );
}

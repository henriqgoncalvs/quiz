'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import Confetti from 'react-confetti';

import { useRef, useState } from 'react';
import { useWindowSize } from '@/lib/use-window-size';

import dynamic from 'next/dynamic';

const DynamicWheel = dynamic(() => import('react-custom-roulette').then((module) => module.Wheel), {
  ssr: false,
});

const data = [
  { option: 'À Luz de Velas', style: { backgroundColor: '#f47c41', textColor: '#0e3146' } },
  { option: 'Piatti & Vino', style: { backgroundColor: '#f4e04b', textColor: '#0e3146' } },
  { option: 'Jappa', style: { backgroundColor: '#0e3146', textColor: '#6fb7d9' } },
  { option: 'Da Villa', style: { backgroundColor: '#6fb7d9', textColor: '#0e3146' } },
];

export default function Quiz4() {
  const [mustSpin, setMustSpin] = useState(false);
  const [canGoToNextStep, setCanGoToNextStep] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const { width, height } = useWindowSize();

  const router = useRouter();

  const onStopSpinning = () => {
    setCanGoToNextStep(true);
    setMustSpin(false);

    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  if (typeof window === undefined) {
    return <></>;
  }

  return (
    <div className="flex flex-col w-full items-center justify-center gap-4">
      <h1 className="text-center text-3xl mb-16 mx-3">Gire a Roleta</h1>

      <DynamicWheel
        mustStartSpinning={mustSpin && !canGoToNextStep}
        prizeNumber={3}
        data={data}
        onStopSpinning={onStopSpinning}
      />

      <Button disabled={canGoToNextStep} onClick={() => setMustSpin(true)}>
        Girar Roleta
      </Button>

      <Confetti width={width} height={height} run={canGoToNextStep} />

      <audio src="/crowd.mp3" ref={audioRef} />

      {canGoToNextStep && (
        <div className="flex flex-col items-center justify-center my-4 gap-2">
          <p className="w-full text-center">Hmm que delícia!! 👏👏</p>
          <Button onClick={() => router.push('quiz-5')}>Avançar</Button>
        </div>
      )}
    </div>
  );
}

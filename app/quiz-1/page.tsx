'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

import Confetti from 'react-confetti';

import { useRef, useState } from 'react';
import { useWindowSize } from '@/lib/use-window-size';

export default function Page() {
  const [inputText, setInputText] = useState('');
  const [inputError, setInputError] = useState(false);
  const [canGoToNextStep, setCanGoToNextStep] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const { width, height } = useWindowSize();

  const router = useRouter();

  const isContained = (value: string) => {
    const target = 'Henrique';
    return target.startsWith(value);
  };

  const handleInputChange = (value: string) => {
    setInputText(value);

    if (!isContained(value)) {
      setInputError(true);

      return;
    }

    setInputError(false);

    if (value === 'Henrique') {
      setCanGoToNextStep(true);

      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <h1 className="text-center text-3xl mb-16 mx-3">
        Qual o nome da pessoa que mais te ama no mundo?
      </h1>

      <p className="mb-5">Digite o nome</p>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Henrique"
          value={inputText}
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>

      <Confetti width={width} height={height} run={canGoToNextStep} />

      <audio src="/claps.mp3" ref={audioRef} />

      {inputError && (
        <span className="text-sm font-semibold text-red-400 mt-2">
          Não é isso, a resposta tá fácil
        </span>
      )}
      {canGoToNextStep && (
        <div className="flex flex-col items-center justify-center my-2 gap-2">
          <p>Muito bem 👏 pode prosseguir.</p>
          <Button onClick={() => router.push('quiz-2')}>Avançar</Button>
        </div>
      )}
    </div>
  );
}

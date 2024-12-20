'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import Confetti from 'react-confetti';

import { useRef, useState } from 'react';
import { useWindowSize } from '@/lib/use-window-size';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp';

export default function Page() {
  const [inputText, setInputText] = useState('');
  const [inputError, setInputError] = useState(false);
  const [canGoToNextStep, setCanGoToNextStep] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const { width, height } = useWindowSize();

  const router = useRouter();

  const isContained = (value: string) => {
    const target = '191018';
    return target.startsWith(value);
  };

  const handleInputChange = (value: string) => {
    setInputText(value);

    if (!isContained(value)) {
      setInputError(true);

      return;
    }

    setInputError(false);

    if (value === '191018') {
      setCanGoToNextStep(true);
    }
  };

  return (
    <div className="flex flex-col w-full items-center justify-center gap-4">
      <h1 className="text-center text-3xl mb-16 mx-3">Agora digite a senha</h1>

      <p className="mb-5">💡 Data que a gente se conheceu</p>
      <div className="flex items-center gap-2">
        <InputOTP maxLength={6} value={inputText} onChange={(value) => handleInputChange(value)}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Confetti width={width} height={height} run={canGoToNextStep} />

      <audio src="/claps.mp3" ref={audioRef} />

      {inputError && (
        <span className="text-sm font-semibold text-red-400 mt-2">
          Não é isso, a resposta tá fácil
        </span>
      )}
      {canGoToNextStep && (
        <div className="flex flex-col items-center justify-center my-4 gap-2">
          <p>Parabéns!! 👏👏 Você desbloqueou uma memória</p>
          <Button onClick={() => router.push('quiz-3')}>Clique para ver</Button>
        </div>
      )}
    </div>
  );
}

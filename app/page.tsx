'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [shouldShowNoMessage, setShouldShowNoMessage] = useState(false);

  return (
    <div className="flex flex-col w-full items-center justify-center">
      <h1 className="text-center text-3xl mb-16 mx-3">
        Oi, você foi convidada para um quiz por Henrique
      </h1>

      <p className="mb-5">Deseja participar?</p>
      <div className="flex items-center gap-2">
        <Button onClick={() => setShouldShowNoMessage(true)}>Não</Button>
        <Button onClick={() => router.push('quiz-1')}>Sim</Button>
      </div>

      {shouldShowNoMessage && (
        <span className="text-sm font-semibold text-red-400 mt-2">
          Deixe de ser assim vei, participe
        </span>
      )}
    </div>
  );
}

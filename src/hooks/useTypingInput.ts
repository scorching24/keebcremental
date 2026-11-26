import { useEffect } from 'react';
import { useTypingStore } from '../store/useTypingStore';

export function useTypingInput() {
    const typeChar = useTypingStore((state) => state.typeChar);
    const nextWord = useTypingStore((state) => state.nextWord);
    const restart = useTypingStore((state) => state.restart);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey || event.metaKey || event.altKey) return;
            
            if (event.key === 'Enter' || event.key === 'Escape') {
                event.preventDefault();
                restart();
                return;
            }

            if (event.key === ' ' || event.key === 'Spacebar'){
                event.preventDefault();
                nextWord();
                return;
            }

            if (event.key === 'Tab' || event.key === 'Backspace'){
                return;
            }

            if (event.key.length !==1) return;
            
            typeChar(event.key);
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [typeChar]);
}
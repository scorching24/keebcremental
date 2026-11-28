import { useEffect } from 'react';
import { useTypingStore } from '../store/useTypingStore';

export function useTypingInput() {
    const typeChar = useTypingStore((state) => state.typeChar);
    const nextWord = useTypingStore((state) => state.nextWord);
    const restart = useTypingStore((state) => state.restart);
    const toggleTree = useTypingStore((state) => state.toggleTree);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey || event.metaKey || event.altKey) return;

            if (event.key === 'Tab') {
                event.preventDefault();
                toggleTree();
                return;
            }
            
            if (event.key === 'Escape') {
                if (useTypingStore.getState().treeOpen) {
                    toggleTree();
                } else {
                    restart();
                }

                return;
            }

            if (useTypingStore.getState().treeOpen) return;

            if (event.key === 'Enter') {
                event.preventDefault();
                restart();
                return;
            }

            if (event.key === ' ' || event.key === 'Spacebar') {
                event.preventDefault();
                nextWord();
                return;
            }

            if (event.key === 'Backspace') return;
            
            if (event.key.length !==1) return;

            typeChar(event.key);
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [typeChar, nextWord, restart, toggleTree]);
}
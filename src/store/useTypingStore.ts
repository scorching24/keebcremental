import { create } from 'zustand';
import { generateWords } from '../utils/wordGenerator';

interface TypingState {
    words: string[];

    currentWordIndex: number;
    currentLetterIndex: number;

    typedChars: string[];

    startTime: number | null;
    totalKeystrokes: number;
    correctKeystrokes: number;
    completedWords: number;

    setWords: (words: string[]) => void;
    reset: () => void;
}

const WORD_COUNT = 30;

function createInitialState() {
    return {
        words: generateWords(WORD_COUNT),
        currentWordIndex: 0,
        currentLetterIndex: 0,
        typedChars: [],
        startTime: null,
        totalKeystrokes: 0,
        correctKeystrokes: 0,
        completedWords:0,
    };
}

export const useTypingStore = create<TypingState>((set) => ({
    ...createInitialState(),

    setWords: (words) => set({ words }),

    reset: () => set(createInitialState()),
}));
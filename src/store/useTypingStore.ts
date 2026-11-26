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

    skippedWords: Array<{ wordIndex: number; typed: string[] }>;
    streak: number;
    bestStreak: number;
    endTime: number | null;
    testComplete:boolean;
    switches: number;
    runSwitches: number;

    setWords: (words: string[]) => void;
    typeChar: (key: string) => void;
    nextWord: () => void;
    restart: () => void;
}

const WORD_COUNT = 30;

function createInitialState() {
    return {
        words: generateWords(WORD_COUNT),
        currentWordIndex:0,
        currentLetterIndex: 0,
        typedChars: [],
        startTime: null,
        totalKeystrokes: 0,
        correctKeystrokes: 0,
        completedWords:0,
        skippedWords: [],
        streak: 0,
        bestStreak: 0,
        switches: 0,
        endTime: null,
        testComplete: false,
        runSwitches: 0,
    };
}

export const useTypingStore = create<TypingState>((set) => ({
    ...createInitialState(),
    setWords: (words) => set({ words }),
    restart: () => set(createInitialState()),

    typeChar: (key) => set((state) => {
        if (state.testComplete) return state;

        const word = state.words[state.currentWordIndex] ?? '';
        const expected = word[state.currentLetterIndex];

        if (expected === undefined) return state;

        const nextTyped = [...state.typedChars];
        nextTyped[state.currentLetterIndex] = key;

        const isCorrect = key.toLowerCase() === expected.toLowerCase();

        return {
            startTime: state.startTime ?? Date.now(),
            typedChars: nextTyped,
            currentLetterIndex: state.currentLetterIndex + 1,
            totalKeystrokes: state.totalKeystrokes + 1,
            correctKeystrokes: state.correctKeystrokes + (isCorrect ? 1 : 0),
        };
    }),

    nextWord: () => set((state) => {
        if (state.testComplete) return state;

        const word = state.words[state.currentWordIndex] ?? '';
        const typed = state.typedChars;

        const finishedCorrectly =
            typed.length === word.length &&
            typed.every(
                (char, index) => char.toLowerCase() === word[index].toLowerCase()
            );
        
        const skipped = !finishedCorrectly;
        const missedLetters = skipped ? Math.max(word.length - typed.length, 0) : 0;
        const nextStreak = finishedCorrectly ? state.streak + 1 : 0;

        const shared = {
            skippedWords: skipped
            ? [...state.skippedWords, { wordIndex: state.currentWordIndex, typed: [...typed] }]
            : state.skippedWords,
            totalKeystrokes: state.totalKeystrokes + missedLetters,
            completedWords : state.completedWords + (finishedCorrectly ? 1 : 0),
            switches: state.switches + (finishedCorrectly ? 1 : 0),
            streak: nextStreak,
            bestStreak: Math.max(state.bestStreak, nextStreak), 
            runSwitches: state.runSwitches + (finishedCorrectly ? 1 : 0),
        };

        const nextIndex = state.currentWordIndex + 1;

        if (nextIndex >= state.words.length) {
            return {
                ...shared,
                testComplete: true,
                endTime: Date.now(),
            };
        }

        return {
            ...shared,
            currentWordIndex: nextIndex,
            currentLetterIndex: 0,
            typedChars: [],
        };  
    }),
}));
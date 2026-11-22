import { englishWords } from '../assets/words/common';

export function generateWords(count: number = 30): string[] {
    const words: string [] = [];

    const wordList = englishWords.words;

    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * wordList.length);
        words.push(wordList[randomIndex]);
    }
    return words;
}
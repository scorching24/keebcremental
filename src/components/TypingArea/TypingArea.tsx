import { useTypingStore } from '../../store/useTypingStore';

export function TypingArea() {
    const { words, currentWordIndex, currentLetterIndex, typedChars } = useTypingStore();

    const getLetterClass = (wordIndex: number, letterIndex: number, letter: string) => {
        // if the word has been completed already
        if (wordIndex < currentWordIndex) {
           return 'letter text-correct'; 
        }

        // if word is still being typed
        if (wordIndex === currentWordIndex) {
            // if the letter is behind the cursor
            if (letterIndex < currentLetterIndex) {
                const typedChar = typedChars[letterIndex];
                return typedChar === letter ? 'letter text-correct' : 'letter text-incorrect';
            }
            // if its the letter that the cursor is on
            if (letterIndex === currentLetterIndex) {
                return 'letter text-current'
            }
        }

        // future letters and words
        return 'letter text-muted';
    };

    return (
        <div className='typing-container'>
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className='word'>
                    {word.split('').map((letter, letterIndex) => (
                        <span
                            key={letterIndex}
                            className={getLetterClass(wordIndex, letterIndex, letter)}
                        >
                            {letter}
                        </span>
                    ))}
                </span>
            ))}
        </div>
    );
}
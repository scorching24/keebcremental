import { useEffect, useState } from 'react';
import { useTypingStore } from '../../store/useTypingStore';

const MIN_ELAPSED_MS = 3000;

export function StatsBar() {
    const startTime = useTypingStore((state) => state.startTime);
    const correctKeystrokes = useTypingStore((state) => state.correctKeystrokes);
    const totalKeystrokes = useTypingStore((state) => state.totalKeystrokes);
    const streak = useTypingStore((state) => state.streak);
    const switches = useTypingStore((state) => state.switches);

    const [wpm, setWpm] = useState(0);

    useEffect(() => {
        if (startTime === null) {
            setWpm(0);
            return;
        }
    

    const update = () => {
        const currentCorrect = useTypingStore.getState().correctKeystrokes;
        const elapsedMs = Math.max(Date.now() - startTime, MIN_ELAPSED_MS);
        setWpm(Math.round(currentCorrect / 5 / (elapsedMs / 60000)));
    };

    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
}, [startTime]);

    const accuracy =
    totalKeystrokes === 0
        ? 100
        : Math.round((correctKeystrokes / totalKeystrokes) * 100);
    
    return (
        <div className='stats-bar'>
            <span>{wpm} wpm</span>
            <span>{accuracy}%</span>
            <span>{streak} streak</span>
            <span>{switches} switches</span>
        </div>
    )
}
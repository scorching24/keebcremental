import { useTypingStore } from '../../store/useTypingStore';

export function TestSummary() {
    const testComplete = useTypingStore((state) => state.testComplete);
    const startTime = useTypingStore ((state) => state.startTime);
    const endTime = useTypingStore ((state) => state.endTime);
    const correctKeystrokes = useTypingStore((state) => state.correctKeystrokes);
    const totalKeystrokes = useTypingStore((state) => state.totalKeystrokes);
    const completedWords = useTypingStore((state) => state.completedWords);
    const bestStreak = useTypingStore((state) => state.bestStreak);
    const runSwitches = useTypingStore((state) => state.runSwitches);
    const toggleTree = useTypingStore((state) => state.toggleTree);
    const restart = useTypingStore((state) => state.restart);

    if (!testComplete) return null;

    const elapsedMs = startTime && endTime ? endTime - startTime : 3000;
    const wpm = Math.round(correctKeystrokes / 5 / (Math.max(elapsedMs, 3000) / 60000));
    const accuracy =
        totalKeystrokes === 0
            ? 100
            : Math.round((correctKeystrokes / totalKeystrokes) * 100);
    
    return (
        <div className='run-backdrop'>
            <div className='run-complete'>
                <h2 className='run-title'>run complete</h2>

                <div className='run-grid'>
                    <section className='run-panel run-panel-main'>
                        <div className='run-row'>
                            <span>wpm</span>
                            <strong>{wpm}</strong>
                        </div>

                        <div className='run-row'>
                            <span>accuracy</span>
                            <strong>{accuracy}%</strong>
                        </div>

                        <div className='run-row'>
                            <span>highest streak</span>
                            <strong>{bestStreak}</strong>
                        </div>

                        <div className='run-earned'>
                            <span>switches earned</span>
                            <strong>+{runSwitches}</strong>
                        </div>
                    </section>

                    <section className='run-panel run-panel-words'>
                        <span className='run-panel-label'>words</span>
                        <strong className='run-words-count'>{completedWords}</strong>
                    </section>

                    <section className='run-panel run-panel-empty' aria-hidden='true' />
                </div>

                <div className='run-actions'>
                    <button className='run-bottom run-button-primary' type='button' onClick={toggleTree}>
                        open keebtree
                    </button>
                    <button className='run-bottom run-button-primary' type='button' onClick={restart}>
                        next test
                    </button>
                </div>
            </div>
        </div>
    )
}
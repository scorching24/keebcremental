import { TypingArea } from './components/TypingArea/TypingArea';
import { StatsBar } from './components/UI/StatsBar';
import { useTypingInput } from './hooks/useTypingInput';
import { TestSummary } from './components/UI/TestSummary';

function App() {
  useTypingInput();
  
  return (
    <main>
      <StatsBar />
      <TypingArea />
      <TestSummary />
    </main>
  );
}

export default App;
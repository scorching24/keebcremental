import { TypingArea } from './components/TypingArea/TypingArea';
import { StatsBar } from './components/UI/StatsBar';
import { UpgradeTree } from './components/UpgradeTree/UpgradeTree';
import { useTypingInput } from './hooks/useTypingInput';
import { TestSummary } from './components/UI/TestSummary';

function App() {
  useTypingInput();
  
  return (
    <main>
      <StatsBar />
      <TypingArea />
      <TestSummary />
      <UpgradeTree />
    </main>
  );
}

export default App;
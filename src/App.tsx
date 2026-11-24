import { TypingArea } from './components/TypingArea/TypingArea';
import { useTypingInput } from './hooks/useTypingInput';

function App() {
  useTypingInput();
  
  return (
    <main>
      <TypingArea />
    </main>
  );
}

export default App;
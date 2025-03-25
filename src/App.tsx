import "./App.css";
import TopBarTools from "./components/Tools/TopBarTools";
import { PaintProvider } from "./context/PaintProvider";
import Canvas from "./components/Canvas/Canvas";

function App() {
  return (
    <PaintProvider>
      <TopBarTools />
      <Canvas />
    </PaintProvider>
  );
}

export default App;

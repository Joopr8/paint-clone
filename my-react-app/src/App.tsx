import "./App.css";
import TopBarTools from "./components/TopBarTools";
import { PaintProvider } from "./context/PaintContext";
import Canvas from "./components/Canvas";

function App() {
  return (
    <PaintProvider>
      <TopBarTools />
      <Canvas />
    </PaintProvider>
  );
}

export default App;

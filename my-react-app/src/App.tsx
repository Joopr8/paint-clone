import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import TopBarTolls from "./components/TopBarTolls";
import "./App.css";
import { PaintProvider } from "./context/PaintContext";
import Canvas from "./components/Canvas";

function App() {
  return (
    <>
      <PaintProvider>
        <TopBarTolls />
        <Canvas />
      </PaintProvider>
    </>
  );
}

export default App;

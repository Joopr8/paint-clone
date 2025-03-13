import "./App.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import TopBarTolls from "./components/TopBarTolls";
import "./App.css";
import { PaintProvider } from "./context/PaintContext";

function App() {
  return (
    <>
      <PaintProvider>
        <TopBarTolls />
      </PaintProvider>
    </>
  );
}

export default App;

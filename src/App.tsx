import "./App.css";
import { BackgroundParticles } from "./components/background-particles";
import { Header } from "./widgets/Header";
import { useState } from "react";
import { Home } from "./views/home";
import { Game } from "./views/game";

type View = "home" | "game";

function App() {
  const [view, setView] = useState<View>("home");

  return (
    <main className="h-screen flex flex-col">
      <Header />
      {view === "home" ? <Home OnPlaying={() => setView("game")} /> : <Game />}
      <BackgroundParticles />
    </main>
  );
}

export default App;

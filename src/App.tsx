import "./App.css";
import { useState } from "react";
import { BackgroundParticles } from "./components/background-particles";
import { Home } from "./views/home";
import { Game } from "./views/game";
import { Toaster } from "@/components/ui/sonner";
import { Header } from "./widgets/Header";

type View = "home" | "game";

function App() {
  const [view, setView] = useState<View>("home");

  const Content = () => {
    switch (view) {
      case "game":
        return <Game />;
      default:
        return <Home OnPlaying={() => setView("game")} />;
    }
  };

  return (
    <main className="h-screen flex flex-col items-center">
      <BackgroundParticles />
      <Header />
      <div className="select-none size-full">{Content()}</div>
      <Toaster />
    </main>
  );
}

export default App;

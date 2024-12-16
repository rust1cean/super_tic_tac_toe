import "./App.css";
import { observer } from "mobx-react-lite";
import { BackgroundParticles } from "./components/background-particles";
import { Home, Game } from "@/views";
import { Toaster } from "@/components/ui/sonner";
import { mainViewState, type MainViewState } from "./state/main-view.state";
import Header from "@/widgets/header";

function App() {
  const Content = observer(
    ({ mainViewState }: { mainViewState: MainViewState }) => {
      switch (mainViewState.mainView) {
        case "game":
          return <Game />;
        default:
          return <Home />;
      }
    }
  );

  return (
    <main className="h-screen flex flex-col items-center">
      <BackgroundParticles />
      <Header />
      <div className="select-none size-full">
        <Content mainViewState={mainViewState} />
      </div>
      <Toaster />
    </main>
  );
}

export default App;

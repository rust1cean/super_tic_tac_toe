import "./App.css";
import { observer } from "mobx-react-lite";
import { BackgroundParticles } from "./components/background-particles";
import { Home, Game } from "@/views";
import { Toaster } from "@/components/ui/sonner";
import { viewState, type ViewState } from "./state/view.state";
import Header from "@/widgets/header";

function App() {
  const Content = observer(
    ({ viewState }: { viewState: ViewState }) => {
      switch (viewState.mainView) {
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
        <Content viewState={viewState} />
      </div>
      <Toaster />
    </main>
  );
}

export default App;

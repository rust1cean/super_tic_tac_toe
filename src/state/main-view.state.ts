import { makeAutoObservable } from "mobx";

type View = "home" | "game";

export type MainViewState = {
  mainView: View;
  isHome: boolean;
  isGame: boolean;
  goHome: () => void;
  playVsBot: () => void;
  playVsHuman: () => void;
};

export function createMainViewState() {
  return makeAutoObservable<MainViewState>({
    mainView: "home",
    get isHome() {
      return this.mainView === "home"
    },
    get isGame() {
      return this.mainView === "game"
    },
    goHome() {
      this.mainView = "home";
    },
    playVsBot() {
      this.mainView = "game";
    },
    playVsHuman() {
      this.mainView = "game";
    },
  });
}

export const mainViewState = createMainViewState();

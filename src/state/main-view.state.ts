import { makeAutoObservable } from "mobx";

type View = "home" | "game";

export type MainViewState = {
  mainView: View;
  goHome: () => void;
  playVsBot: () => void;
  playVsHuman: () => void;
};

export function createMainViewState() {
  return makeAutoObservable<MainViewState>({
    mainView: "home",
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

import { invoke } from '@tauri-apps/api/core';
import { makeAutoObservable } from "mobx";
import { gameState } from './game.state';

type View = "home" | "game";

export class ViewState {
  mainView: View = "home";

  constructor() {
    makeAutoObservable(this)
  }

  get isHome() {
    return this.mainView === "home"
  }

  get isGame() {
    return this.mainView === "game"
  }

  goHome() {
    this.mainView = "home";
  }

  playVsBot() {
    this.mainView = "game";
    invoke('play_vs_bot').then((result) => {
      gameState.create_new(result as any)
    })
  }

  playVsHuman() {
    alert("not ready.")
  }
}

export const viewState = new ViewState();

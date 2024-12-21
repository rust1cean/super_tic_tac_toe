import type { MarkedAs } from "@/components/marked-cell";
import { makeAutoObservable } from "mobx";

export type ICell = {
  index: number;
  marked: MarkedAs;
}

export type IUtlimateCell = ICell & {
  children: {
    [key: number]: ICell
  }
}

export type IBoard = {
  [key: number]: IUtlimateCell
}

export const createBoard = (): IBoard => {
  let board = {}

  for (let i = 1; i < 10; i++) {
    (board as any)[i] = {
      index: i,
      marked: "",
      children: {}
    }

    for (let j = 1; j < 10; j++) {
      (board as any)[i].children[j] = {
        index: j,
        marked: ""
      };
    }
  }

  return board
}

export type PlayerTurn = "o" | "x";

export type gameState = {
  turn: PlayerTurn;
  board: IBoard;
  currUltiIdx: number;
  getCurrUlti: IUtlimateCell;
  switchTurn: () => any;
  getCell: (x: number, y: number) => any;
  tryMarkCell: (x: number, y: number) => any;
  checkDominant: () => Promise<any>;
}

export function createGameState() {
  return makeAutoObservable<gameState>({
    turn: Math.random() > 0.5 ? "x" : "o",
    board: createBoard(),
    currUltiIdx: 5,
    switchTurn() {
      this.turn = this.turn === "x" ? "o" : "x"
    },
    get getCurrUlti() {
      return this.board[this.currUltiIdx]
    },
    getCell(x: number, y: number) {
      return this.board[y].children[x]
    },
    async checkDominant() {
      const cells = this.getCurrUlti.children
    },
    tryMarkCell(x: number, y: number) {
      const exists = y in this.board && x in this.board[y].children
      const marked = (this.board as any)[y].children[x].marked.length > 0
      const insideUlti = y === this.currUltiIdx

      if (exists && !marked && insideUlti) {
        this.currUltiIdx = x;
        (this.board as any)[y].children[x].marked = this.turn
        this.switchTurn()
        this.checkDominant()
      }
    }
  });
}

export const gameState = createGameState();

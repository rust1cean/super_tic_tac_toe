import { makeAutoObservable } from "mobx";

export type Board<LikeCell> = {
  cells: LikeCell[]
  marked_cells: Mark[]
  winner: Mark
}

export type IUltimateCell = {
  id: Id,
  board: Board<ICell>
}

export type ICell = {
  id: Id,
  mark: Mark
}

export enum PlayerKind {
  Human,
  Bot
}

export type Id = number;
export type Mark = 'o' | 'x' | 'O' | 'X' | null | undefined;

export class GameState {
  enemy: PlayerKind | null = null;
  turn: Mark = null;
  board: Board<IUltimateCell> = {} as any;
  currentUltimateCellId: Id | null = null;

  constructor() {
    makeAutoObservable(this)
  }

  reset() {
    this.turn = null;
    this.board = {} as any;
  }

  create_new(cfg: {
    turn: Mark,
    board: Board<IUltimateCell>
  }) {
    Object.assign(this, cfg)
  }

  setTurn(newTurn: Mark) {
    this.turn = newTurn
  }

  setCurrentUltimateCellId(id: Id) {
    this.currentUltimateCellId = id
  }

  markCell(ultiCellId: Id, cellId: Id, mark: Mark) {
    const ultimateCell = this.board.cells[ultiCellId];
    const marked_cells = ultimateCell.board.marked_cells

    this.board.cells[ultiCellId] = {
      ...this.board.cells[ultiCellId],
      board: {
        ...ultimateCell.board,
        marked_cells: marked_cells.map((value: any, id: any) => id === cellId ? mark : value)
      }
    }
  }

  tryDetermineWinner({ ultimateCellId, winner }: { ultimateCellId: Id, winner: Mark }) {
    this.board.marked_cells[ultimateCellId] = winner
  }

  determineWinner({ winner }: { winner: Mark }) {
    alert(`The winner: ${winner}`)
  }
}

export const gameState = new GameState()

import { action, makeAutoObservable, observable } from "mobx";

export type Board<LikeCell> = {
  cells: LikeCell[]
  marked_cells: IMarkedCell[]
  winner: Mark
}

export type IUltimateCell = {
  id: Id,
  board: Board<ICell>
}

export type IMarkedCell = {
  id: Id,
  mark: Mark
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

  constructor() {
    makeAutoObservable(this, {
      turn: observable,
      board: observable,
      reset: action,
      create_new: action,
      markCell: action,
      setTurn: action,
    })
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

  markCell(ultimateCellId: Id, cellId: Id, mark: Mark) {
    (this.board as any).cells[ultimateCellId].board.marked_cells.push({ id: cellId, mark })
  }
}

export const gameState = new GameState()

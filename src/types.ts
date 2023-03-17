export enum Compass {
  N = "N",
  E = "E",
  S = "S",
  W = "W",
}

export enum Command {
  F = "F",
  R = "R",
  L = "L",
}

export type Position = Coordinates & {
  orientation: Compass;
  outOfBound: boolean;
};

export type Coordinates = { x: number; y: number };

export type Grid = {
  x: number;
  y: number;
};

export interface RoverInput {
  starting: Position;
  commands: Command[];
}

export interface ParsedInput {
  grid: Grid;
  rovers: RoverInput[];
}

export type CouldBeError<T> = T | Error;

export const isValid = <T>(result: CouldBeError<T>): result is T => {
  return !isError(result);
};

export const isError = <T>(result: CouldBeError<T>): result is Error => {
  return result instanceof Error;
};

export const isAllValid = <T>(
  couldBeErrors: CouldBeError<T>[]
): couldBeErrors is T[] => {
  return !couldBeErrors.some((c) => c instanceof Error);
};

import { Command, Compass, Grid, ParsedInput, Position } from "./types";

export const calculateNewPositions = (parsedInput: ParsedInput): Position[] => {
  return parsedInput.rovers.map((r) => {
    return r.commands.reduce<Position>((position, command) => {
      if (position.outOfBound) return position;
      return applyCommand(command, position, parsedInput.grid);
    }, r.starting);
  });
};

const updateOrientation = (starting: Compass, command: Command): Compass => {
  if (command === Command.F) return starting;
  if (command === Command.L) {
    switch (starting) {
      case Compass.N:
        return Compass.W;
      case Compass.E:
        return Compass.N;
      case Compass.S:
        return Compass.E;
      case Compass.W:
        return Compass.S;
    }
  }
  switch (starting) {
    case Compass.N:
      return Compass.E;
    case Compass.E:
      return Compass.S;
    case Compass.S:
      return Compass.W;
    case Compass.W:
      return Compass.N;
  }
};

const moveForward = (starting: Position): Position => {
  switch (starting.orientation) {
    case Compass.E:
      return { ...starting, x: starting.x + 1 };
    case Compass.N:
      return { ...starting, y: starting.y + 1 };
    case Compass.S:
      return { ...starting, y: starting.y - 1 };
    case Compass.W:
      return { ...starting, x: starting.x - 1 };
  }
};
const applyCommand = (
  command: Command,
  starting: Position,
  grid: Grid
): Position => {
  const withUpdatedOrientation = {
    ...starting,
    orientation: updateOrientation(starting.orientation, command),
  };
  if (command === Command.F) {
    const newPosition = moveForward(withUpdatedOrientation);
    if (
      newPosition.x > grid.x ||
      newPosition.x < 0 ||
      newPosition.y > grid.y ||
      newPosition.y < 0
    ) {
      return { ...starting, outOfBound: true };
    }
    return newPosition;
  }
  return withUpdatedOrientation;
};

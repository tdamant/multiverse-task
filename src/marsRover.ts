import {parseInput} from "./parseInput";
import {calculateNewPositions} from "./calculateNewPosistions";

export const marsRover = (input: string): string => {
  const parsedInput = parseInput(input);
  if (parsedInput) {
    const newPositions = calculateNewPositions(parsedInput);
    return newPositions
      .map((p) => {
        return `(${p.x}, ${p.y}, ${p.orientation})${
          p.outOfBound ? " LOST" : ""
        }`;
      })
      .join("\n");
  }

  return "invalid input";
};




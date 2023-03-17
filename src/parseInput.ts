import {
    Command,
    Compass,
    Coordinates,
    CouldBeError,
    Grid,
    isAllValid,
    isError,
    isValid,
    ParsedInput,
    RoverInput
} from "./types";


const invalidInputError = new TypeError("Invalid input");
const getGrid = (gridStr: string): CouldBeError<Grid> => {
    const lengths = gridStr
        .split(" ")
        .map((str) => parseInt(str))
        .filter((n) => n > 0);
    if (lengths.length !== 2) return invalidInputError;
    return { x: lengths[0], y: lengths[1] };
};

const getCompassFromString = (str: string): CouldBeError<Compass> => {
    return str in Compass
        ? Compass[str as keyof typeof Compass]
        : invalidInputError;
};

const getStartingCoords = (
    coordinatesString: [string, string]
): CouldBeError<Coordinates> => {
    const parsed = coordinatesString.map((s) => parseInt(s));
    if (parsed.some((i) => i < 0 || isNaN(i))) return invalidInputError;
    return parsed.reduce<Coordinates>((acc, curr, ind) => {
        ind === 0 ? acc.x = curr : acc.y = curr
        return acc
    }, {} as Coordinates);
};

const getRover = (roverString: string): CouldBeError<RoverInput> => {
    const [startingPositionString, commandString] = roverString.split(")");
    const [xString, yString, positionString] = startingPositionString
        .replace("(", "")
        .split(",");
    if([xString, yString, positionString].some(a => a === undefined)) {
        return invalidInputError
    }
    const commands = commandString
        .replace(" ", "")
        .split("")
        .map((commandString) => {
            return Command[commandString as keyof typeof Command];
        });

    const startingCoords = getStartingCoords([xString, yString]);

    const startingOrientation = getCompassFromString(positionString.trim())

    if (isError(startingCoords)) return invalidInputError;
    if (isError(startingOrientation)) return invalidInputError
    return {
        starting: {
            ...startingCoords,
            orientation: startingOrientation,
            outOfBound: false
        },
        commands,
    };
};

function getRovers(roversStrings: string[]): CouldBeError<RoverInput>[] {
    return roversStrings.map(getRover);
}

export const parseInput = (input: string): ParsedInput | void => {
    const [gridString, ...roversStrings] = input.split("\n");
    const grid = getGrid(gridString);
    const rovers = getRovers(roversStrings);
    if (isValid(grid) && isAllValid(rovers)) {
        return { grid, rovers };
    }
    throw invalidInputError;
};

import {expect} from "chai";
import {parseInput} from "../../src/parseInput";
import {Command, Compass} from "../../src/types";

describe("parseInput", () => {
  describe("invalid input", () => {
    // with more time I would want to add more validation testing (ie that all movement commands are valid etc)
    it("rejects grids without x and y sizes", () => {
      const onlyXGridInput = "4\n" + "(2, 3, E) LFRFF";
      expect(() => parseInput(onlyXGridInput)).to.throw(
        TypeError,
        "Invalid input"
      );
    });
    it("rejects starting positions without an an orientation", () => {
      const noOrientationInput = "4 9\n" + "(2, 3) LFRFF";
      expect(() => parseInput(noOrientationInput)).to.throw(
        TypeError,
        "Invalid input"
      );
    });
    it("rejects starting positions with an invalid orientation", () => {
      const invalidOrientationInput = "4 9\n" + "(2, 3, Z) LFRFF";
      expect(() => parseInput(invalidOrientationInput)).to.throw(
        TypeError,
        "Invalid input"
      );
    });
    it("rejects starting positions without an a y position", () => {
      const noYPositionInput = "4 9\n" + "(2, N) LFRFF";
      expect(() => parseInput(noYPositionInput)).to.throw(
        TypeError,
        "Invalid input"
      );
    });
  });
  describe("valid input", () => {
    describe("input for one rover", () => {
      it("returns a grid and a rover", () => {
        const input = "4 8\n" + "(2, 3, E) LFRFF";
        const parsedInput = parseInput(input);
        expect(parsedInput).to.eql({
          grid: { x: 4, y: 8 },
          rovers: [
            {
              starting: { x: 2, y: 3, orientation: Compass.E, outOfBound: false },
              commands: [Command.L, Command.F, Command.R, Command.F, Command.F],
            },
          ],
        });
      });
    });
  });
});

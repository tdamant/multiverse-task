import { expect } from "chai";
import { marsRover } from "../src/marsRover";

describe("mars rover", () => {
  it("moves robots around mars", () => {
    const input = "4 8\n" + "(2, 3, E) LFRFF\n" + "(0, 2, N) FFLFRFF";
    const output = marsRover(input);

    expect(output).to.eql("(4, 4, E)\n" + "(0, 4, W) LOST");
  });
  it("handles different inputs", () => {
    const input = "4 8\n" + "(2, 3, N) FLLFR\n" + "(1, 0, S) FFRLF";
    const output = marsRover(input);

    expect(output).to.eql("(2, 3, W)\n" + "(1, 0, S) LOST");
  });
});

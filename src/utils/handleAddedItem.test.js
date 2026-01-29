import {it,describe,expect} from "vitest"
import { AddItemToArray } from "./handleAddedItem";
describe("addItemToArray (prepend)", () => {
  it("should add item to the beginning of the array", () => {
    const initial = ["old1", "old2"];
    const result = AddItemToArray(initial, "new");
    expect(result).toEqual(["new", "old1", "old2"]);
  });
  it("should keep original array unchanged", () => {
    const initial = ["a"];
    const result = AddItemToArray(initial, "b");
    expect(initial).toEqual(["a"]);
    expect(result).not.toBe(initial);
  });
});
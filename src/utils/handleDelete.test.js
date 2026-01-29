import { describe, expect, it } from "vitest";
import { handleDelete } from "./handleDelete";

describe("handleDelete", () => {
  it("removes the item at the given index", () => {
    const initial = ["Code", "Wash", "Iron", "Eat"];
    const result = handleDelete(1, initial);
    expect(result).toEqual(["Code", "Iron", "Eat"]);
  });
  it("removes the item at the last index", () => {
    const initial = ["Code", "Wash", "Iron", "Eat"];
    const result = handleDelete(initial.length - 1, initial);
    expect(result).toEqual(["Code", "Wash", "Iron"]);
  });
});

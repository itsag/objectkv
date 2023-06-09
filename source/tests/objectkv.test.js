// npx jest ./source/tests/objectkv.test.js

const { createStore } = require("../objectkv");

describe("createStore", () => {
  let dummyStore;

  beforeEach(() => {
    dummyStore = createStore();

    dummyStore.add("key1", "value1");
    dummyStore.add("key2", "value2");
    dummyStore.add("key3", "value3");
    dummyStore.add("key4", "value4");
  });

  describe("find", () => {
    const expectedOutput = "value1";

    it("should find and return the item that matches the given key", () => {
      expect(dummyStore.find("key1")).toEqual(expectedOutput);
    });

    it("should return undefined for keys that dont exist", () => {
      expect(dummyStore.find("aNonExistentKey")).toBeUndefined();
    });
  });

  describe("add", () => {
    const expectedOutput = "value0";

    it("should add an item to the store with the given key", () => {
      dummyStore.add("key0", expectedOutput);

      expect(dummyStore.find("key0")).toEqual(expectedOutput);
    });
  });

  describe("remove", () => {
    it("should remove the item that matches the given key", () => {
      dummyStore.remove("key1");

      expect(dummyStore.find("key1")).toBeUndefined();
    });
  });
});

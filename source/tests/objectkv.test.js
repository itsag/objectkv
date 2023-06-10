// npx jest ./source/tests/objectkv.test.js

const { createStore } = require("../objectkv");

describe("createStore", () => {
  let dummyStore;

  beforeEach(() => {
    dummyStore = createStore();

    dummyStore.set("key1", "value1");
    dummyStore.set("key2", "value2");
    dummyStore.set("key3", "value3");
    dummyStore.set("key4", "value4");
  });

  describe("get", () => {
    const expectedOutput = "value1";

    it("should find and return the item that matches the given key", () => {
      expect(dummyStore.get("key1")).toEqual(expectedOutput);
    });
  });

  describe("set", () => {
    const expectedOutput = "value0";

    it("should add an item to the store with the given key", () => {
      dummyStore.set("key0", expectedOutput);

      expect(dummyStore.get("key0")).toEqual(expectedOutput);
    });
  });

  describe("del", () => {
    it("should remove the item that matches the given key", () => {
      const result = dummyStore.del("key1");

      expect(result).toBeTruthy();

      expect(dummyStore.get("key1")).toBeUndefined();
    });
  });

  describe("clear", () => {
    it("should remove all the items from the store", () => {
      dummyStore.clear();

      expect(dummyStore.get("key1")).toBeUndefined();
      expect(dummyStore.get("key4")).toBeUndefined();
    });
  });

  describe("subscriptions - set", () => {
    it("should run subscriptions on set operation", () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      dummyStore.subscribe(callback1);
      dummyStore.subscribe(callback2);

      dummyStore.set("key0", "value0");

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
    });
  });

  describe("subscriptions - del", () => {
    it("should run subscriptions on del operation", () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      dummyStore.subscribe(callback1);
      dummyStore.subscribe(callback2);

      const result = dummyStore.del("key1");

      expect(result).toBeTruthy();

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
    });
  });

  describe("subscriptions - clear", () => {
    it("should run subscriptions on clear operation", () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      dummyStore.subscribe(callback1);
      dummyStore.subscribe(callback2);

      dummyStore.clear();

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(1);
    });
  });
});

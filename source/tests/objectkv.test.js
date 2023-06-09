// npx jest ./source/tests/objectkv.test.js

const { createStore } = require("../objectkv");

describe("createStore", () => {
  let dummyStore;

  beforeEach(() => {
    dummyStore = createStore();

    dummyStore.addMany([
      { key1: "value1" },
      { key2: "value2" },
      { key3: "value3" },
      { key4: "value4" },
    ]);
  });

  describe("findOne", () => {
    const expectedOutput = "value1";

    it("should find and return the item that matches the given key", () => {
      expect(dummyStore.findOne("key1")).toEqual(expectedOutput);
    });

    it("should return undefined for keys that dont exist", () => {
      expect(dummyStore.findOne("aNonExistentKey")).toBeUndefined();
    });
  });

  describe("findMany", () => {
    const expectedOutput = {
      key1: "value1",
      key2: "value2",
    };

    it("should find multiple items from the store with the given keys and return the key-value pairs", () => {
      expect(dummyStore.findMany(["key1", "key2"])).toEqual(expectedOutput);
    });
  });

  describe("addOne", () => {
    const expectedOutput = "value0";

    it("should add an item to the store with the given key", () => {
      dummyStore.addOne("key0", expectedOutput);

      expect(dummyStore.findOne("key0")).toEqual(expectedOutput);
    });
  });

  describe("addMany", () => {
    it("should add multiple items to the store with the given key-value pairs", () => {
      dummyStore.addMany([
        { user1: "John Doe" },
        { user2: "Selena Miles" },
        { user3: "Jane Davis" },
      ]);

      expect(dummyStore.findOne("user1")).toEqual("John Doe");
      expect(dummyStore.findOne("user2")).toEqual("Selena Miles");
      expect(dummyStore.findOne("user3")).toEqual("Jane Davis");
    });
  });

  describe("remove", () => {
    it("should remove the item that matches the given key", () => {
      dummyStore.remove("key1");

      expect(dummyStore.findOne("key1")).toBeUndefined();
    });
  });

  describe("subscriptions", () => {
    describe("addOne (subscribed)", () => {
      it("should run subscriptions on add operation", () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        dummyStore.subscribe(callback1);
        dummyStore.subscribe(callback2);

        dummyStore.addOne("key0", "value0");

        expect(callback1).toHaveBeenCalledTimes(1);
        expect(callback2).toHaveBeenCalledTimes(1);
      });
    });

    describe("addMany (subscribed)", () => {
      it("should run subscriptions on addMany operation", () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        dummyStore.subscribe(callback1);
        dummyStore.subscribe(callback2);

        dummyStore.addMany([
          { user1: "John Doe" },
          { user2: "Selena Miles" },
          { user3: "Jane Davis" },
        ]);

        expect(callback1).toHaveBeenCalledTimes(1);
        expect(callback2).toHaveBeenCalledTimes(1);
      });
    });

    describe("remove (subscribed)", () => {
      it("should run subscriptions on remove operation", () => {
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        dummyStore.subscribe(callback1);
        dummyStore.subscribe(callback2);

        dummyStore.remove("key1");

        expect(callback1).toHaveBeenCalledTimes(1);
        expect(callback2).toHaveBeenCalledTimes(1);
      });
    });
  });
});

/**
 * @method createStore
 * @description Creates a new datastore.
 */
const createStore = () => {
  // The Store
  const store = {};

  /**
   * @method add
   * @description Adds an item to the store with the given key
   * @param {string} key Name of the item to identify it with
   * @param {any} value The item being stored
   * @example instance.add("name", "John Doe")
   */
  const add = (key, value) => {
    store = { ...store, [key]: value };
  };

  /**
   * @method find
   * @description Finds and returns an item that matches the given key
   * @param {string} key Name of the item to find
   * @example instance.find("name")
   */
  const find = (key) => {
    return store[key];
  };

  /**
   * @method remove
   * @description Remove an item from the store
   * @param {string} key Name of the item to remove
   * @example instance.remove("name")
   */
  const remove = (key) => {
    const keys = Object.keys(store);

    const updatedStore = {};

    keys.forEach((k) => {
      if (k !== key) {
        updatedStore[k] = store[k];
      }
    });

    store = updatedStore;
  };

  return { add, find, remove };
};

// Exports
exports.createStore = createStore;

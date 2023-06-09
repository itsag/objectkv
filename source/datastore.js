/**
 * @method createStore
 * @description Creates a new datastore.
 */
export const createStore = () => {
  // This data store
  let store = {};

  /**
   * @method get
   * @description Gets an item from the store.
   * @param {string} key Name of the item to get
   * @example storeInstance.get("name")
   */
  const get = (key) => {
    return store[key];
  };

  /**
   * @method set
   * @description Set an item in the store.
   * @param {string} key Name of the item to identify it with.
   * @param {any} value The item being stored.
   * @example storeInstance.set("name", "John Doe")
   */
  const set = (key, value) => {
    store[key] = value;

    return store;
  };

  /**
   * @method remove
   * @description Remove an item from the store.
   * @param {string} key Name of the item to remove.
   * @example storeInstance.remove("name")
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

  /**
   * @method empty
   * @description Completely empties the store.
   * @example storeInstance.empty()
   */
  const empty = () => {
    store = {};
  };

  return {
    get,
    set,
    remove,
    empty,
  };
};

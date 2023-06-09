/**
 * @private
 * @method runSubscriptions
 * @description Runs all subscriptions with updatedStore
 * @param {Array<Callbacks>} subscriptions
 * @param {Store} updatedStore
 */
const runSubscriptions = (subscriptions, updatedStore) => {
  subscriptions.map((callback) => {
    return callback(updatedStore);
  });
};

/**
 * @method createStore
 * @description Creates a new store.
 */
const createStore = () => {
  // The Store
  let store = {};

  // Subscriptions
  const subscriptions = [];

  /**
   * @method subscribe
   * @description Subscribes to the store and executes the callback function whenever the store is updated.
   * @param {Function} callback
   * @example
   * instance.subscribe((updatedStore) => {
   *   console.log(updatedStore)
   * })
   */
  const subscribe = (callback) => {
    subscriptions.push(callback);
  };

  /**
   * @method add
   * @description Adds an item to the store with the given key
   * @param {string} key Name of the item to identify it with
   * @param {any} value The item being stored
   * @example
   * instance.add("name", "John Doe")
   */
  const add = (key, value) => {
    store[key] = value;

    runSubscriptions(subscriptions, store);
  };

  /**
   * @method find
   * @description Finds and returns an item that matches the given key
   * @param {string} key Name of the item to find
   * @example
   * instance.find("name")
   */
  const find = (key) => {
    return store[key];
  };

  /**
   * @method remove
   * @description Remove an item from the store
   * @param {string} key Name of the item to remove
   * @example
   * instance.remove("name")
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

    runSubscriptions(subscriptions, store);
  };

  return { add, find, remove, subscribe };
};

// Exports
exports.createStore = createStore;

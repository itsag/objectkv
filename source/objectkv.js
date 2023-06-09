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
  const store = {};

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
   * @method addOne
   * @description Adds an item to the store with the given key
   * @param {string} key Name of the item to identify it with
   * @param {any} value The item being stored
   * @example
   * instance.addOne("name", "John Doe")
   */
  const addOne = (key, value) => {
    store[key] = value;

    runSubscriptions(subscriptions, store);
  };

  /**
   * @method addMany
   * @description Adds multiple items to the store with the given key-value pairs
   * @param {Array<{key: value}>} keyValuePairs Array of key value pairs
   * @example
   * instance.addMany([
   *   { user1: "John Doe" },
   *   { user2: "Selena Miles" },
   *   { user3: "Jane Davis" }
   * ])
   */
  const addMany = (keyValuePairs) => {
    keyValuePairs.forEach((kv) => {
      const [key] = Object.keys(kv);

      store[key] = kv[key];
    });

    runSubscriptions(subscriptions, store);
  };

  /**
   * @method findOne
   * @description Finds and returns an item that matches the given key
   * @param {string} key Name of the item to find
   * @example
   * instance.findOne("name")
   */
  const findOne = (key) => {
    return store[key];
  };

  /**
   * @method findMany
   * @description Finds multiple items from the store with the given keys and returns the key-value pairs
   * @param {Array<string>} keys Names of the items to find
   * @example
   * instance.findMany(["user1", "user2", "user3"])
   */
  const findMany = (keys) => {
    const result = {};

    keys.forEach((k) => {
      result[k] = store[k];
    });

    return result;
  };

  /**
   * @method removeOne
   * @description Remove an item from the store
   * @param {string} key Name of the item to remove
   * @example
   * instance.removeOne("name")
   */
  const removeOne = (key) => {
    delete store[key];

    runSubscriptions(subscriptions, store);
  };

  /**
   * @method removeMany
   * @description Removes multiple items from the store with the given keys
   * @param {string} key Name of the item to remove
   * @example
   * instance.removeMany(["user1", "user2"])
   */
  const removeMany = (keys) => {
    keys.forEach((k) => {
      delete store[k];
    });

    runSubscriptions(subscriptions, store);
  };

  return {
    addOne,
    addMany,
    findOne,
    findMany,
    removeOne,
    removeMany,
    subscribe,
  };
};

// Exports
exports.createStore = createStore;

/**
 * @private
 * @method runSubscriptions
 * @description Runs all subscriptions with updatedStore
 * @param {Array<Callbacks>} subscriptions
 * @param {Store} updatedStore
 */
const runSubscriptions = (subscriptions, updatedStore) => {
  subscriptions.forEach((callback) => {
    callback(updatedStore);
  });
};

/**
 * @method createStore
 * @description Creates a new store.
 */
const createStore = () => {
  // The Store
  const store = new Map();

  // Subscriptions
  const subscriptions = new Array();

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
   * @method set
   * @description Sets the value for a given key in the store.
   * @param {string} key Name of the item to identify it with.
   * @param {any} value The item being stored.
   * @example
   * instance.set("name", "John Doe");
   */
  const set = (key, value) => {
    store.set(key, value);

    runSubscriptions(subscriptions, store);
  };

  /**
   * @method get
   * @description Retrieves the value associated with a given key from the store.
   * @param {string} key Name of the item to find.
   * @returns {any} The value associated with the key, or undefined if the key doesn't exist.
   * @example
   * const name = instance.get("name");
   */
  const get = (key) => {
    return store.get(key);
  };

  /**
   * @method del
   * @description Removes an item from the store based on the given key.
   * @param {string} key Name of the item to remove.
   * @returns {boolean} True if the item was removed, false if the key doesn't exist.
   * @example
   * const removed = instance.del("name");
   */
  const del = (key) => {
    const result = store.delete(key);

    if (result) {
      runSubscriptions(subscriptions, store);
    }

    return result;
  };

  /**
   * @method clear
   * @description Empties the store
   * @example
   * instance.clear();
   */
  const clear = () => {
    store.clear();

    runSubscriptions(subscriptions, store);
  };

  return {
    subscribe,
    set,
    get,
    del,
    clear,
  };
};

// Exports
exports.createStore = createStore;

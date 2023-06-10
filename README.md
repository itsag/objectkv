# ObjectKV

**A lightweight in-memory key-value database for javascript.**

The ObjectKV is a simple and lightweight in-memory key-value database with subscription capabilities. It allows you to store and retrieve data while notifying subscribed functions whenever the store is updated.

## Installation

ObjectKV can be installed using npm or yarn:

```sh
# Install with NPM
npm install objectkv

# Install with Yarn
yarn add objectkv
```

## Usage

Import the `createStore` function from the module:

```js
import { createStore } from "objectkv";
```

### Creating a Store

To create a new store, invoke the createStore function:

```js
const store = createStore();
```

### Subscribing to Store Updates

To subscribe to the store and execute a callback function whenever the store is updated, use the subscribe method:

```js
const callback = (updatedStore) => {
  // Do something with the updated store
};

store.subscribe(callback);
```

### Setting Values in the Store

To set the value for a given key in the store, use the set method:

```js
store.set("key", "value");
```

### Retrieving Values from the Store

To retrieve the value associated with a given key from the store, use the get method:

```js
const value = store.get("key");
```

The get method returns the value associated with the key or undefined if the key doesn't exist in the store.

### Removing Items from the Store

To remove an item from the store based on the given key, use the del method:

```js
const removed = store.del("key");
```

The del method returns true if the item was removed successfully, or false if the key doesn't exist in the store.

### Clearing the Store

To remove all items from the store, use the clear method:

```js
store.clear();
```

#### Example

Here's an example that demonstrates the basic usage of the ObjectKV:

```js
import { createStore } from "objectkv";

const store = createStore();

const callback = (updatedStore) => {
  console.log("Store updated:", updatedStore);
};

store.subscribe(callback);

store.set("name", "John Doe");
store.set("age", 25);

const name = store.get("name");
console.log("Name:", name);

store.del("age");

store.clear();
```

Output:

```js
Store updated: Map { 'name' => 'John Doe' }
Store updated: Map { 'name' => 'John Doe', 'age' => 25 }
Name: John Doe
Store updated: Map { 'name' => 'John Doe' }
Store updated: Map {}
```

## Contributing

Contributions to ObjectKV are always welcome! If you find a bug or want to suggest an improvement, please open an issue or submit a pull request to the repository: [https://github.com/itsag/objectkv](https://github.com/itsag/objectkv)

## License

This project is licensed under the MIT License.

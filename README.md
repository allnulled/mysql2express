# mysql2express

Generate REST models and controllers automatically for Express web applications from a MySQL database

## Installation

`$ npm i -g mysql2express`

## Package usage

You can use any interface: `CLI` or `API`. The same example will be shown in both modes.

### Package usage from CLI

```
mysql2express
  --user      my_user
  --password  my_password
  --database  my_database
  --host      localhost
  --port      3306
  --output    my_directory
```

### Package usage from API

```
require("mysql2express")({
    user:      "my_user",
    password:  "my_password",
    database:  "my_database",
    host:      "localhost",
    port:      3306,
    output:    process.cwd() + "/my_directory"
}).then(() => ...).catch(error => ...);
```


## Generated sources usage

The generated files will be your tools to accelerate the process of a *REST API* development targeting:

  - `mysql` databases
  - `node.js`/`express` applications.


### The models

The **models** have nothing to do with `express`.

They are independent resources that can be overcharged.

This way, you can customize the behaviour of their *CRUD* operations on a `mysql` database.

However, they work standalone, and you do not need to code anything else to start working from `node.js` applications.


#### How to use a model

1. Import and instantiate the model you want.

```js
const User = require("./my_directory/models/UserModel.js");
const user = User.create({...}); // use parameters to override default values of the instance
```

2. Do any CRUD operation, or retrieve the schema of the model.

2.1. Get the schema:

```js
const userSchema = user.schema();
console.log(userSchema);
```

2.2. Retrieve many items:

```js
user.getAll({
    where:      [["id", "<", 10],["id", ">", 0]],
    order:      [["id", "desc"],["name", "desc"]],
    fields:     ["id", "name"],
    page:       0,
    quantity:   2,
    search:     "Text that must appear in any (selectable) field"
}).then(output => {
    const { data, totalOfItems } = output;
    console.log("Data:", data);
    console.log("Total of items to paginate:", totalOfItems);
}).catch(error => {
    console.log("There were errors:", error);
});
```

2.3. Retrieve one item by id:

```js
user.getOne(10/*, ["id", "name"]*/).then(output => {
    const { data } = output;
    console.log("Item (or null):", item);
}).catch(handler);
```

2.4. Create one new item:

```js
user.postOne({ name: "username" }/*, ["name"]*/).then(output => {
    const { id } = output;
    console.log("New item with id:", id);
}).catch(handler);
```

2.5. Update one item:

```js
user.putOne(11, { name: "custom username" }/*, ["name"]*/).then(output => {
    const { changedItems } = output;
    console.log("Items changed:", changedItems);
}).catch(handler);
```

2.6. Delete one item:

```js
user.deleteOne(11).then(output => {
    const { deletedItems } = output;
    console.log("Items deleted:", deletedItems);
}).catch(handler);
```

### The controllers

The **controllers** are related to `express`.

They are dependent resources that can be overcharged, just like the *models* previously explained.

This way, you can customize the behaviour of their *CRUD* operations on an `express` application.

However, they work standalone, and you do not need to code anything else to start working from `express` web applications.

#### How to use a controller

This is an example of how one can use a controller in an `express` application:

```js
const express = require("express");
const app = express();
const UserController = require("./my_directory/controllers/UserController.js");

app.use("/api/v1/user", UserController.create({...}).serve());
```

### Customization

To see the options, you can:
   - navigate the documentation
   - inspect the classes `models/Model.js` and `controllers/Controller.js`.

### List of generated sources

```
/{rest-directory}
  /schema.json             (1)
  /getConnection.js        (2)
  /controllers             
    /Controller.js         (3)
    /{Table}Controller.js  (4)
  /models
    /Model.js              (5)
    /{Table}Model.js       (6)
```

#### **(1)** `schema.json`

JSON file containing a general definition of the database.

#### **(2)** `getConnection.js`

JavaScript module that exports a `Promise` which returns the database connection
used by the models.

#### **(3)** `Controller.js`

JavaScript module that exports the class which every controller extends.

#### **(4)** `{Table}Controller.js`

JavaScript modules that export a different controller per each database table.

#### **(5)** `Model.js`

JavaScript module that exports the class which every model extends.

#### **(6)** `{Table}Model.js`

JavaScript modules that export a different model per each database table.

## License

This project is licensed under [WTFPL](https://es.wikipedia.org/wiki/WTFPL) or *What The Fuck Public License*, which basically means: **do whatever you want with it**.
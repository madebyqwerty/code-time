migrate((db) => {
  const collection = new Collection({
    "id": "6drh6seim39beb8",
    "created": "2023-01-24 18:34:21.830Z",
    "updated": "2023-01-24 18:34:21.830Z",
    "name": "managers",
    "type": "auth",
    "system": false,
    "schema": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "allowEmailAuth": true,
      "allowOAuth2Auth": false,
      "allowUsernameAuth": true,
      "exceptEmailDomains": [],
      "manageRule": null,
      "minPasswordLength": 12,
      "onlyEmailDomains": [],
      "requireEmail": false
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6drh6seim39beb8");

  return dao.deleteCollection(collection);
})

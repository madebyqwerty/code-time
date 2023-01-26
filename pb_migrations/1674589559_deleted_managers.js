migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("6drh6seim39beb8");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "6drh6seim39beb8",
    "created": "2023-01-24 18:34:21.830Z",
    "updated": "2023-01-24 18:47:13.092Z",
    "name": "managers",
    "type": "auth",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "km4h9w2i",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": "id = @request.auth.id",
    "viewRule": "id = @request.auth.id",
    "createRule": "",
    "updateRule": "id = @request.auth.id",
    "deleteRule": "id = @request.auth.id",
    "options": {
      "allowEmailAuth": true,
      "allowOAuth2Auth": false,
      "allowUsernameAuth": false,
      "exceptEmailDomains": [],
      "manageRule": null,
      "minPasswordLength": 12,
      "onlyEmailDomains": [],
      "requireEmail": true
    }
  });

  return Dao(db).saveCollection(collection);
})

migrate((db) => {
  const collection = new Collection({
    "id": "jxen6ns16o2rsvj",
    "created": "2023-01-07 14:22:31.929Z",
    "updated": "2023-01-07 14:22:31.929Z",
    "name": "tags",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "jf0uurwx",
        "name": "name",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "1bkcd7ox",
        "name": "color",
        "type": "text",
        "required": true,
        "unique": false,
        "options": {
          "min": 7,
          "max": 7,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "nrhx9l9j",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("jxen6ns16o2rsvj");

  return dao.deleteCollection(collection);
})

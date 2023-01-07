migrate((db) => {
  const collection = new Collection({
    "id": "6loxvjadrgj32ao",
    "created": "2023-01-07 14:22:51.775Z",
    "updated": "2023-01-07 14:22:51.775Z",
    "name": "records",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ohxyl2if",
        "name": "date",
        "type": "date",
        "required": true,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
        }
      },
      {
        "system": false,
        "id": "p8mdsjtx",
        "name": "length",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": null,
          "max": null
        }
      },
      {
        "system": false,
        "id": "lzk2t7xg",
        "name": "user_id",
        "type": "relation",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": true
        }
      },
      {
        "system": false,
        "id": "pivu3e9v",
        "name": "language",
        "type": "select",
        "required": true,
        "unique": false,
        "options": {
          "maxSelect": 5,
          "values": [
            "javascript",
            "typescript",
            "python",
            "svelte",
            "html"
          ]
        }
      },
      {
        "system": false,
        "id": "zazgccdy",
        "name": "rating",
        "type": "number",
        "required": true,
        "unique": false,
        "options": {
          "min": 1,
          "max": 5
        }
      },
      {
        "system": false,
        "id": "djuufzrw",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "wlhymfs4",
        "name": "tags",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 10,
          "collectionId": "jxen6ns16o2rsvj",
          "cascadeDelete": false
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
  const collection = dao.findCollectionByNameOrId("6loxvjadrgj32ao");

  return dao.deleteCollection(collection);
})

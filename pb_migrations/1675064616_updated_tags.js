migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jxen6ns16o2rsvj")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z9ka1nar",
    "name": "user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jxen6ns16o2rsvj")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z9ka1nar",
    "name": "user",
    "type": "relation",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false
    }
  }))

  return dao.saveCollection(collection)
})

migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6drh6seim39beb8")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6drh6seim39beb8")

  // remove
  collection.schema.removeField("km4h9w2i")

  return dao.saveCollection(collection)
})

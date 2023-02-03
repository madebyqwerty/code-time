migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6loxvjadrgj32ao")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "p8mdsjtx",
    "name": "length",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": 0,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6loxvjadrgj32ao")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})

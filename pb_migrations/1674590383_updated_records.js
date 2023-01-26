migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6loxvjadrgj32ao")

  collection.listRule = "@request.auth.id != \"\" && @request.auth.id = user_id.id || @request.auth.id = user_id.manager.id"
  collection.viewRule = "@request.auth.id != \"\" && @request.auth.id = user_id.id || @request.auth.id = user_id.manager.id"
  collection.createRule = "@request.auth.id != \"\" && @request.auth.id = user_id.id || @request.auth.id = user_id.manager.id"
  collection.updateRule = "@request.auth.id != \"\" && @request.auth.id = user_id.id|| @request.auth.id = user_id.manager.id"
  collection.deleteRule = "@request.auth.id != \"\" && @request.auth.id = user_id.id|| @request.auth.id = user_id.manager.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6loxvjadrgj32ao")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})

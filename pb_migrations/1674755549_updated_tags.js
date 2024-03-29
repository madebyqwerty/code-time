migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jxen6ns16o2rsvj")

  collection.listRule = "@request.auth.id != \"\" && (@request.auth.id = user.id || @request.auth.id = user.manager.id)"
  collection.viewRule = "@request.auth.id != \"\" &&(@request.auth.id = user.id || @request.auth.id = user.manager.id)"
  collection.createRule = "@request.auth.id != \"\" && (@request.auth.id = user.id || @request.auth.id = user.manager.id)"
  collection.updateRule = "@request.auth.id != \"\" && (@request.auth.id = user.id || @request.auth.id = user.manager.id)"
  collection.deleteRule = "@request.auth.id != \"\" && (@request.auth.id = user.id || @request.auth.id = user.manager.id)"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jxen6ns16o2rsvj")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})

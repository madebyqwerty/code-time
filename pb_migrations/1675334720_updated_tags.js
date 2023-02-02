migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jxen6ns16o2rsvj")

  collection.createRule = "@request.auth.id != \"\" && @request.auth.id = user.id"
  collection.updateRule = "@request.auth.id != \"\" && @request.auth.id = user.id "

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jxen6ns16o2rsvj")

  collection.createRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})

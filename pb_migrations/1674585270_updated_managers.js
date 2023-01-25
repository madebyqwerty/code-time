migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6drh6seim39beb8")

  collection.options = {
    "allowEmailAuth": true,
    "allowOAuth2Auth": false,
    "allowUsernameAuth": false,
    "exceptEmailDomains": [],
    "manageRule": null,
    "minPasswordLength": 12,
    "onlyEmailDomains": [],
    "requireEmail": true
  }

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6drh6seim39beb8")

  collection.options = {
    "allowEmailAuth": true,
    "allowOAuth2Auth": false,
    "allowUsernameAuth": true,
    "exceptEmailDomains": [],
    "manageRule": null,
    "minPasswordLength": 12,
    "onlyEmailDomains": [],
    "requireEmail": false
  }

  return dao.saveCollection(collection)
})

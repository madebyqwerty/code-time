migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6loxvjadrgj32ao")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pivu3e9v",
    "name": "language",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 36,
      "values": [
        "java",
        "cpp",
        "python",
        "javascript",
        "csharp",
        "php",
        "ruby",
        "perl",
        "swift",
        "golang",
        "kotlin",
        "scala",
        "rlang",
        "bash",
        "rust",
        "objectivec",
        "react",
        "angular",
        "vue",
        "ember",
        "svelte",
        "clang",
        "cobol",
        "fortran",
        "lisp",
        "pascal",
        "sql",
        "typescript",
        "elixir",
        "erlang",
        "julia",
        "haskell",
        "clojure",
        "ocaml",
        "fsharp",
        "webassembly"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("6loxvjadrgj32ao")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pivu3e9v",
    "name": "language",
    "type": "select",
    "required": true,
    "unique": false,
    "options": {
      "maxSelect": 36,
      "values": [
        "java",
        "cpp",
        "python",
        "javascript",
        "csharp",
        "php",
        "ruby",
        "perl",
        "swift",
        "go",
        "kotlin",
        "scala",
        "r",
        "bash",
        "rust",
        "objectivec",
        "react",
        "angular",
        "vue",
        "ember",
        "svelte",
        "c",
        "cobol",
        "fortran",
        "lisp",
        "pascal",
        "sql",
        "typescript",
        "elixir",
        "erlang",
        "julia",
        "haskell",
        "clojure",
        "ocaml",
        "fsharp",
        "webassembly"
      ]
    }
  }))

  return dao.saveCollection(collection)
})

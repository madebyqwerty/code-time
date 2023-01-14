/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Records = "records",
	Tags = "tags",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string

// System fields
export type BaseSystemFields = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: { [key: string]: any }
}

export type AuthSystemFields = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields

// Record types for each collection

export enum RecordsLanguageOptions {
	"java" = "java",
	"cpp" = "cpp",
	"python" = "python",
	"javascript" = "javascript",
	"csharp" = "csharp",
	"php" = "php",
	"ruby" = "ruby",
	"perl" = "perl",
	"swift" = "swift",
	"go" = "go",
	"kotlin" = "kotlin",
	"scala" = "scala",
	"r" = "r",
	"bash" = "bash",
	"rust" = "rust",
	"objectivec" = "objectivec",
	"react" = "react",
	"angular" = "angular",
	"vue" = "vue",
	"ember" = "ember",
	"svelte" = "svelte",
	"c" = "c",
	"cobol" = "cobol",
	"fortran" = "fortran",
	"lisp" = "lisp",
	"pascal" = "pascal",
	"sql" = "sql",
	"typescript" = "typescript",
	"elixir" = "elixir",
	"erlang" = "erlang",
	"julia" = "julia",
	"haskell" = "haskell",
	"clojure" = "clojure",
	"ocaml" = "ocaml",
	"fsharp" = "fsharp",
	"webassembly" = "webassembly",
}
export type RecordsRecord = {
	date: IsoDateString
	length: number
	user_id: RecordIdString
	language: RecordsLanguageOptions[]
	rating: number
	description?: string
	tags?: RecordIdString
}

export type TagsRecord = {
	name: string
	color: string
	description?: string
	user: RecordIdString
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

// Response types include system fields and match responses from the PocketBase API
export type RecordsResponse = RecordsRecord & BaseSystemFields
export type TagsResponse = TagsRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields

export type CollectionRecords = {
	records: RecordsRecord
	tags: TagsRecord
	users: UsersRecord
}
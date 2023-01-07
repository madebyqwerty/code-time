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
	"Java" = "Java",
	"C++" = "C++",
	"Python" = "Python",
	"JavaScript" = "JavaScript",
	"C#" = "C#",
	"PHP" = "PHP",
	"Ruby" = "Ruby",
	"Perl" = "Perl",
	"Swift" = "Swift",
	"Go" = "Go",
	"Kotlin" = "Kotlin",
	"Scala" = "Scala",
	"R" = "R",
	"Bash" = "Bash",
	"Rust" = "Rust",
	"Objective-C" = "Objective-C",
	"React" = "React",
	"Angular" = "Angular",
	"Vue" = "Vue",
	"Ember" = "Ember",
	"Svelte" = "Svelte",
	"C" = "C",
	"Cobol" = "Cobol",
	"Fortran" = "Fortran",
	"Lisp" = "Lisp",
	"Pascal" = "Pascal",
	"SQL" = "SQL",
	"TypeScript" = "TypeScript",
	"Elixir" = "Elixir",
	"Erlang" = "Erlang",
	"Julia" = "Julia",
	"Haskell" = "Haskell",
	"Clojure" = "Clojure",
	"OCaml" = "OCaml",
	"F#" = "F#",
	"WebAssembly" = "WebAssembly",
}
export type RecordsRecord = {
	date: IsoDateString
	length: number
	user_id: RecordIdString
	language: RecordsLanguageOptions[]
	rating: number
	description?: string
	tags?: RecordIdString[]
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
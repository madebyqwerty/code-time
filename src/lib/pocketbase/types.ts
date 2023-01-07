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
	"javascript" = "javascript",
	"typescript" = "typescript",
	"python" = "python",
	"svelte" = "svelte",
	"html" = "html",
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
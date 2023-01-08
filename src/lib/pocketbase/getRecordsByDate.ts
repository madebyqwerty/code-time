
import { pb } from "."

const EMAIL = "login@vaclavparma.cz"
const PASSWORD = "PocketBase"

export async function getRecordsByDate(dateStart:Date, dateEnd:Date) {
    const authData = await pb.admins.authWithPassword(EMAIL, PASSWORD)

    const start = dateStart.toISOString().replace("T", " ").replace("Z", "").split(".")[0]
    const end = dateEnd.toISOString().replace("T", " ").replace("Z", "").split(".")[0]

    const resultList = await pb.collection('records').getList(1, 50, {
        filter: `date >= "${start}" && date <= "${end}"`, "$autoCancel": false,
    });

    return resultList.items
}
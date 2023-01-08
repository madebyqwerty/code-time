
import { pb } from "."

export async function dateRecords(date_start:Date, date_end:Date) {
    const authData = await pb.collection('users').authWithPassword('random@mail.cz', 'password');

    const start = date_start.toISOString().replace("T", " ").replace("Z", "").split(".")[0]
    const end = date_end.toISOString().replace("T", " ").replace("Z", "").split(".")[0]

    const resultList = await pb.collection('records').getList(1, 50, {
        filter: `date >= "${start}" && date <= "${end}"`, "$autoCancel": false,
    });

    return resultList.items
}
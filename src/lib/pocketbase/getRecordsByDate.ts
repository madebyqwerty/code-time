import { pb } from "."

/**
 * Tahle funkce vrátí záznamy od dateStart do dateEnd
 *
 * @param  {Date} dateStart Datum kdy programoval
 * @param  {Date} dateEnd Délka v minutách jak dlouho programoval
 */

export async function getRecordsByDate(dateStart:Date, dateEnd:Date) {
    const start = dateStart.toISOString().replace("T", " ").replace("Z", "").split(".")[0]
    const end = dateEnd.toISOString().replace("T", " ").replace("Z", "").split(".")[0]

    const resultList = await pb.collection('records').getList(1, 50, {
        filter: `date >= "${start}" && date <= "${end}"`, "$autoCancel": false,});

    return resultList.items
}
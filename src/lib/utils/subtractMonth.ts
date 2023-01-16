/**
 * Odstraňuje měsíce z data
 *
 * @param  {Date} date Datum od kterého odstarnit měsíce
 * @param  {number} months Kolik měsíců odstranit
 */
export function subtractMonth(date: Date, months: number) {
	date.setMonth(date.getMonth() - months);
	return date;
}

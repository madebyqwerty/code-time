/**
 * Wrapper funkce pro parsování data z URL search paramu
 *
 * @param  {string|null} dateString string ze kterého to vytvoří Date nebo null
 */
export function getDateFromString(dateString: string | null) {
	if (dateString) {
		return new Date(dateString);
	}
	return null;
}

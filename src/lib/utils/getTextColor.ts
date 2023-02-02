export function getTextColor(color: string) {
	const r = parseInt(color.substring(1, 3), 16);
	const g = parseInt(color.substring(3, 5), 16);
	const b = parseInt(color.substring(5, 7), 16);

	const yiq = (r * 299 + g * 587 + b * 114) / 1000;
	console.log(yiq);
	return yiq >= 128 ? '#0e1015' : '#fff';
}
const errorTranslations = new Map<string, string>([
	["The requested resource wasn't found.", 'Nepodařilo se nám najít tento záznam'],
	['Failed to authenticate.', 'Nepodařilo se příhlasit, zkontrolujte email a heslo']
]);

/**
 * Returns the translation for the given error key, or the `orElse` value if no translation is found.
 * @param {string} key - The error key to translate.
 * @param {string} [orElse=key] - The value to return if no translation is found. Defaults to the `key` parameter.
 * @returns {string} The translated error message, or the `orElse` value if no translation is found.
 */
export const getTranslation = (key: string, orElse: string = key) =>
	errorTranslations.has(key) ? errorTranslations.get(key) : orElse;

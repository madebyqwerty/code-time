# Tým QWERTY - Aplikace CodeTime

- Tomáš Kebrle
- Václav Parma
- Daniel Ransdorf

## SQL Injection

Pro backend používáme [Pocketbase](https://pocketbase.io), který má v sobě zabudovaný SQL injection protekci[^1]

## XSS Protekce

Používáme [Svelte](https://svelte.dev), který má v sobě zabudovanou XSS protekci[^2]

[^1]:[https://pocketbase.io/docs/database](https://pocketbase.io/docs/database) Zde je napsátno "allowing you to execute safely various SQL statement (including raw queries)"
[^2]:[https://svelte.dev/docs#template-syntax-html](https://svelte.dev/docs#template-syntax-html) Zde je napsáno, že svelte sanitizuje všechno co nemá `@html` který nikde nepoužívámé.

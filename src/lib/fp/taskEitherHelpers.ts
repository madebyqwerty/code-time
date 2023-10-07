import * as RD from '@devexperts/remote-data-ts';
import * as TE from 'fp-ts/TaskEither';
import { error } from '@sveltejs/kit';
import { flow, identity, pipe } from 'fp-ts/lib/function';
import type { ClientResponseError } from 'pocketbase';
import { getTranslation } from '$lib/pocketbase/translate-error';

export const onLeft =
	<L, R>(f: (err: L) => void) =>
	(te: TE.TaskEither<L, R>) =>
		pipe(
			te,
			TE.mapError(err => f(err))
		);

export const onRight =
	<L, R>(f: (data: R) => void) =>
	(te: TE.TaskEither<L, R>) =>
		pipe(
			te,
			TE.map(data => {
				f(data);
				return data;
			})
		);

export const toTaskEither = <T>(promise: Promise<T>) => TE.tryCatch(() => promise, identity);

/**
 * Wraps a Pocketbase API call in a `TaskEither` and calls SvelteKit's error handler to redirect to the nearest +error page
 * @param {Promise<T>} apiCall - The Pocketbase API call to wrap.
 * @returns {Task<T>} A `Task` that resolves to the result of the API call.
 */
export const safePocketbaseCall = flow(
	toTaskEither,
	TE.getOrElse(err => {
		const {
			data: { code, message }
		} = err as ClientResponseError;
		throw error(code, getTranslation(message));
	})
);

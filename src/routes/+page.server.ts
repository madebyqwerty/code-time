import type { PageServerLoad } from './$types';
import { prisma } from '$lib/prisma';

export const load: PageServerLoad = async () => {
	const posts = await prisma.post.findMany({
		include: {
			author: true
		}
	});

	return { posts };
};

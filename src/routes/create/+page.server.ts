import type { PageServerLoad } from './$types';
import { prisma } from '$lib/prisma';

export const load: PageServerLoad = async () => {
	await prisma.post.create({
		data: {
			title: 'My first post',
			body: 'This is my first post 👋',
			author: {
				connect: {
					id: '6398e68dcad75b9f5f09d060'
				}
			}
		}
	});

	return {};
};

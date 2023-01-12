import type { Language } from '$lib/utils/languages';
import { faker } from '@faker-js/faker/locale/cz';
import { pb, createRecord, login } from '../.';
import { createUser } from "./createUser"
import { createTag } from "../createTag"

/**
 * Tahle funkce zaplní databázi
 *
 * @param  {number} users Počet uživatelů
 * @param  {number} tags Počet tagů
 */

export async function populateDatabase(
	users: number,
    tags: number
) {
	for (let i=0; i < users; i++){
        const email = faker.internet.email();
        const password = faker.internet.password();   
        const userId = await createUser(
            faker.lorem.word({length: { max: 100, min: 80 }}), 
            email, 
            password, 
            faker.name.fullName()
            );
        
        await login(email, password);
        for (let y=0; y < tags; y++){
            const tag = await createTag(
            faker.lorem.word({length: { max: 20, min: 8 }}), 
            faker.color.rgb({ format: 'hex', casing: 'lower' }),
            faker.lorem.words(5),
            userId
            );

            let records = Math.floor(Math.random() * 5) + 1; //random číslo 1-5
            for (let z=0; z < records; z++){
                const hodnoceni = Math.floor(Math.random() * 5) + 1
                await createRecord(
                    faker.date.past(), 
                    faker.random.numeric(2),
                    ['JavaScript', 'Svelte'], 
                    hodnoceni, 
                    faker.lorem.words(10), 
                    [tag]
                )
            }
        }
    await pb.authStore.clear()
    }
}

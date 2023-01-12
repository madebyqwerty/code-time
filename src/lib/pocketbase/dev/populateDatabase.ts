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
        const user = createUser(faker.lorem.word({length: { max: 20, min: 8 }}), email, password, faker.name.fullName())
        //lognout se
        for (let y=0; y < tags; y++){
            //vytvořit tag
            const records = Math.floor(Math.random() * 5) + 1 //random číslo 1-5
            for (let z=0; z < records; z++){
                console.log("Tag")
            }
        }
    }
}

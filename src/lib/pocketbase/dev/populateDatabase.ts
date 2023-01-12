import type { Language } from '$lib/utils/languages';
import { pb } from '../.';

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
        //vytvořit uživatele
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

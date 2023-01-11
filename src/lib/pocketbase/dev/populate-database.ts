import { faker } from '@faker-js/faker/locale/cz';
import { createUser } from '../createUser';
import { createTag } from '../createTag';
import { createRecord } from '../.';

export async function populateDatabase(){
    const users = 3;
    const tags = 3;
    const records = 15;

    for (let i = 0; i < users; i++){
        const user = createUser(
            faker.lorem.word({length: { max: 20, min: 8 }}),
            faker.internet.email(),
            faker.internet.password(),
            faker.name.fullName()
        );

        for (let i = 0; i < tags; i++){
            const tag = createTag(
            faker.lorem.word({length: { max: 20, min: 8 }}),
            faker.color.rgb({ format: 'hex', casing: 'lower' }),
            faker.lorem.words(5),
            user["id"]
            );
        
            for (let i = 0; i < records; i++){
                const rndInt = Math.floor(Math.random() * 5) + 1
                createRecord(
                    faker.date.past(), 
                    faker.random.numeric(2), 
                    ['JavaScript', 'Svelte'], 
                    rndInt, 
                    faker.lorem.words(10), 
                    [tag["id"]]
                )
            }
        }
    }
}
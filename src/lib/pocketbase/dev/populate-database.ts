import { faker } from '@faker-js/faker/locale/cz';
import { pb } from "../.";
import { createRecord } from '../.';

export async function populateDatabase(){
    const users = 3;
    const tags = 3;
    const records = 15;

    for (let i = 0; i < users; i++){
        const password = faker.internet.password();
        const data = {
        "username": faker.lorem.word({length: { max: 20, min: 8 }}),
        "email": faker.internet.email(),
        "emailVisibility": true,
        "password": password,
        "passwordConfirm": password,
        "name": faker.name.fullName()
    };
    const user = await pb.collection('users').create(data, { '$autoCancel': false });

    for (let i = 0; i < tags; i++){
        const data = {
        "name": faker.lorem.word({length: { max: 20, min: 8 }}),
        "color": faker.color.rgb({ format: 'hex', casing: 'lower' }),
        "description": faker.lorem.words(5),
        "user": user["id"]
        };
        
        const tag = await pb.collection('tags').create(data, { "$autoCancel": false });
    
        for (let i = 0; i < records; i++){
            const rndInt = Math.floor(Math.random() * 5) + 1
            createRecord(faker.date.past(), faker.random.numeric(2), ['JavaScript', 'Svelte'], rndInt, faker.lorem.words(10), [tag["id"]]);
    }}
    }
}
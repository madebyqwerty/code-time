import { pb } from '.';

/**
 * Tahle funkce vytváří nový tag
 *
 * @param  {string} name Název tagu
 * @param  {string} color Barva tagu (hex)
 * @param  {string} description Popis tagu
 * @param  {string} userId ID uživatele
 *
 * @returns {Promise<string>} ID vytvořeného tagu
 */

export async function createTag(name: string, color: string): Promise<string> {
	if(name.length>2){
		if(name.length<30){
			if(color.toLowerCase().split("")[0]=="#" && ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"].includes(color.toLowerCase().split("")[1]) && ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"].includes(color.toLowerCase().split("")[2]) &&["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"].includes(color.toLowerCase().split("")[3]) &&["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"].includes(color.toLowerCase().split("")[4]) &&["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"].includes(color.toLowerCase().split("")[5]) &&["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"].includes(color.toLowerCase().split("")[6])){
				const pokus = await pb.collection('tags').getList<TagsResponse>(1, 1000,{
					filter: `name="${name}" && user="${pb.authStore.model?.id}"`,
					$autoCancel: false
				});
				console.log(pokus)
				if(pokus.items.length==0){
					const tag = await pb.collection('tags').create(
						{
							name,
							color,
							description:"",
							user: pb.authStore.model?.id
						},
						{ $autoCancel: false }
					);
					console.log(tag.id)
					return tag.id
				}
			}
			return "wrongcolor"
		}
		return "longname"
		
		
	}
	return "shortname"
	
	
}

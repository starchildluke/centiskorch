import { getCollection } from 'astro:content';

export async function GET({params, request}) {
  const nicknameData = await getCollection('nicknames');
  
  const nicknames = nicknameData.map((data) => {
      return {
        title: data.data.title,
        description: data.data.description,
        id: data.id
      };
    });
  
  return new Response(JSON.stringify({ nicknames })
  )
}


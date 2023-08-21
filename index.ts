import { Variation, QueryResponse } from './types.index';

const createVariation = (evolutionList: QueryResponse): Variation => {
  let returnObj: Variation = { name: evolutionList[0].name, variations: [] };

  while (evolutionList.length > 1) {
    const ev: { name: string } | undefined = evolutionList.shift(); // `ev` is short for `evolution` here.
    if (ev) {
      returnObj.name = ev.name;
      returnObj.variations = [createVariation(evolutionList)];
    }
  }

  return returnObj;
};

export const evolutionChain = (pokemonName: string): Promise<string | Error> => {
  if (!pokemonName) throw new Error('Please enter the name of a Pokémon.');

  const q = `
    query samplePokeAPIquery($pokemonName: String!) {
      pokemon_v2_pokemonspecies(where: { name: { _eq: $pokemonName } }) {
        name
        pokemon_v2_evolutionchain {
          pokemon_v2_pokemonspecies {
            name
          }
        }
      }
    }
  `;

  const qConfig = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: q,
      variables: { pokemonName: pokemonName.toLowerCase() }
    })
  };

  return fetch('https://beta.pokeapi.co/graphql/v1beta', qConfig)
    .then(async (r: Response) => await r.json())
    .then((body: any) => {
      const d: QueryResponse = body.data.pokemon_v2_pokemonspecies[0].pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies;
      const r: Variation = createVariation(d);
      
      return JSON.stringify(r);
    })
    .catch((e: string) => new Error(e));
}
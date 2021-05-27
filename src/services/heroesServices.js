import http from "./httpService";

export async function getHeroById(id) {
  let hero = [];

  hero = await http.get(
    `https://www.superheroapi.com/api.php/10226042967317208/${id}`
  );

  if (hero.data.error) {
    throw new Error(hero.data.error);
  } else return hero.data;
}

export async function getHeroByName(name) {
  let hero = [];

  hero = await http.get(
    `https://www.superheroapi.com/api.php/10226042967317208/search/${name}`
  );
  if (hero.data.error) {
    throw new Error(hero.data.error);
  } else return hero.data.results;
}

import http from "./httpService";

export async function getHeroById(id) {
  let hero = [];

  hero = await http.get(
    `https://www.superheroapi.com/api.php/10226042967317208/${id}`
  );

  return hero.data;
}

export async function getHeroByName(name) {
  let hero = [];

  hero = await http.get(
    `https://www.superheroapi.com/api.php/10226042967317208/search/${name}`
  );

  return hero.data.results;
}

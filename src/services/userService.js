let userTeam = [];

export async function getUserTeam() {
  return userTeam;
}

export async function addHero(hero) {
  userTeam.push(hero);
}

export async function removeHero(hero) {
  const team = userTeam.filter((el) => el.id !== hero.id);
  userTeam = team;
}

let currentHealth = 1000;
let originalHealth = 1000;

export const attackMonster = (damage) => {
  currentHealth -= damage;
}

export const spawnMonster = (health) => {
  currentHealth = health;
  originalHealth = health;
  console.log(`A monster has spawned with ${health} health!`);
  return;
}

export const checkHealth = () => {
  return currentHealth;
}

export const getOriginalHealth = () => {
  return originalHealth;
}

// export default { attackMonster, spawnMonster, checkHealth, getOriginalHealth };
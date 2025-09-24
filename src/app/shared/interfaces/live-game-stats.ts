export interface Ability {
  displayName: string;
  abilityLevel: number;
  id: string;
  rawDescription: string;
  rawDisplayName: string;
}

export interface Abilities {
  Passive: Omit<Ability, "abilityLevel">;
  Q: Ability;
  W: Ability;
  E: Ability;
  R: Ability;
}

export interface ChampionStats {
  abilityHaste: number;
  abilityPower: number;
  armor: number;
  armorPenetrationFlat: number;
  armorPenetrationPercent: number;
  attackDamage: number;
  attackRange: number;
  attackSpeed: number;
  bonusArmorPenetrationPercent: number;
  bonusMagicPenetrationPercent: number;
  critChance: number;
  critDamage: number;
  currentHealth: number;
  healShieldPower: number;
  healthRegenRate: number;
  lifeSteal: number;
  magicLethality: number;
  magicPenetrationFlat: number;
  magicPenetrationPercent: number;
  magicResist: number;
  maxHealth: number;
  moveSpeed: number;
  omnivamp: number;
  physicalLethality: number;
  physicalVamp: number;
  resourceMax: number;
  resourceRegenRate: number;
  resourceType: string;
  resourceValue: number;
  spellVamp: number;
  tenacity: number;
}

export interface Rune {
  id: number;
  displayName: string;
  rawDescription: string;
  rawDisplayName: string;
}

export interface StatRune {
  id: number;
  rawDescription: string;
}

export interface RuneTree {
  id: number;
  displayName: string;
  rawDescription: string;
  rawDisplayName: string;
}

export interface FullRunes {
  generalRunes: Rune[];
  keystone: Rune;
  primaryRuneTree: RuneTree;
  secondaryRuneTree: RuneTree;
  statRunes: StatRune[];
}


export interface LiveGameStats {
  abilities: Abilities;
  championStats: ChampionStats;
  currentGold: number;
  fullRunes: FullRunes;
  level: number;
  riotId: string;
  riotIdGameName: string;
  riotIdTagLine: string;
  summonerName: string;
  teamRelativeColors: boolean;
}

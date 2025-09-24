export interface Augment {
  apiName: string;
  desc: string;
  iconLarge?: string;
  iconSmall?: string;
  id: number;
  name: string;
  rarity: number;
  tooltip: string;
  calculations?: Record<string, any>;
  dataValues?: Record<string, number | any>;
}

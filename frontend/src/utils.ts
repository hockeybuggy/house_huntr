import { HouseId } from "./types";

const streetNameMap: Record<string, string> = {
  "0": "Maple",
  "1": "Elm",
  "2": "Ash",
  "3": "Poplar",
  "4": "Aspen",
  "5": "Linden",
  "6": "Alder",
  "7": "Beech",
  "8": "Oak",
  "9": "Pine",
  a: "Juniper",
  b: "Birch",
  c: "Cherry",
  d: "Spruce",
  e: "Apple",
  f: "Douglas Fir",
};

const streetSuffixMap: Record<string, string> = {
  "0": "Street",
  "1": "Street",
  "2": "Avenue",
  "3": "Avenue",
  "4": "Boulevard",
  "5": "Crescent",
  "6": "Circle",
  "7": "Street",
  "8": "Lane",
  "9": "Way",
  a: "Grove",
  b: "Place",
  c: "Drive",
  d: "Road",
  e: "Road",
  f: "Road",
};

export function generateFakeAddressNameFromId(uuid: HouseId): string {
  const firstComponent = (uuid as string).split("-")[0];

  let x = firstComponent.charAt(0);
  let addrNumber = x;
  if (x >= "a") {
    addrNumber = 10 + firstComponent.charAt(1);
  }

  let name: string = streetNameMap[firstComponent.charAt(2)];
  let suffix: string = streetSuffixMap[firstComponent.charAt(3)];
  return `${addrNumber} ${name} ${suffix}`;
}

import uuidv4 from "uuid";

import { Constraint, House, School } from "./types";
import { WORLD_SIZE, MAP_LOCATION_SIZE } from "./constants";
import { generateFakeAddressNameFromId } from "./utils";

const MAX_BEDROOMS = 4;
const MAX_BATHROOM = 3;

function randomPosition(): number {
  // Returns a postion within the bounds of the World
  return (
    Math.round(Math.random() * WORLD_SIZE) % (WORLD_SIZE - MAP_LOCATION_SIZE)
  );
}

function randomChoice<T>(choices: Array<T>): T {
  // Returns a random element from within the given choices
  return choices[Math.round(Math.random() * (choices.length - 1))];
}

export function houseFactory(overrides: Partial<House>): House {
  // Create a semi-random House, with optional overrides for any value.
  const id = uuidv4();

  return {
    type: "house",
    id: id,
    location: {
      x: randomPosition(),
      y: randomPosition(),
    },
    address: {
      streetName: generateFakeAddressNameFromId(id),
    },
    num_bedrooms: Math.round(Math.random() * MAX_BEDROOMS),
    num_bathrooms: Math.round(Math.random() * MAX_BATHROOM),
    ...overrides,
  };
}

export function schoolFactory(overrides: Partial<School>): School {
  // Create a semi-random School, with optional overrides for any value.
  const id = uuidv4();

  return {
    type: "school",
    id: id,
    location: {
      x: randomPosition(),
      y: randomPosition(),
    },
    address: {
      streetName: generateFakeAddressNameFromId(id),
    },
    ...overrides,
  };
}

export function constraintFactory(overrides: Partial<Constraint>): Constraint {
  // Create a semi-random Constraint, with optional overrides for any value.
  return {
    type: randomChoice(["bedrooms", "bathrooms"]),
    id: uuidv4(),
    value: Math.round(Math.random() * 10) % 10,
    operator: randomChoice(["<", "<=", "=", ">=", ">"]),
    ...overrides,
  };
}

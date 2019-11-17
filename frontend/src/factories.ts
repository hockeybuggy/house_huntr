import uuidv4 from "uuid";

import { House, School } from "./types";
import { WORLD_SIZE, MAP_LOCATION_SIZE } from "./constants";

const MAX_BEDROOMS = 4;
const MAX_BATHROOM = 3;

function randomPosition(): number {
  // Returns a postion within the bounds of the World
  return (
    Math.round(Math.random() * WORLD_SIZE) % (WORLD_SIZE - MAP_LOCATION_SIZE)
  );
}

export function houseFactory(overrides: Partial<House>): House {
  // Create a semi-random House, with optional overrides for any value.
  return {
    type: "house",
    id: uuidv4(),
    location: {
      x: randomPosition(),
      y: randomPosition(),
    },
    num_bedrooms: Math.round(Math.random() * MAX_BEDROOMS),
    num_bathrooms: Math.round(Math.random() * MAX_BATHROOM),
    ...overrides,
  };
}

export function schoolFactory(overrides: Partial<School>): School {
  // Create a semi-random School, with optional overrides for any value.
  return {
    type: "school",
    location: {
      x: randomPosition(),
      y: randomPosition(),
    },
    ...overrides,
  };
}

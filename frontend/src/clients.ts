import { houseFactory, schoolFactory } from "./factories";

import { House, School } from "./types";

const NUMBER_OF_HOUSES = 31;
const NUMBER_OF_SCHOOLS = 3;
const DELAY = 500;

export const getLocations = (): Promise<{
  houses: Array<House>;
  schools: Array<School>;
}> => {
  // This function is a stub. If it were real this would make an API request to the backend.

  const houses = Array.from(Array(NUMBER_OF_HOUSES).keys()).map(() =>
    houseFactory({})
  );

  const schools = Array.from(Array(NUMBER_OF_SCHOOLS).keys()).map(() =>
    schoolFactory({})
  );

  return new Promise(function(resolve) {
    setTimeout(
      () =>
        resolve({
          houses: houses,
          schools: schools,
        }),
      DELAY
    );
  });
};

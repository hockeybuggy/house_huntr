# House Huntr

https://danderson-house-huntr.netlify.com/

## Running the application

This project is deployed via `netlify` on every new commit to master. 

To run this application locally you will need `node`, and `yarn` installed. You
can install it's dependencies with:

```sh
yarn install
```

To run the application locally:

```sh
yarn run start
# The app will start at http://localhost:8080
```

This application also has unit tests that can be run with:

```sh
yarn test
```

This application makes use of types to help define and enforce boundaries. The
types can be check with:

```sh
yarn run typecheck
```


## Approach

This project consists of mostly a frontend application for allowing individuals
to find a home. The page loads homes as well as other local features that would
be important to a home buyer (i.e. Just schools). Users can filter down the
houses listed by adding "constraints". These constraints can be things such as
"at least 3 bedrooms", or "no more than 1 bathroom" (for this work sample those
are the only types of constraints). Users can hover over items in the list to
see where it's located on the map. Users can click either the items in list of
houses or click the map to select a house and see it's details.

I chose to do the constraint filtering on the client side because I wanted the
application to as "snappy" as possible, and avoiding making external calls
whenever possible is a good way to keep things fast.

I feel that searching for a home is done both by people are are looking for the
sake of buying as well as looking aspirationally. My hope is that the app would
suit the needs of both groups since the aspirational users of today may become
the purchasing users of tomorrow.


## Structure

This application is a typescript React application. It makes use of React Hooks
for state management. The unit tests are written using `jest` and `enzyme`.


### Things I am proud of

- The app works well on a variety of screen sizes.
- The tests that do exist have nice test helper functions that allow the
  testing of the components by only passing the props that are pertinent to the
  test-case.
- The types used in the app help create friendly boundaries between components.
- The commits for this application are descriptive and (mostly) focused on a
  single change.


### Things I would consider improving

Given more time I would consider the following improvements:

- I was hoping to add "geographic" constraints. What is around is a very
  important part of find a home that is right for you. Proximity to particular
  schools, community centres, transit, and workplaces are some of the most
  important features of a property to me. I included "schools" because I wanted
  to do a "euclidean distance constraint type". Using euclidean distance isn't
  really ideal for this case since people mostly care about "travel time" by a
  variety of transportation methods.
- The `App` component isn't tested. If I was to write test for it I would
  consider writing end to end tests.
- The language and tone of the app is a little "technical" and "unfriendly".
- I don't think the `WorldMap` component is very accessible. The app would be
  usable without the map. The app would not be very usable for users who
  primarily interact with the browser via a keyboard.
- The constraints are applied in such a way that the "houses matching all
  criteria" is computed on every render. Both the number of times it's
  recomputed and the method of filtering could be improved.
- The `WorldMap` has a finite size and is generated each time.
- I didn't setup linting and it's possible that there are unused imports of
  other issues that would be caught by one.
- The `ConstraintForm` isn't really styled.
- The app doesn't make any real HTTP calls and has no backend.


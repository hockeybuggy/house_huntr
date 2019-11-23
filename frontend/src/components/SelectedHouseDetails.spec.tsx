import { mount } from "enzyme";
import React from "react";

import {
  SelectedHouseDetails,
  SelectedHouseDetailsProps,
} from "./SelectedHouseDetails";
import { houseFactory } from "./../factories";
import { LocationActions } from "./../state/actions";

function render(givenProps: Partial<SelectedHouseDetailsProps>) {
  const defaultProps: SelectedHouseDetailsProps = {
    selectedHouse: null,
    dispatch: () => {},
  };
  const props = {
    ...defaultProps,
    ...givenProps,
  };
  const wrapper = mount(<SelectedHouseDetails {...props} />);
  return { wrapper };
}

describe("SelectedHouseDetailsProps", () => {
  it("renders an empty state there is no selected house", () => {
    const { wrapper } = render({ selectedHouse: null });
    expect(wrapper.find(".selected-house-details-container").text()).toEqual(
      "Nothing selected. Choose an option from the list below:"
    );
  });

  it("renders some info about the selected house", () => {
    const { wrapper } = render({
      selectedHouse: houseFactory({
        address: { streetName: "123 Fake Street" },
        num_bedrooms: 1,
        num_bathrooms: 2,
      }),
    });

    expect(wrapper.find("h3").text()).toEqual("123 Fake Street");
    expect(
      wrapper
        .find("p")
        .at(0)
        .text()
    ).toEqual("Number of bedrooms: 1");
    expect(
      wrapper
        .find("p")
        .at(1)
        .text()
    ).toEqual("Number of bathrooms: 2");
  });

  it("dispatches an action to clear the selected house when the click button is clicked", () => {
    const dispatchSpy = jest.fn();
    const { wrapper } = render({
      dispatch: dispatchSpy,
      selectedHouse: houseFactory({}),
    });
    expect(dispatchSpy).not.toHaveBeenCalled();

    wrapper.find(".selected-house-details-container button").simulate("click");

    expect(dispatchSpy).toHaveBeenCalledWith({
      type: LocationActions.SelectHouse,
      houseId: null,
    });
  });
});

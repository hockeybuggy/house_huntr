import { mount } from "enzyme";
import React from "react";

import { HouseList, HouseListProps } from "./HouseList";
import { houseFactory } from "./../factories";
import { LocationActions } from "./../state/actions";

function render(givenProps: Partial<HouseListProps>) {
  const defaultProps: HouseListProps = {
    houses: new Map(),
    dispatch: () => {},
    selectedHouseId: null,
  };
  const props = {
    ...defaultProps,
    ...givenProps,
  };
  const wrapper = mount(<HouseList {...props} />);
  return { wrapper };
}

describe("HouseList", () => {
  it("renders an empty list if there are no houses", () => {
    const { wrapper } = render({ houses: new Map() });
    expect(wrapper.find(".house-list-container").exists()).toBe(true);
    expect(wrapper.find(".house-list").exists()).toBe(true);
    expect(wrapper.find(".house-list-item").length).toEqual(0);
  });

  describe("HouseListItem", () => {
    it("renders houses as list items", () => {
      const house1 = houseFactory({
        address: { streetName: "123 Fake Street" },
      });
      const house2 = houseFactory({
        address: { streetName: "123 Gefälschte Straße" },
      });
      const houses = new Map([
        [house1.id, house1],
        [house2.id, house2],
      ]);
      const { wrapper } = render({ houses: houses });

      expect(wrapper.find(".house-list-item").length).toEqual(2);
      const firstListItem = wrapper.find(".house-list-item").at(0);
      expect(firstListItem.text()).toEqual("123 Fake Street");
      const secondListItem = wrapper.find(".house-list-item").at(1);
      expect(secondListItem.text()).toEqual("123 Gefälschte Straße");
    });

    it("does not have the className 'house-list-item--selected' when not selected", () => {
      const house = houseFactory({});
      const houses = new Map([[house.id, house]]);

      const { wrapper } = render({
        houses: houses,
        selectedHouseId: null,
      });

      expect(
        wrapper
          .find(".house-list-item")
          .first()
          .hasClass("house-list-item--selected")
      ).toBe(false);
    });

    it("has the className 'house-list-item--selected' when selected", () => {
      const house = houseFactory({});
      const houses = new Map([[house.id, house]]);

      const { wrapper } = render({
        houses: houses,
        selectedHouseId: house.id,
      });

      expect(
        wrapper
          .find(".house-list-item")
          .first()
          .hasClass("house-list-item--selected")
      ).toBe(true);
    });

    it("dispatchs a `selectHouse` action when a list item is clicked", () => {
      const house = houseFactory({});
      const houses = new Map([[house.id, house]]);
      const dispatchSpy = jest.fn();

      const { wrapper } = render({
        houses: houses,
        selectedHouseId: null,
        dispatch: dispatchSpy,
      });

      wrapper
        .find(".house-list-item a")
        .first()
        .simulate("click");

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: LocationActions.SelectHouse,
        houseId: house.id,
      });
    });

    it("dispatches an action to highlight the house when the mouse enters", () => {
      const house = houseFactory({});
      const houses = new Map([[house.id, house]]);
      const dispatchSpy = jest.fn();

      const { wrapper } = render({
        houses: houses,
        dispatch: dispatchSpy,
      });

      expect(dispatchSpy).not.toHaveBeenCalled();

      wrapper
        .find(".house-list-item a")
        .first()
        .simulate("mouseenter");

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: LocationActions.HighlightHouse,
        houseId: house.id,
      });
    });

    it("dispatchs an action to clear highlighting when the mouse leaves", () => {
      const house = houseFactory({});
      const houses = new Map([[house.id, house]]);
      const dispatchSpy = jest.fn();

      const { wrapper } = render({
        houses: houses,
        dispatch: dispatchSpy,
      });

      expect(dispatchSpy).not.toHaveBeenCalled();

      wrapper
        .find(".house-list-item a")
        .first()
        .simulate("mouseleave");

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: LocationActions.HighlightHouse,
        houseId: null,
      });
    });
  });
});

import { mount, ReactWrapper } from "enzyme";
import * as React from "react";

import { Controls, ControlsProps } from "./Controls";

class ControlsTestHelper {
  // This class allows these tests to have a declarative interface since I
  // expect to change this component a lot as I am developing it and I would
  // like to have the many repeated steps encapsulated.
  public wrapper: ReactWrapper;

  constructor(givenProps: Partial<ControlsProps>) {
    const defaultProps: ControlsProps = {};
    const props = {
      ...defaultProps,
      ...givenProps,
    };
    this.wrapper = mount(<Controls {...props} />);
  }

  clickAddContraint(): this {
    this.wrapper.find("#add-constraint").simulate("click");
    return this;
  }

  clickRemoveConstraintListItem(index: number): this {
    this.wrapper
      .find(".remove-constraint-list-item")
      .at(index)
      .simulate("click");
    return this;
  }
}

describe("Controls", () => {
  it("renders an empty list list of constraints to start with", () => {
    const { wrapper } = new ControlsTestHelper({});
    expect(wrapper.find(".controls-container").exists()).toEqual(true);
    expect(wrapper.find(".constraint-list-item").exists()).toEqual(false);
  });

  it("adds a new constraint when the 'Add constraint' button is clicked", () => {
    const helper = new ControlsTestHelper({});

    expect(helper.wrapper.find(".constraint-list-item").length).toEqual(0);
    expect(helper.wrapper.find(".constraint-form").exists()).toBe(true);
    expect(helper.wrapper.find("#add-constraint").prop("disabled")).toBe(false);

    helper.clickAddContraint();

    expect(helper.wrapper.find(".constraint-list-item").length).toEqual(1);
    // The new constraint is in editable
    expect(helper.wrapper.find(".constraint-form").exists()).toBe(true);
    // The disable
    expect(helper.wrapper.find("#add-constraint").prop("isDisabled")).toBe(
      false
    );
  });

  it("", () => {
    const helper = new ControlsTestHelper({});
  });

  it("removes constraints when that constraint list item's 'remove' button is clicked", () => {
    // Create some controls with two constraints
    const helper = new ControlsTestHelper({}).clickAddContraint();

    expect(helper.wrapper.find(".constraint-list-item").length).toBe(1);

    helper.clickRemoveConstraintListItem(1);

    expect(helper.wrapper.find(".constraint-list-item").length).toBe(1);
  });
});

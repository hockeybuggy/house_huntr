import { mount, ReactWrapper } from "enzyme";
import React, { useReducer } from "react";

import { Controls } from "./Controls";
import { reducer, initializeState } from "./../state/reducers";

const ControlsWithState = () => {
  // This component exists just to have a realistic store state without testing
  // the whole `App`
  const [state, dispatch] = useReducer(reducer, null, initializeState);
  return (
    <Controls
      constraints={state.controls.constraints}
      editingId={state.controls.editingId}
      dispatch={dispatch}
    />
  );
};

class ControlsTestHelper {
  // This class allows these tests to have a declarative interface since I
  // expect to change this component a lot as I am developing it and I would
  // like to have the many repeated steps encapsulated.
  public wrapper: ReactWrapper;

  constructor() {
    this.wrapper = mount(<ControlsWithState />);
  }

  clickAddContraint(): this {
    this.wrapper.find("#add-constraint").simulate("click");
    return this;
  }

  clickApplyConstraintListItem(index: number): this {
    this.wrapper
      .find(".constraint-form-submit")
      .at(index)
      .simulate("submit");
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
    const { wrapper } = new ControlsTestHelper();
    expect(wrapper.find(".controls-container").exists()).toEqual(true);
    expect(wrapper.find(".constraint-list-item").exists()).toEqual(false);
  });

  it("adds a new constraint when the 'Add constraint' button is clicked", () => {
    const helper = new ControlsTestHelper();

    expect(helper.wrapper.find(".constraint-list-item").length).toEqual(0);
    expect(helper.wrapper.find(".constraint-form").exists()).toBe(false);
    expect(helper.wrapper.find("#add-constraint").prop("disabled")).toBe(false);

    helper.clickAddContraint();

    expect(helper.wrapper.find(".constraint-list-item").length).toEqual(1);
    // The new constraint is in editable
    expect(helper.wrapper.find(".constraint-form").exists()).toBe(true);
    // The disable
    expect(helper.wrapper.find("#add-constraint").prop("disabled")).toBe(true);
  });

  it("changes a constraints out of edit mode when the constraint list item's 'apply' button is clicked", () => {
    const helper = new ControlsTestHelper().clickAddContraint();

    expect(helper.wrapper.find(".constraint-form").exists()).toEqual(true);

    helper.clickApplyConstraintListItem(0);

    expect(helper.wrapper.find(".constraint-form").exists()).toEqual(false);
  });

  it("removes constraints when that constraint list item's 'remove' button is clicked", () => {
    const helper = new ControlsTestHelper()
      .clickAddContraint()
      .clickApplyConstraintListItem(0);

    expect(helper.wrapper.find(".constraint-list-item").length).toBe(1);

    helper.clickRemoveConstraintListItem(0);

    expect(helper.wrapper.find(".constraint-list-item").length).toBe(0);
  });
});

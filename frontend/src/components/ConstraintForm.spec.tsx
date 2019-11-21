import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import { act } from "react-dom/test-utils";

import { constraintFactory } from "./../factories";
import { ConstraintForm, ConstraintFormProps } from "./ConstraintForm";

function render(givenProps: Partial<ConstraintFormProps>) {
  const defaultProps = {
    constraint: constraintFactory({}),
    onSubmit: () => {},
  };
  const props = {
    ...defaultProps,
    ...givenProps,
  };
  const wrapper = mount(<ConstraintForm {...props} />);
  return { wrapper };
}

describe("ConstraintForm", () => {
  it("renders a form with some inputs", () => {
    const { wrapper } = render({});

    expect(wrapper.find(".constraint-form").exists()).toBe(true);
    expect(wrapper.find(".constraint-form-submit").exists()).toBe(true);
  });

  it("calls the `onSubmit` callback with the same constraint when the form is submitted", () => {
    const constraint = constraintFactory({});
    const onSubmitSpy = jest.fn();
    const { wrapper } = render({
      onSubmit: onSubmitSpy,
      constraint: constraint,
    });
    const submitButton = wrapper.find(".constraint-form-submit");

    expect(onSubmitSpy).not.toHaveBeenCalled();

    submitButton.simulate("submit");

    // Since we haven't changed any of the values in the form the constraint
    // should be returned as is.
    expect(onSubmitSpy).toHaveBeenCalledWith(constraint);
  });

  it("calls the `onSubmit` callback with the 'type' changed when form is submitted", () => {
    const constraint = constraintFactory({ type: "bedrooms" });
    const onSubmitSpy = jest.fn();
    const { wrapper } = render({
      onSubmit: onSubmitSpy,
      constraint: constraint,
    });
    const submitButton = wrapper.find(".constraint-form-submit");
    expect(onSubmitSpy).not.toHaveBeenCalled();

    act(() => {
      wrapper.find("#constraint-form-type-select").prop("onChange")({
        target: { value: "bathrooms" },
      } as any);
    });
    submitButton.simulate("submit");

    // Since we haven't changed any of the values in the form the constraint
    // should be returned as is.
    expect(onSubmitSpy).toHaveBeenCalledWith(
      Object.assign({}, constraint, { type: "bathrooms" })
    );
  });

  it("calls the `onSubmit` callback with the 'operator' changed when form is submitted", () => {
    const constraint = constraintFactory({ operator: "=" });
    const onSubmitSpy = jest.fn();
    const { wrapper } = render({
      onSubmit: onSubmitSpy,
      constraint: constraint,
    });
    const submitButton = wrapper.find(".constraint-form-submit");
    expect(onSubmitSpy).not.toHaveBeenCalled();

    act(() => {
      wrapper.find("#constraint-form-operator-select").prop("onChange")({
        target: { value: ">=" },
      } as any);
    });
    submitButton.simulate("submit");

    // Since we haven't changed any of the values in the form the constraint
    // should be returned as is.
    expect(onSubmitSpy).toHaveBeenCalledWith(
      Object.assign({}, constraint, { operator: ">=" })
    );
  });

  it("calls the `onSubmit` callback with the 'value' changed when form is submitted", () => {
    const constraint = constraintFactory({ value: 1 });
    const onSubmitSpy = jest.fn();
    const { wrapper } = render({
      onSubmit: onSubmitSpy,
      constraint: constraint,
    });
    const submitButton = wrapper.find(".constraint-form-submit");
    expect(onSubmitSpy).not.toHaveBeenCalled();

    act(() => {
      wrapper.find("#constraint-form-value-input").prop("onChange")({
        target: { value: 2 },
      } as any);
    });
    submitButton.simulate("submit");

    // Since we haven't changed any of the values in the form the constraint
    // should be returned as is.
    expect(onSubmitSpy).toHaveBeenCalledWith(
      Object.assign({}, constraint, { value: 2 })
    );
  });
});

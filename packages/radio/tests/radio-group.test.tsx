import { Radio, RadioGroup } from "../src"
import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { getColor, globalColor, illaPrefix } from "@illa-design/theme"
import userEvent from "@testing-library/user-event"

test("RadioGroup renders correctly", () => {
  render(
    <RadioGroup name="Group1" data-testid="radio-group" colorScheme="green">
      <Radio value="a">a</Radio>
      <Radio value="b">b</Radio>
      <Radio value="c">c</Radio>
    </RadioGroup>,
  )
  expect(screen.getByTestId("radio-group")).toBeInTheDocument()
  expect(screen.getByLabelText("a")).not.toBeChecked()
})

test("RadioGroup disabled renders correctly", () => {
  render(
    <RadioGroup
      options={["disabledA", "disabledB"]}
      data-testid="radio-group-disabled"
      disabled
    />,
  )
  expect(screen.getByTestId("radio-group-disabled")).toBeInTheDocument()
  expect(screen.getByLabelText("disabledA")).toBeDisabled()
  expect(screen.getByLabelText("disabledB")).toBeDisabled()
})

test("RadioGroup options renders correctly", () => {
  render(
    <RadioGroup options={["A", "B", "C"]} data-testid="radio-group-options" />,
  )
  expect(screen.getByTestId("radio-group-options")).toBeInTheDocument()
})

test("RadioGroup renders with options", () => {
  render(
    <RadioGroup
      options={[
        { value: "A", label: "A", disabled: false },
        { value: "B", label: "B", disabled: true },
        { value: "C", label: "C", disabled: false },
      ]}
      data-testid="radio-group-options"
    />,
  )
  expect(screen.getByTestId("radio-group-options")).toBeInTheDocument()
  expect(screen.getByLabelText("B")).toBeDisabled()
})

test("RadioGroup renders with value", () => {
  render(
    <RadioGroup options={["valueA", "valueB", "valueC"]} value={"valueA"} />,
  )
  expect(screen.getByLabelText("valueA")).toBeChecked()
})

test("RadioGroup options renders with spacing", () => {
  render(
    <RadioGroup
      data-testid="radio-group-spacing"
      options={["A", "B", "C"]}
      spacing="15px"
    />,
  )
  expect(screen.getByTestId("radio-group-spacing")).toBeInTheDocument()
  expect(screen.getByTestId("radio-group-spacing")).toHaveStyle(`
    gap: 6px 15px;
  `)
})

test("RadioGroup options renders with spacing", () => {
  render(
    <RadioGroup
      data-testid="radio-group-spacing-16"
      options={["A", "B", "C"]}
      spacing={16}
    />,
  )
  expect(screen.getByTestId("radio-group-spacing-16")).toBeInTheDocument()
  expect(screen.getByTestId("radio-group-spacing-16")).toHaveStyle(`
    gap: 6px 16px;
  `)
})

test("RadioGroup options renders with direction", () => {
  render(
    <RadioGroup
      data-testid="radio-group-direction"
      options={["directionA", "directionB", "directionC"]}
      direction="horizontal"
      size={"large"}
    />,
  )
  expect(screen.getByTestId("radio-group-direction")).toBeInTheDocument()
  expect(screen.getByTestId("radio-group-direction")).toHaveStyle(`
    flex-direction: row;
  `)
})

test("RadioGroup options renders with direction vertical", () => {
  render(
    <RadioGroup
      data-testid="radio-group-vertical"
      options={["A", "B", "C"]}
      direction="vertical"
    />,
  )
  expect(screen.getByTestId("radio-group-vertical")).toBeInTheDocument()
  expect(screen.getByTestId("radio-group-vertical")).toHaveStyle(`
    flex-direction: column;
  `)
})

test("RadioGroup renders with button type", () => {
  render(
    <RadioGroup
      data-testid="radio-group-button"
      options={["A", "B", "C"]}
      type={"button"}
      value={"A"}
    />,
  )
  expect(screen.getByTestId("radio-group-button")).toBeInTheDocument()
  expect(screen.getByText("A").parentNode).toHaveStyle(`
    padding: 5px 12px;
  `)
})

test("RadioGroup renders with disabled style", () => {
  render(
    <RadioGroup
      data-testid="radio-group-button"
      options={["A", "B", "C"]}
      type={"button"}
      value={"A"}
      disabled
    />,
  )
  expect(screen.getByTestId("radio-group-button")).toBeInTheDocument()
  expect(screen.getByText("A").parentNode).toHaveStyle(`
    cursor: not-allowed;
  `)
})

test("RadioGroup renders with button type and small size", () => {
  render(
    <RadioGroup
      data-testid="radio-group-button"
      options={["A", "B", "C"]}
      size={"small"}
      type={"button"}
      value={"A"}
    />,
  )
  expect(screen.getByTestId("radio-group-button")).toBeInTheDocument()
  expect(screen.getByText("A").parentNode).toHaveStyle(`
    padding: 1px 8px;
  `)
})

test("RadioGroup renders with button type and large size", () => {
  render(
    <RadioGroup
      data-testid="radio-group-button"
      options={["A", "B", "C"]}
      size={"large"}
      type={"button"}
    />,
  )
  expect(screen.getByTestId("radio-group-button")).toBeInTheDocument()
  expect(screen.getByText("A").parentNode).toHaveStyle(`
    padding: 9px 16px;
  `)
})

test("RadioGroup renders with button type and click", async () => {
  const fn = jest.fn()
  render(<RadioGroup options={["A", "B", "C"]} type={"button"} onChange={fn} />)
  await userEvent.click(screen.getByText("A"))
  expect(fn).toBeCalledWith("A", expect.anything())
})

test("RadioGroup renders with click", async () => {
  render(<RadioGroup options={["GroupClickA", "GroupClickB", "GroupClickC"]} />)
  const GroupClickA = screen.getByLabelText("GroupClickA")
  const GroupClickB = screen.getByLabelText("GroupClickB")

  await userEvent.click(GroupClickB)
  expect(GroupClickB).toBeChecked()
  GroupClickB.focus()
  expect(GroupClickB).toHaveFocus()
  await userEvent.click(GroupClickA)
  expect(GroupClickA).toBeChecked()
})

test("RadioGroup child renders with click", async () => {
  const changeEvent = jest.fn()
  render(
    <RadioGroup onChange={changeEvent}>
      <Radio value="a">a</Radio>
      <Radio value="b">b</Radio>
      <Radio value="c">c</Radio>
    </RadioGroup>,
  )
  fireEvent.click(screen.getByLabelText("a"))
  expect(screen.getByLabelText("a")).toBeChecked()
  expect(changeEvent).toBeCalled()
  fireEvent.click(screen.getByLabelText("c"))
  expect(screen.getByLabelText("c")).toBeChecked()
  expect(changeEvent).toBeCalled()
})

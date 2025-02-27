import { Button } from "@illa-design/button"
import { mount, unmount } from "@cypress/react"
import { PopConfirm } from "../src"
import "@testing-library/cypress"
import { SearchIcon } from "@illa-design/icon"

it("PopConfirm renders correctly", () => {
  mount(
    <PopConfirm
      title="Visible"
      closeDelay={0}
      openDelay={0}
      position="bottom-start"
      colorScheme="blue"
    >
      <Button>Click</Button>
    </PopConfirm>,
  )
  cy.findByText("Click").click()
  cy.findByText("Visible").should("exist")
  unmount()
})

it("PopConfirm renders with different button text", () => {
  mount(
    <PopConfirm
      title="Visible"
      position="bottom-start"
      okText={"ok-test"}
      cancelText={"cancel-text"}
    >
      <Button>Click</Button>
    </PopConfirm>,
  )
  cy.findByText("Click").click()
  cy.findByText("ok-test").should("exist")
  cy.findByText("cancel-text").should("exist")
  unmount()
})

it("PopConfirm renders with different icon", () => {
  mount(
    <PopConfirm title="Visible" position="bottom-start" icon={<SearchIcon />}>
      <Button>Click</Button>
    </PopConfirm>,
  )
  cy.findByText("Click").click()
  cy.findByTitle("SearchIcon").should("exist")
  unmount()
})

it("PopConfirm triggers ok event", () => {
  const okEvent = cy.stub().as("okEvent")
  const visibleEvent = cy.stub().as("visibleEvent")
  mount(
    <PopConfirm
      title="Visible"
      position="bottom-start"
      openDelay={0}
      closeDelay={0}
      onVisibleChange={visibleEvent}
      onOk={okEvent}
    >
      <Button>Click</Button>
    </PopConfirm>,
  )
  cy.findByText("Click").click()
  cy.get("@visibleEvent").should("be.calledWith", true)
  cy.findByText("Confirm").click()
  cy.get("@okEvent").should("be.called")
  cy.get("@visibleEvent").should("be.calledWith", false)
  unmount()
})

it("PopConfirm triggers cancel event", () => {
  const cancelEvent = cy.stub().as("cancelEvent")
  mount(
    <PopConfirm title="Visible" position="bottom-start" onCancel={cancelEvent}>
      <Button>Click</Button>
    </PopConfirm>,
  )
  cy.findByText("Click").click()
  cy.findByText("Cancel").click()
  cy.get("@cancelEvent").should("be.called")
  unmount()
})

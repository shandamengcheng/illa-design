import { Meta, Story } from "@storybook/react"
import { Space } from "@illa-design/space"
import { RadioGroup, RadioGroupProps } from "../src"

//👇 This default export determines where your story goes in the story list
export default {
  title: "DATA INPUT/RadioGroup",
  component: RadioGroup,
  argTypes: {
    colorScheme: {
      control: {
        type: "text",
      },
    },
  },
} as Meta

const Template: Story<RadioGroupProps<any>> = (args) => {
  return (
    <Space direction="vertical">
      <RadioGroup w={"280px"} options={["A", "B", "C", "D"]} {...args} />
      <RadioGroup
        w={"280px"}
        options={["pear", "watermelon", "peach"]}
        {...args}
      />
      <RadioGroup w={"280px"} options={[1, 2, 3]} {...args} />
      <RadioGroup w={"280px"} options={["left", "right"]} {...args} />
      <RadioGroup w={"280px"} options={["train", "plane"]} {...args} />
      <RadioGroup w={"280px"} options={[1]} {...args} />
    </Space>
  )
}

export const Basic = Template.bind({})

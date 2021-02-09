import {ButtonColorList, ComponentSizeList, XProp} from "@reform/base";
import {Story} from "@storybook/react";
import * as React from "react";
import "../theme/index.scss";
import {Button} from "./Button";
import "./index.scss";

export default {
    title: "Button",
    component: Button,
    argTypes: {
        "children": {
            name: "Label",
            control: "text",
        },
        "is:type": {
            name: "Type",
            control: {
                type: "select",
                options: ButtonColorList,
            },
        },
        "is:size": {
            name: "Size",
            control: {
                type: "select",
                options: ComponentSizeList,
            },
        },
        "is:light": {
            name: "Light",
            control: {
                type: "boolean",
            },
        },
        "is:fullwidth": {
            name: "Full width",
            control: {
                type: "boolean",
            },
        },
        "is:outlined": {
            name: "Outlined",
            control: {
                type: "boolean",
            },
        },
        "is:inverted": {
            name: "Inverted",
            control: {
                type: "boolean",
            },
        },
        "is:rounded": {
            name: "Rounded",
            control: {
                type: "boolean",
            },
        },
    },
};

const args = {children: "Click me"};
const Template: Story<XProp<"button", "button">> = (args) => <Button {...args}/>;
const Base = Template.bind({});
const Primary = Template.bind({});
const Large = Template.bind({});
const Test = Template.bind({});

Base.args = args;
Primary.args = {...args, "is:type": "primary"};
Large.args = {...args, "is:size": "large"};

export {Base, Primary, Large};

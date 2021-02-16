import {BreakpointList, XProp} from "@reform/base";
import {Story} from "@storybook/react";
import * as React from "react";
import "../theme/index.scss";
import {Column} from "./Column";
import {Columns} from "./Columns";
import "./Columns.stories.scss";

const gapList = new Array(9).fill(0).map((v, i) => v + i);

export default {
    title: "Columns",
    component: Columns,
    argTypes: {
        "is:gap": {
            name: "Gap",
            control: {
                type: "select",
                options: [
                    ...gapList,
                    ...gapList.map((v) => BreakpointList.map((b) => `${v}-${b}`)).flat()
                ],
            },
        },
        "is:variable": {
            name: "Variable",
            description: "Enable variable gap",
            type: {type: "boolean"},
            control: {
                type: "boolean",
            },
        },
        "is:gapless": {
            name: "Gapless",
            control: {
                type: "boolean",
            },
        },
        "is:multiline": {
            name: "Multiline",
            control: {
                type: "boolean",
            },
        },
        "is:breakpoint": {
            name: "Breakpoint",
            control: {
                type: "select",
                options: BreakpointList,
            },
        },
    },
};

const args = {"is:multiline": true};
const cells = new Array(6).fill(1).map((v, i) => v + i);
const Template: Story<XProp<"div", "Columns">> = (args) => (
    <Columns {...args}>
        {cells.map((col) => <Column key={col} is:size={4}><div>Col {col}</div></Column>)}
    </Columns>
);

const Base = Template.bind({});

Base.args = args;

export {Base};

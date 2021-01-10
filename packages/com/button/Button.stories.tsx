import * as React from "react";

import {Button} from "./Button";
import "./index.stories.scss";

export default {
    title: "Button",
    component: Button,
};

export const Basic: React.VFC<{}> = () => <Button>Basic</Button>;
export const Primary: React.VFC<{}> = () => <Button primary>Primary</Button>;

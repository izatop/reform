# @reform/api

Simple and powerful React forms API.
Write forms faster, more simple and clear.
  
## Install

```bash
npm install @reform/api
```

*This package requires `react@16.6+`.

## Usage

Main usage

**TextInput.tsx**
```typescript jsx
import * as React from "react";
import {Component, receiver} from "@reform/api";

export class TextInput extends Component {
    protected onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.update(e.target.value);
    }

    protected get className() {
        if (!this.valid) {
            return "is-not-valid";
        }

        if (this.changed) {
            return "is-changed";
        }

        return "";
    }

    public render() {
        return <input {...this.getDefaultProps()}/>;
    }

    protected getDefaultProps() {
        return {
            className: this.className,
            onChange: this.onChange,
            value: this.value,
            name: this.name,
            type: "text",
        }
    }
}
```

**Form.tsx**

```typescript jsx
import * as React from "react";
import {Component, Store} from "@reform/api";
import {TextComonent} from "./TextInput.tsx";

interface ISource {
  name: string;
}

export default () => {
    const defaultSource: ISource = {
        name: "Hello",
    };
    
    // will trigger 
    const onChange = (store: Store<ISource>) => {
        console.log("changed", store);
    }
        
    // will trigger on enter
    const onSubmit = (data: ISource, store: Store<ISource>) => {
        console.log("submit", data);
        return true;
    }
    
    return (
        <Form defaultSource={defaultSource}
              onSubmit={console.log}
              onChange={console.log}>
            <p><TextInput name={"name"}/></p>
            <p><button>Submit</button></p>
        </Form>
    );
};
```

## Examples

Setup `npm run bootstrap` and play `npm run doc:play`.

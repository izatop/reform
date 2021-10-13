import * as renderer from "react-test-renderer";
import {Menu, MenuNode, MenuStore} from "../../../src/components/Menu";

test("Menu", () => {
    const store = new MenuStore([
        new MenuNode("Label1", {
            children: [
                new MenuNode("Node1"),
                new MenuNode("Node2"),
            ],
        }),
        new MenuNode("Label2", {
            children: [
                new MenuNode("Node3"),
                new MenuNode("Node4"),
                new MenuNode("Node5", {
                    children: [
                        new MenuNode(<a>Subnode1</a>),
                        new MenuNode(<a>Subnode2</a>),
                    ],
                }),
            ],
        }),
    ]);

    const element1 = renderer.create(<Menu store={store}/>);
    expect(element1.toJSON()).toMatchSnapshot();
});

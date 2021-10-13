import * as renderer from "react-test-renderer";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardHeaderIcon,
    CardHeaderTitle,
    CardImage,
    Figure,
} from "../../../src";

test("Card", () => {
    const element1 = renderer.create((
        <Card>
            <CardHeader>
                <CardHeaderTitle>Title</CardHeaderTitle>
                <CardHeaderIcon icon={"home"}/>
            </CardHeader>
            <CardImage><Figure dimension={"1by1"}><img src={"/path/to/image"}/></Figure></CardImage>
            <CardContent>Content</CardContent>
            <CardFooter>
                <span>Item 1</span>
                <span>Item 2</span>
                <a>Item 3</a>
            </CardFooter>
        </Card>
    ));

    expect(element1.toJSON()).toMatchSnapshot();
});

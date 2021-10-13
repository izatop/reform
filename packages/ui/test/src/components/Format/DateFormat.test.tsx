import renderer from "react-test-renderer";
import {DateFormat, DateTimeFormat, TimeFormat} from "../../../../src/Format";

const date = "2020-01-01T21:00:00.000Z";

test("Date and Time format", () => {
    expect(renderer.create(<DateFormat value={date}/>)).toMatchSnapshot();
    expect(renderer.create(<TimeFormat value={date}/>)).toMatchSnapshot();
    expect(renderer.create(<DateTimeFormat value={date}/>)).toMatchSnapshot();
    expect(renderer.create(<DateTimeFormat format={"Date: ?, Time: ?"} value={date}/>)).toMatchSnapshot();
});

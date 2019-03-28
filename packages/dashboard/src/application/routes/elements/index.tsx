import {
    Box,
    Button,
    Buttons,
    Color,
    Content,
    Delete,
    Figure,
    Icon,
    ImageRatio,
    Notification,
    Progress,
    Size,
    Subtitle,
    Subtitle1,
    Subtitle2,
    Subtitle3,
    Subtitle4,
    Subtitle5,
    Table,
    TableBody,
    TableHead,
    Tag,
    Tags,
    Title,
    Title1,
    Title2,
    Title3,
    Title4,
    Title5,
} from "@reform/components";
import * as React from "react";
import {createRouteComponent} from "../../../vendor/createRouteComponent";
import {Placeholder} from "../../../vendor/Placeholder";

export default createRouteComponent(() => {
    return (
        <>
            <Title1>Elements</Title1>

            <Content>
                <Title id={"box"}>Box</Title>

                <p>Box component example</p>

                <Box>
                    <Subtitle>Box</Subtitle>
                    <p>Content of the box</p>
                    <p>
                        <Button>Click me</Button>
                    </p>
                </Box>
            </Content>

            <hr/>

            <Content>
                <Title id={"button"}>Button</Title>

                <p>Button component example</p>
                <Buttons>
                    <Button is-size={"small"} is-color={Color.Warning}>Small</Button>
                    <Button is-color={Color.Primary} is-rounded>Primary rounded</Button>
                    <Button is-color={"dark"} is-inverted>Dark inverted</Button>
                    <Button is-size={"large"} is-static>Large static</Button>
                </Buttons>
            </Content>

            <hr/>

            <Content>
                <Title id={"content"}>Content</Title>

                <p>See official documentation at the Bulma website.</p>
            </Content>

            <hr/>

            <Content>
                <Title id={"delete"}>Delete</Title>

                <p>Delete component example</p>
                <Delete is-size={"small"}/> <Delete/> <Delete is-size={Size.Large}/>
            </Content>

            <hr/>

            <Content>
                <Title id={"icon"}>Icon</Title>

                <p>Icon component example</p>

                <Icon icon={"arrow-up"} has-color={"danger"}/>
                <Icon icon={"arrow-down"}
                      icon-weight={"lg"}
                      is-size={Size.Large}/>
            </Content>

            <hr/>

            <Content>
                <Title id={"image"}>Image</Title>

                <p>Image component example</p>
            </Content>

            <Figure is-d={ImageRatio.R2by1}>
                <img src={Placeholder.getFigurePlaceholder(720, 240)}/>
            </Figure>

            <hr/>

            <Content>
                <Title id={"notification"}>Notification</Title>

                <p>Notification component example</p>

                <Notification>Notification message</Notification>
                <Notification is-color={Color.Warning}>
                    <Delete/>
                    Warning notification message
                </Notification>
            </Content>

            <hr/>

            <Content>
                <Title id={"progress"}>Progress Bar</Title>

                <p>Progress component example</p>

                <Progress is-size={Size.Small} max={100}/>
                <Progress is-color={Color.Primary} value={20} max={100}/>
                <Progress is-color={"danger"} is-size={"large"} value={30} max={100}/>
            </Content>

            <hr/>

            <Content>
                <Title id={"table"}>Table</Title>

                <p>Table component example</p>

                <Table is-bordered is-striped is-hoverable>
                    <TableHead cells={["Col 1", "Col 2"]}/>
                    <TableBody values={[[1, 2], [3, 4]]}/>
                </Table>
            </Content>

            <hr/>

            <Content>
                <Title id={"tag"}>Tag</Title>

                <p>Tag component example</p>

                <Tags>
                    <Tag>Tag 1</Tag>
                    <Tag>
                        Tag 2
                        <Delete is-size={Size.Small}/>
                    </Tag>
                    <Tag is-delete is-color={"danger"}/>
                </Tags>
            </Content>

            <hr/>

            <Content>
                <Title id={"title"}>Title</Title>

                <p>Title component example</p>

                <Title>Default Title</Title>
                <Subtitle>Default Subtitle</Subtitle>
                <br/>
                <Title1>Title1</Title1>
                <Subtitle1>Subtitle1</Subtitle1>
                <br/>
                <Title2>Title2</Title2>
                <Subtitle2>Subtitle2</Subtitle2>
                <br/>
                <Title3>Title3</Title3>
                <Subtitle3>Subtitle3</Subtitle3>
                <br/>
                <Title4>Title4</Title4>
                <Subtitle4>Subtitle4</Subtitle4>
                <br/>
                <Title5>Title5</Title5>
                <Subtitle5>Subtitle5</Subtitle5>
            </Content>
        </>
    );
});

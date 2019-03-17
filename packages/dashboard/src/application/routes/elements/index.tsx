import {
    Box,
    Button,
    ButtonList,
    ButtonSize,
    ButtonStyle,
    Color,
    Content,
    Delete,
    Icon,
    IconWeight,
    Image,
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
    TagList,
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
                <Title anchor={"box"}>Box</Title>

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
                <Title anchor={"button"}>Button</Title>

                <p>Button component example</p>
                <ButtonList>
                    <Button size={ButtonSize.Small} color={Color.Warning}>Small</Button>
                    <Button color={Color.Primary} style={ButtonStyle.Round}>Primary rounded</Button>
                    <Button color={Color.Dark} style={ButtonStyle.Invert}>Dark inverted</Button>
                    <Button size={ButtonSize.Large} style={ButtonStyle.Static}>Large static</Button>
                </ButtonList>
            </Content>

            <hr/>

            <Content>
                <Title anchor={"content"}>Content</Title>

                <p>See official documentation at the Bulma website.</p>
            </Content>

            <hr/>

            <Content>
                <Title anchor={"delete"}>Delete</Title>

                <p>Delete component example</p>
                <Delete size={Size.Small}/> <Delete/> <Delete size={Size.Large}/>
            </Content>

            <hr/>

            <Content>
                <Title anchor={"icon"}>Icon</Title>

                <p>Icon component example</p>

                <Icon name={"arrow-up"}/>
                <Icon name={"arrow-down"} weight={IconWeight.Large} size={Size.Large}/>
            </Content>

            <hr/>

            <Content>
                <Title anchor={"image"}>Image</Title>

                <p>Image component example</p>
            </Content>

            <Image ratio={ImageRatio.R2by1}
                   src={Placeholder.getFigurePlaceholder(720, 240)}/>

            <hr/>

            <Content>
                <Title anchor={"notification"}>Notification</Title>

                <p>Notification component example</p>

                <Notification>Notification message</Notification>
                <Notification color={Color.Warning}>
                    <Delete/>
                    Warning notification message
                </Notification>
            </Content>

            <hr/>

            <Content>
                <Title anchor={"progress"}>Progress Bar</Title>

                <p>Progress component example</p>

                <Progress size={Size.Small} max={100}/>
                <Progress color={Color.Primary} value={20} max={100}/>
                <Progress color={Color.Danger} size={Size.Large} value={30} max={100}/>
            </Content>

            <hr/>

            <Content>
                <Title anchor={"table"}>Table</Title>

                <p>Table component example</p>

                <Table>
                    <TableHead cells={["Col 1", "Col 2"]}/>
                    <TableBody values={[[1, 2], [3, 4]]}/>
                </Table>
            </Content>

            <hr/>

            <Content>
                <Title anchor={"tag"}>Tag</Title>

                <p>Tag component example</p>

                <TagList>
                    <Tag>Tag 1</Tag>
                    <Tag>
                        Tag 2
                        <Delete size={Size.Small}/>
                    </Tag>
                    <Tag delete color={Color.Danger}/>
                </TagList>
            </Content>

            <hr/>

            <Content>
                <Title anchor={"title"}>Title</Title>

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

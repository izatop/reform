import {
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardHeaderIcon,
    CardHeaderTitle,
    CardImage,
    Color,
    Content,
    Dropdown,
    DropdownDivider,
    DropdownElement,
    Figure,
    Icon,
    ImageRatio,
    Level,
    LevelElement,
    Message,
    MessageContent,
    MessageHeader,
    Modal,
    ModalContent,
    Pagination,
    PaginationNext,
    PaginationPager,
    PaginationPrevious,
    Tab,
    Tabs,
    Title,
    Title1,
} from "@reform/components";

import * as React from "react";
import {createRouteComponent} from "../../../vendor/createRouteComponent";
import {Placeholder} from "../../../vendor/Placeholder";

export default createRouteComponent(() => {
    const [active, setActive] = React.useState(false);
    const [page, setPage] = React.useState([1, 10]);

    return (
        <>
            <Title1>Components</Title1>

            <Content>
                <Title id={"breadcrumbs"}>Breadcrumbs</Title>
                See the example
            </Content>

            <Breadcrumbs has-separator={"arrow"}>
                <a><Icon icon={"home"}/><span>Home</span></a>
                <a>Section 1</a>
                <a>Section 2</a>
                <a>Section 3</a>
            </Breadcrumbs>

            <hr/>

            <Content>
                <Title id={"card"}>Card</Title>
                <p>Card example</p>
            </Content>

            <Card>
                <CardImage>
                    <Figure is-d={ImageRatio.R3by1}>
                        <img title={"Image example"} src={Placeholder.getFigurePlaceholder(720, 240)}/>
                    </Figure>
                </CardImage>
                <CardHeader>
                    <CardHeaderTitle>Card Title</CardHeaderTitle>
                    <CardHeaderIcon icon={"times"}/>
                </CardHeader>
                <CardContent>
                    Content of the card
                </CardContent>
                <CardFooter>
                    <Button is-fullwidth>Button</Button>
                    <span>Some text</span>
                    <span>...</span>
                </CardFooter>
            </Card>

            <hr/>

            <Content>
                <Title id={"dropdown"}>Dropdown</Title>

                <p>Dropdown examples</p>
            </Content>

            <Level>
                <LevelElement has-text-centered>
                    <div>
                        <p>Default</p>
                        <Dropdown button={"Click me"}>
                            <DropdownElement><a>Action</a></DropdownElement>
                        </Dropdown>
                    </div>
                </LevelElement>
                <LevelElement has-text-centered>
                    <div>
                        <p>Active item</p>
                        <Dropdown button={"Click me"}>
                            <DropdownElement is-active><a>Menu item 1</a></DropdownElement>
                            <DropdownElement><a>Menu item 2</a></DropdownElement>
                            <DropdownDivider/>
                            <DropdownElement><a>Menu item 3</a></DropdownElement>
                        </Dropdown>
                    </div>
                </LevelElement>
                <LevelElement has-text-centered>
                    <div>
                        <p>Hoverable</p>
                        <Dropdown is-hoverable button={"Hover me"}>
                            <DropdownElement><a>Action</a></DropdownElement>
                        </Dropdown>
                    </div>
                </LevelElement>
                <LevelElement has-text-centered>
                    <div>
                        <p>Inline, right</p>
                        <Dropdown is-right button={<a>Click me</a>}>
                            <DropdownElement><a>Action</a></DropdownElement>
                            <DropdownElement is-active><a>Active</a></DropdownElement>
                        </Dropdown>
                    </div>
                </LevelElement>
            </Level>

            <hr/>

            <Content>
                <Title id={"menu"}>Menu</Title>

                <p>You can look at Menu component on the left sidebar.</p>
            </Content>

            <hr/>

            <Content>
                <Title id={"message"}>Message</Title>
                <p>Example of Message component</p>

                <Message>
                    <MessageHeader>Header</MessageHeader>
                    <MessageContent>Content of the message</MessageContent>
                </Message>
            </Content>

            <hr/>

            <Content>
                <Title id={"modal"}>Modal</Title>
                <p>Example of a simple modal dialog</p>
                <p>
                    <Button is-fullwidth
                            is-color={Color.Primary}
                            onClick={() => setActive(true)}>Open</Button>
                </p>
            </Content>

            <Modal onClose={() => setActive(false)}
                   active={active}>
                <ModalContent><Box>Hello, Modal</Box></ModalContent>
            </Modal>

            <hr/>

            <Content>
                <Title id={"navbar"}>Navbar</Title>

                <p>You can look at Navbar component on the top sidebar.</p>
            </Content>

            <hr/>

            <Content>
                <Title id={"pagination"}>Pagination</Title>
                <p>Example of Pagination component</p>
            </Content>

            <Pagination is-centered
                        type={"page"}
                        page={page[0]}
                        count={page[1]}
                        onPageSelect={({page: p}) => {
                            setPage([p, Math.round(10 + (Math.random() * 90))]);
                            return true;
                        }}>
                <PaginationPrevious>Previous</PaginationPrevious>
                <PaginationNext>Next</PaginationNext>
                <PaginationPager useful pages={4}/>
            </Pagination>

            <hr/>

            <Content>
                <p>Example of Pagination component with offset/limit pattern</p>
            </Content>

            <Pagination is-centered
                        type={"limit"}
                        limit={10}
                        count={155}>
                <PaginationPrevious>Previous</PaginationPrevious>
                <PaginationNext>Next</PaginationNext>
                <PaginationPager useful pages={4}/>
            </Pagination>

            <hr/>

            <Content>
                <Title id={"panel"}>Panel</Title>

                <p>Do you want this one? Enjoy!</p>
            </Content>

            <hr/>

            <Content>
                <Title id={"tabs"}>Tabs</Title>
                <p>Example of Tabs component</p>
            </Content>

            <Tabs>
                <a>Tab One</a>
                <Tab is-active><a>Tab Two</a></Tab>
                <a>Tab Three</a>
            </Tabs>
        </>
    );
});

import {
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardImage,
    Color,
    Content,
    Dropdown,
    DropdownDivider,
    DropdownElement,
    Icon,
    Image,
    ImageRatio,
    Level,
    LevelItem,
    Message,
    MessageContent,
    MessageHeader,
    Modal,
    ModalContent,
    Pagination,
    PaginationNext,
    PaginationPager,
    PaginationPrevious,
    Tabs,
    TabsElement,
    Title,
    Title1,
} from "@reform/components";

import * as React from "react";
import {Placeholder} from "../../vendor/Placeholder";

const ComponentsPage: React.FC = (props) => {
    const [active, setActive] = React.useState(false);

    return (
        <>
            <Title1>Components</Title1>

            <Content>
                <Title anchor={"breadcrumbs"}>Breadcrumbs</Title>
                See the example
            </Content>

            <Breadcrumbs>
                <a><Icon name={"home"}/><span>Home</span></a>
                <a>Section 1</a>
                <a>Section 2</a>
                <a>Section 3</a>
            </Breadcrumbs>

            <hr/>

            <Content>
                <Title anchor={"card"}>Card</Title>
                <p>Card example</p>
            </Content>

            <Card>
                <CardImage>
                    <Image ratio={ImageRatio.R3by1}
                           title={"Image example"}
                           src={Placeholder.fetch(720, 240)}/>
                </CardImage>
                <CardHeader>
                    <p>Card Title</p>
                    <p><Icon name={"times"}/></p>
                </CardHeader>
                <CardContent>
                    Content of the card
                </CardContent>
                <CardFooter>
                    <p><Button fullwidth>Button</Button></p>
                    <p>Some text</p>
                    <p>...</p>
                </CardFooter>
            </Card>

            <hr/>

            <Content>
                <Title anchor={"dropdown"}>Dropdown</Title>

                <p>Dropdown examples</p>
            </Content>

            <Level>
                <LevelItem centered>
                    <div>
                        <p>Default</p>
                        <Dropdown button={"Click me"}>
                            <DropdownElement><a>Action</a></DropdownElement>
                        </Dropdown>
                    </div>
                </LevelItem>
                <LevelItem centered>
                    <div>
                        <p>Active item</p>
                        <Dropdown button={"Click me"}>
                            <DropdownElement active><a>Menu item 1</a></DropdownElement>
                            <DropdownElement><a>Menu item 2</a></DropdownElement>
                            <DropdownDivider/>
                            <DropdownElement><a>Menu item 3</a></DropdownElement>
                        </Dropdown>
                    </div>
                </LevelItem>
                <LevelItem centered>
                    <div>
                        <p>Hoverable</p>
                        <Dropdown hoverable button={"Hover me"}>
                            <DropdownElement><a>Action</a></DropdownElement>
                        </Dropdown>
                    </div>
                </LevelItem>
                <LevelItem centered>
                    <div>
                        <p>Inline, right</p>
                        <Dropdown right button={<a>Click me</a>}>
                            <DropdownElement><a>Action</a></DropdownElement>
                            <DropdownElement active><a>Active</a></DropdownElement>
                        </Dropdown>
                    </div>
                </LevelItem>
            </Level>

            <hr/>

            <Content>
                <Title anchor={"menu"}>Menu</Title>

                <p>You can look at Menu component on the left sidebar.</p>
            </Content>

            <hr/>

            <Content>
                <Title anchor={"message"}>Message</Title>
                <p>Example of Message component</p>

                <Message>
                    <MessageHeader>Header</MessageHeader>
                    <MessageContent>Content of the message</MessageContent>
                </Message>
            </Content>

            <hr/>

            <Content>
                <Title anchor={"modal"}>Modal</Title>
                <p>Example of a simple modal dialog</p>
                <p>
                    <Button fullwidth
                            color={Color.Primary}
                            onClick={() => setActive(true)}>Open</Button>
                </p>
            </Content>

            <Modal onClose={() => setActive(false)}
                   active={active}>
                <ModalContent><Box>Hello, Modal</Box></ModalContent>
            </Modal>

            <hr/>

            <Content>
                <Title anchor={"navbar"}>Navbar</Title>

                <p>You can look at Navbar component on the top sidebar.</p>
            </Content>

            <hr/>

            <Content>
                <Title anchor={"pagination"}>Pagination</Title>
                <p>Example of Pagination component</p>
            </Content>

            <Pagination centered
                        type={"page"}
                        count={10}>
                <PaginationPrevious>Previous</PaginationPrevious>
                <PaginationNext>Next</PaginationNext>
                <PaginationPager useful pages={4}/>
            </Pagination>

            <hr/>

            <Content>
                <Title anchor={"panel"}>Panel</Title>

                <p>Do you want this one? Enjoy!</p>
            </Content>

            <hr/>

            <Content>
                <Title anchor={"tabs"}>Tabs</Title>
                <p>Example of Tabs component</p>
            </Content>

            <Tabs>
                <a>Tab One</a>
                <TabsElement active><a>Tab Two</a></TabsElement>
                <a>Tab Three</a>
            </Tabs>
        </>
    );
};

export default ComponentsPage;

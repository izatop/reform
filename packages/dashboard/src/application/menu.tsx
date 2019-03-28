import {Link} from "@reach/router";
import {MenuNode, MenuStore} from "@reform/components";
import {Icon} from "@reform/components/dist";
import * as React from "react";

export const menu = new MenuStore(
    [
        new MenuNode(<Link to={"/"}><Icon icon={"home"}/><span>Dashboard</span></Link>),
        // new MenuNode("Pro Components"),
        new MenuNode(
            "UI Library",
            {
                children: [
                    /*new MenuNode(<Link to={"/columns"}>Columns</Link>),
                    new MenuNode(<Link to={"/layout"}>Layout</Link>),*/
                    new MenuNode(<Link to={"/forms/"}>Forms</Link>, {
                        children: [
                            new MenuNode(<Link to={"/forms/#general"}>General</Link>),
                            new MenuNode(<Link to={"/forms/controlled"}>Controlled</Link>),
                        ],
                    }),
                    new MenuNode(<Link to={"/tables/"}>Tables</Link>),
                    new MenuNode(<Link to={"/elements/"}>Elements</Link>, {
                        children: [
                            new MenuNode(<Link to={"/elements/#box"}>Box</Link>),
                            new MenuNode(<Link to={"/elements/#button"}>Button</Link>),
                            new MenuNode(<Link to={"/elements/#content"}>Content</Link>),
                            new MenuNode(<Link to={"/elements/#delete"}>Delete</Link>),
                            new MenuNode(<Link to={"/elements/#icon"}>Icon</Link>),
                            new MenuNode(<Link to={"/elements/#image"}>Image</Link>),
                            new MenuNode(<Link to={"/elements/#notification"}>Notification</Link>),
                            new MenuNode(<Link to={"/elements/#progress"}>Progress bars</Link>),
                            new MenuNode(<Link to={"/elements/#table"}>Table</Link>),
                            new MenuNode(<Link to={"/elements/#tag"}>Tag</Link>),
                            new MenuNode(<Link to={"/elements/#title"}>Title</Link>),
                        ],
                    }),
                    new MenuNode(<Link to={"/components/"}>Components</Link>, {
                        children: [
                            new MenuNode(<Link to={"/components/#breadcrumbs"}>Breadcrumbs</Link>),
                            new MenuNode(<Link to={"/components/#card"}>Card</Link>),
                            new MenuNode(<Link to={"/components/#drowdown"}>Drowdown</Link>),
                            new MenuNode(<Link to={"/components/#menu"}>Menu</Link>),
                            new MenuNode(<Link to={"/components/#message"}>Message</Link>),
                            new MenuNode(<Link to={"/components/#modal"}>Modal</Link>),
                            new MenuNode(<Link to={"/components/#navbar"}>Navbar</Link>),
                            new MenuNode(<Link to={"/components/#pagination"}>Pagination</Link>),
                            new MenuNode(<Link to={"/components/#panel"}>Panel</Link>),
                            new MenuNode(<Link to={"/components/#tabs"}>Tabs</Link>),
                        ],
                    }),
                ],
            },
        ),
    ],
    {select: {key: "to", value: location.pathname + location.hash}},
);

import {InMemoryCache} from "apollo-cache-inmemory";
import {ApolloClient} from "apollo-client";
import {HttpLink} from "apollo-link-http";

export class ClientConnection {
    private static readonly instance = new ClientConnection();

    private readonly client: ApolloClient<any>;

    constructor() {
        this.client = new ApolloClient({
            link: new HttpLink({uri: "http://127.0.0.1:3200"}),
            cache: new InMemoryCache(),
        });
    }

    public static get() {
        return this.instance;
    }

    public static getClient() {
        return this.instance.client;
    }

    public getClient() {
        return this.client;
    }
}

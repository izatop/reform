import {Store} from "@reform/api";

const defaultOptions = {timeout: 300};

export const submitForm = (options = defaultOptions) => async (data: any, store: Store<any>) => {
    // tslint:disable
    console.log("submit", data);
    await new Promise((resolve) => (
        setTimeout(resolve, options.timeout)
    ));

    return true;
};

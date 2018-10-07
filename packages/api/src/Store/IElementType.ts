import {Element} from "./Element";
import {IFormSource, IMountOptions, Store} from "./Store";

export interface IElementType<E extends Element<T>, T extends IFormSource = IFormSource> {
    new(context: Store<T>, value: any, options?: IMountOptions): E;
}

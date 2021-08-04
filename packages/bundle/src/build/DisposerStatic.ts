export type Disposable = () => unknown;

const disposables: Disposable[] = [];

export class DisposerStatic {
    public static dispose(disposable: Disposable) {
        disposables.push(disposable);
    }
}

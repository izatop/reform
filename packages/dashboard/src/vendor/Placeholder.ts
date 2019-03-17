export class Placeholder {
    public static getFigurePlaceholder(width: number, height?: number) {
        return `http://via.placeholder.com/${width}x${height || width}?text=Placeholder`;
    }
}

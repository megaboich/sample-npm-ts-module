export class TheExportedClass {
    public static exportedMethod1(): string {
        return "Hey there " + new Date().toDateString();
    }

    public static thisIsVersion2(): string {
        return "Version 2 here " + new Date().getTime();
    }
}
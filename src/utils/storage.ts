/**
 * The Storer is a class that handles storing values using the browser.
 * It has two methods:
 * set = Stores the string based on the given name.
 * get = Retrieves the saved string by name. If not found, it returns null.
 */
class Storer {
    set = (name: string, value: string | number | undefined, type?: Storage): void => {
        const storage = type ?? window.localStorage;
        if (value != undefined) {
            storage.setItem(name, String(value));
        } else {
            storage.removeItem(name);
        }
    };

    get = (name: string, type?: Storage): string | undefined => {
        const storage = type ?? window.localStorage;
        const content = storage.getItem(name);
        return content ?? undefined;
    };
}

/**
 * Creates an instance of the Storer class
 */
const storage = new Storer();

export default storage;

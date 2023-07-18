/**
 * Asynchronously performs an HTTP request to get a JSON response.
 * Takes a URL as input and optionally a RequestInit object for settings.
 * Returns a Promise
 */
const fetchJson = async <T>(input: string, init?: RequestInit): Promise<T> => {
    const url = new URL(input);
    return fetch(url.href, init).then(async (response) => {
        const json = parseJson(await response.text()) as T;
        if (response.status < 200 || response.status >= 300) {
            throw { status: response.status, ...json };
        }
        return json as T;
    });
};

/**
 * Convert FormData to JSON.
 */
const formDataToJson = (data: FormData) => {
    const keys = [...new Set(Array.from(data.keys()))];
    const object = Object.fromEntries(
        keys.map((key) => [key, data.getAll(key).length > 1 ? data.getAll(key) : data.get(key)]),
    );
    return JSON.parse(JSON.stringify(object));
};

/**
 * Import Google Fonts inside React
 */
const googleFonts = (values: string[]) => {
    if (!values) {
        return;
    }
    const query = values.map((value) => value.replaceAll(' ', '+')).join('&family=');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css?family=${query}`;
    document.head.appendChild(link);
};

/**
 * Change the Favicon
 */
const favicon = (value: string) => {
    const favicon = document.getElementById('favicon') as HTMLAnchorElement;
    favicon.remove();
    if (value) {
        const link = document.createElement('link');
        link.rel = 'icon';
        link.href = value;
        link.id = 'favicon';
        document.head.appendChild(link);
    }
};

/**
 * Convert String to JSON.
 */
const parseJson = (text: string | null): object => {
    try {
        return text ? JSON.parse(text) : {};
    } catch (error) {
        return {};
    }
};

export { favicon, fetchJson, formDataToJson, googleFonts, parseJson };

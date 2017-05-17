const wordsRegex = /\w+/g;

export function formatFileSize(size: number | string): string {
    if (typeof size === "string") {
        size = parseInt(size);
    }
    if (size == 0) {
        return 'Empty file'
    }
    if (isNaN(size)) {
        return '';
    }
    let i: number = Math.floor(Math.log(size) / Math.log(1024));
    let y = (size / Math.pow(1024, i));
    let f = y.toFixed(2);
    return f + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
};

export function formatId(name: string, checkIfIdIsBusy?: (id: string) => boolean): string {
    let id = (name.toLowerCase().match(wordsRegex) || []).join('-');
    if (!id) {
        throw new Error(`Impossible to build an id from ${name}`);
    }
    let indexedId = id;
    if (checkIfIdIsBusy) {
        let index = 1;
        while (checkIfIdIsBusy(indexedId)) {
            index++;
            indexedId = id + '-' + index;
        }
    }
    return indexedId;
}

/**
 * Returns file extension in lowercase without dot
 * If extension is not there return empty string
 */
export function getFileExtension(fileName: string): string {
    if (!fileName) {
        return '';
    }
    let dotIndex = fileName.lastIndexOf('.');
    if (dotIndex < 0) {
        return '';
    }
    return fileName.substr(dotIndex + 1).toLowerCase();
}

/**
 * Returns filename from full filepath or URI
 * @param filePath 
 */
export function getFileName(filePath: string): string {
    const lastSlashIndex = filePath.lastIndexOf('/') + 1;
    const lastBackslashIndex = filePath.lastIndexOf('\\') + 1;
    return filePath.substr(Math.max(0, lastSlashIndex, lastBackslashIndex))
}
/**
 * Convert string to Base16 representation. May be used to convert binary strings as well
 */
export function strToBase16(bin: string): string {
    let hex: string[] = [];
    for (let i = 0; i < bin.length; ++i) {
        let tmp = bin.charCodeAt(i).toString(16);
        if (tmp.length === 1) {
            tmp = "0" + tmp;
        }
        hex[hex.length] = tmp;
    }
    return hex.join("");
}

export function stripLastHashOrSlash(uri: string) {
    if (!uri) {
        return ''
    }
    while (
        uri.endsWith('#') || uri.endsWith('/')
    ) {
        uri = uri.slice(0, -1);
    }
    return uri;
}

export function properEncodeURIComponent(s: string): string {
    return encodeURIComponent(s).replace(/'/gi, `%27`);
    //return s.replace(/[^]/g, function (w) { return '%' + w.charCodeAt(0).toString(16) });
}

export function truncateUrl(url: string): string {
    if (!url) { return '' };
    url = url.trim();
    while (url.endsWith('/')) {
        url = url.substr(0, url.length - 1);
    }
    const parts = url.split('/');
    if (parts.length > 4) {
        return [parts[0], parts[1], parts[2], '...', parts[parts.length - 1]].join('/');
    }
    return url;
}
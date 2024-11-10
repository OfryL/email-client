export const writeToCache = (key: string, data: any) =>
    localStorage.setItem(key, JSON.stringify(data));

export const deleteFromCache = (key: string) =>
    localStorage.removeItem(key);

export const clearCache = () =>
    localStorage.clear();

export const readFromCache = (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
};

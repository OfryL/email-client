import { writeToCache, readFromCache, deleteFromCache } from "./utils/local-storage-cache";

const FOLDERS_KEY = 'folders';

const getFreshFolders = async () => {
    return fetch('/api/v1/folders')
        .then((res) => res.json())
        .then(({ data }) => {
            if (data) {
                writeToCache(FOLDERS_KEY, data)
            }
            return data;
        });;
};

export const getFolders = async () => {
    const cacheData = readFromCache(FOLDERS_KEY);
    if (cacheData) {
        return cacheData;
    } else {
        return getFreshFolders();
    }
};

export const cleanup = () => deleteFromCache(FOLDERS_KEY);

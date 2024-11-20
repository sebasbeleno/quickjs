/* eslint-disable @typescript-eslint/no-explicit-any */
import * as idb from 'idb-keyval';
const isSupported = true;

export async function set(key: IDBValidKey, value: any) {
    if (isSupported) {
        try {
            await idb.set(key, value);
            return;
        } catch (e) {
            console.error(e);
        }
    }
}

export async function get(key: IDBValidKey) {
    if (isSupported) {
        try {
            return await idb.get(key);
        } catch (e) {
            console.error(e);
        }
    }
}

export async function del(key: IDBValidKey) {
    if (isSupported) {
        try {
            await idb.del(key);
            return;
        } catch (e) {
            console.error(e);
        }
    }
}

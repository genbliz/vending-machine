import os from "os";
import path from "path";
import fs from "fs";
import { randomFillSync, createHash, randomUUID } from "crypto";

class UtilServiceBase {
  convertHexadecimalToNumber(hexString: string) {
    return parseInt(hexString, 16);
  }

  toSha256(inputData: string) {
    return createHash("sha256").update(inputData).digest("hex");
  }

  chunk<T>(arr: T[], size: number) {
    return Array.from({ length: Math.ceil(arr.length / size) }, (v, i) => arr.slice(i * size, i * size + size));
  }

  getUUID() {
    return randomUUID();
  }

  getTemporaryDirectory() {
    return path.resolve(os.tmpdir(), this.getUUID());
  }

  getRandomHexString() {
    return randomFillSync(Buffer.alloc(16)).toString("hex");
  }

  getFileExtention(filePathOrFilename: string) {
    return path.extname(filePathOrFilename);
  }

  camelCaseToSentenceCase(text: string) {
    const result = text.replace(/([A-Z])/g, " $1");
    const rst = result.charAt(0).toUpperCase() + result.slice(1);
    return rst.trim();
  }

  toTitleCase(text: string) {
    return text.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
    });
  }

  /**
   * Converts string into snake_case.
   *
   */
  snakeCase(str: string) {
    return (
      str
        // ABc -> a_bc
        .replace(/([A-Z])([A-Z])([a-z])/g, "$1_$2$3")
        // aC -> a_c
        .replace(/([a-z0-9])([A-Z])/g, "$1_$2")
        .toLowerCase()
    );
  }

  isValidEmailRegex(email: string) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  stringToBase64(str: string) {
    return Buffer.from(str).toString("base64");
  }

  objectHasAnyProperty(obj: Record<string, any>): boolean {
    if (obj && typeof obj === "object") {
      if (Array.isArray(obj)) {
        return false;
      }
      return Object.keys(obj).length > 0;
    }
    return false;
  }

  convertObjectToJsonPlainObject<T = Record<string, any>>(objData: T) {
    const objDataPlain: T = JSON.parse(JSON.stringify(objData));
    return objDataPlain;
  }

  removeDuplicatesInArray<T extends string | number>(items: T[]) {
    if (!Array.isArray(items)) {
      return [];
    }
    return Array.from(new Set(items));
  }

  stringOrNumberHasDuplicate(strItems: (string | number)[]) {
    if (!Array.isArray(strItems)) {
      return false;
    }
    const dupDict: Record<string, number> = {};
    strItems.forEach((val) => {
      const val01 = val.toString();
      if (dupDict[val01] === undefined) {
        dupDict[val01] = 1;
      } else {
        dupDict[val01] += 1;
      }
    });
    const isDup = Object.entries(dupDict).some(([_, val]) => val > 1);
    return isDup;
  }

  shuffleArray<T>(o: T[]) {
    for (
      let j: number, x: any, i = o.length;
      i;
      j = parseInt(`${Math.random() * i}`, 10), x = o[--i], o[i] = o[j], o[j] = x
    ) {
      //
    }
    return o;
  }

  replaceEmptySpaces(strValue: string, replacement: string) {
    return strValue
      .split(" ")
      .filter((x) => x !== "")
      .join(replacement);
  }

  waitUntilMilliseconds(ms: number) {
    return new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  deleteKeysFromObject<T = Record<string, any>>({
    dataObject,
    delKeys,
  }: {
    dataObject: T;
    delKeys: (keyof T | string)[];
  }): T {
    if (!(dataObject && typeof dataObject === "object")) {
      return dataObject;
    }
    if (Array.isArray(dataObject)) {
      return dataObject;
    }
    const chosenDataObject: any = {};
    const delKeysGrouped = this.groupOneBy(delKeys, (f) => f as string);

    Object.entries(dataObject).forEach(([key, value]) => {
      if (!delKeysGrouped[key]) {
        chosenDataObject[key] = value;
      }
    });
    return chosenDataObject;
  }

  pickFromObject<T = Record<string, any>>({ dataObject, pickKeys }: { dataObject: T; pickKeys: (keyof T)[] }): T {
    if (!(dataObject && typeof dataObject === "object")) {
      return dataObject;
    }
    if (Array.isArray(dataObject)) {
      return dataObject;
    }
    const chosenDataObject: any = {};
    const allKeys = Object.keys(dataObject);
    const allKeysGrouped = this.groupOneBy(allKeys, (f) => f);

    pickKeys.forEach((key) => {
      if (allKeysGrouped[key as string] !== undefined) {
        chosenDataObject[key] = dataObject[key];
      }
    });
    return chosenDataObject;
  }

  timeoutHolder: Record<string, any> = {};
  debounceAdvanced(id: string, wait: number, cb: () => void) {
    if (this.timeoutHolder[id]) {
      clearTimeout(this.timeoutHolder[id]);
    }
    this.timeoutHolder[id] = setTimeout(() => {
      cb();
    }, wait);
  }

  imageToBase64Encode(fileFullPath: string) {
    const bitmap = fs.readFileSync(fileFullPath);
    return Buffer.from(bitmap).toString("base64");
  }

  groupOneBy<T>(dataList: T[], fn: (dt: T) => string | number) {
    const aggr: Record<string, T> = {};
    if (dataList?.length) {
      dataList.forEach((data) => {
        const groupId = fn(data);
        if (aggr[groupId] === undefined) {
          aggr[groupId] = data;
        }
      });
    }
    return aggr;
  }

  groupBy<T>(dataList: T[], fn: (dt: T) => string | number) {
    const aggr: Record<string, T[]> = {};
    if (dataList?.length) {
      dataList.forEach((data) => {
        const groupId = fn(data);
        if (!aggr[groupId]) {
          aggr[groupId] = [];
        }
        aggr[groupId].push(data);
      });
    }
    return aggr;
  }

  isNumeric(n: string | number | null | undefined) {
    if (n === null || typeof n === "undefined" || typeof n === "boolean") {
      return false;
    }
    const nn = String(n);
    if (nn?.trim() && !isNaN(Number(nn)) && isFinite(Number(nn)) && !isNaN(parseFloat(nn))) {
      return true;
    }
    return false;
  }

  isNumericPositiveInteger(n: string | number | null | undefined) {
    const nn = String(n);
    const numberOnly = /^\d+$/.test(nn);
    if (!numberOnly) {
      return false;
    }
    if (!this.isNumeric(n)) {
      return false;
    }
    if (Number(n).toString().includes(".")) {
      return false;
    }
    const mInt = parseInt(Number(n).toString());
    if (mInt >= 1) {
      return true;
    }
    return false;
  }

  memoize<T extends (...args: Parameters<T>) => any>(cb: T) {
    const cache = new Map();
    return (...args: Parameters<T>) => {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = cb(...args);
      cache.set(key, result);
      return result;
    };
  }

  pluck<T>(arrayList: T[], key: keyof T) {
    return arrayList.map((item) => item[key]);
  }
}

export const UtilService = new UtilServiceBase();

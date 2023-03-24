export function convertObjectToJsonPlainObject<T = Record<string, any>>(objData: T) {
  const objDataPlain: T = JSON.parse(JSON.stringify(objData));
  return objDataPlain;
}

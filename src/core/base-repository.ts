import { randomUUID } from "node:crypto";
import { getMongoConnection } from "./connection";
import { ICore, IBaseSchema } from "./types";
import Joi from "joi";
import { getJoiValidationErrors } from "../helpers/joi-helper";
import { GenericFriendlyError } from "../helpers/error";
import { Filter } from "mongodb";

export abstract class BaseRepository<T extends ICore> {
  private readonly tableName: string;
  private readonly schema: IBaseSchema<T>;

  constructor({ tableName, schema }: { tableName: string; schema: IBaseSchema<T> }) {
    this.tableName = tableName;
    this.schema = schema;
  }

  private getDocClient() {
    return getMongoConnection().db().collection<T>(this.tableName);
  }

  protected transposeToId(data: T) {
    if (!(data && data["_id"])) {
      return data;
    }
    const data01: Partial<T> = { ...data, id: data["_id"] };
    delete data01["_id"];
    return data01 as T;
  }

  protected transposeToNativeId(data: T) {
    if (!(data && data["id"])) {
      return data;
    }
    const data01: Partial<T> = { ...data, _id: data["id"] };
    delete data01["id"];
    return data01 as T;
  }

  async getById(dataId: string) {
    const result = await this.getDocClient().findOne<T>({ _id: dataId as any });
    return result ? this.transposeToId(result) : result;
  }

  async findOne(filter: Filter<T>) {
    const result = await this.getDocClient().findOne<T>({ ...filter });
    return result ? this.transposeToId(result) : result;
  }

  async deleteById(dataId: string) {
    const result = await this.getDocClient().deleteOne({ _id: dataId as any });
    return result?.deletedCount;
  }

  async getAll({ query, fields }: { query?: Filter<T>; fields?: (keyof T)[] } = {}) {
    const filter01 = query ? query : {};

    const builder = this.getDocClient().find<T>({ ...filter01 });

    if (fields?.length) {
      const fieldsobj = fields.reduce((prev, curr) => {
        prev[curr] = 1;
        return prev;
      }, {} as Record<keyof T, number>);
      builder.project(fieldsobj);
    }

    const result = await builder.toArray();
    return result.map((f) => this.transposeToId(f));
  }

  private validateSchema(data: Partial<T>, schema: IBaseSchema<any>) {
    const { error, value } = Joi.object(schema).validate(data);
    if (error) {
      throw GenericFriendlyError.createValidationError(getJoiValidationErrors(error) || "Unknown schema error");
    }
    return value;
  }

  async create(data: Partial<T>) {
    const data01 = { ...data };
    data01.id = randomUUID();
    data01.createdAt = new Date().toISOString();

    const dataValidated = this.validateSchema(data01, this.schema);
    const dataValidated01: any = this.transposeToNativeId(dataValidated);

    const result = await this.getDocClient().insertOne({ ...dataValidated01 }, { forceServerObjectId: true });

    if (!result?.acknowledged) {
      throw GenericFriendlyError.createValidationError("Data not inserted");
    }
    return data01 as T;
  }

  async update(data: T) {
    const data01 = { ...data };
    data01.updatedAt = new Date().toISOString();
    const dataValidated = this.validateSchema(data01, this.schema);

    const result = await this.getDocClient().findOneAndUpdate({ _id: data01.id as any }, dataValidated);

    if (!result?.ok) {
      throw GenericFriendlyError.createValidationError("Data not updated");
    }

    const value01: any = result?.value;

    return value01 ? this.transposeToId(value01) : (value01 as unknown as T);
  }

  async patch({ dataId, patialData, schema }: { dataId: string; patialData: Partial<T>; schema?: IBaseSchema<any> }) {
    const dataValidated = schema ? this.validateSchema(patialData, schema) : patialData;

    const result = await this.getDocClient().updateOne({ _id: dataId as any }, { $set: { ...dataValidated } });

    if (!result?.modifiedCount) {
      throw GenericFriendlyError.createValidationError("Data not updated");
    }

    return await this.getById(dataId);
  }
}

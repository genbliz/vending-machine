import { randomUUID } from "crypto";
import { Filter } from "mongodb";
import Joi from "joi";
import { getMongoDbConnection } from "./connection";
import { ICore, IBaseSchema } from "./types";
import { getJoiValidationErrors } from "../helpers/joi-helper";
import { GenericFriendlyError } from "../helpers/error";

export abstract class BaseRepository<T extends ICore> {
  private readonly tableName: string;
  private readonly schema: IBaseSchema<T>;

  constructor({ tableName, schema }: { tableName: string; schema: IBaseSchema<T> }) {
    this.tableName = tableName;
    this.schema = schema;
  }

  private getDocClient() {
    return getMongoDbConnection().collection<T>(this.tableName);
  }

  async getById(dataId: string) {
    const filter = { _id: dataId } as Filter<T>;
    const result = await this.getDocClient().findOne<T>(filter);
    return result;
  }

  async findOne(filter: Filter<T>) {
    const result = await this.getDocClient().findOne<T>({ ...filter });
    return result;
  }

  async deleteById(dataId: string) {
    const filter = { _id: dataId } as Filter<T>;
    const result = await this.getDocClient().deleteOne(filter);
    return result?.deletedCount;
  }

  private formatProjection(fields: (keyof T)[]) {
    const fieldsobj = Array.from(new Set(fields)).reduce((prev, curr) => {
      prev[curr] = 1;
      return prev;
    }, {} as Record<keyof T, number>);
    return fieldsobj;
  }

  async getAll({ query, fields }: { query?: Filter<T>; fields?: (keyof T)[] } = {}) {
    const filter01 = query ? query : {};

    const builder = this.getDocClient().find<T>({ ...filter01 });

    if (fields?.length) {
      const fieldsobj = this.formatProjection(fields);
      builder.project(fieldsobj);
    }

    const result = await builder.toArray();
    return result;
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
    data01._id = randomUUID();
    data01.createdAt = new Date().toISOString();

    const dataValidated = this.validateSchema(data01, this.schema);

    const result = await this.getDocClient().insertOne({ ...dataValidated }, { forceServerObjectId: true });

    if (!result?.acknowledged) {
      throw GenericFriendlyError.createValidationError("Data not inserted");
    }
    return data01 as T;
  }

  async update(data: T) {
    const data01 = { ...data };
    data01.updatedAt = new Date().toISOString();
    const dataValidated = this.validateSchema(data01, this.schema);

    const filter = { _id: data01._id } as Filter<T>;
    const result = await this.getDocClient().findOneAndReplace(filter, dataValidated, { returnDocument: "after" });

    if (!result?.value) {
      throw GenericFriendlyError.createValidationError("Data not updated");
    }

    return result.value;
  }

  async patch({ dataId, patialData, schema }: { dataId: string; patialData: Partial<T>; schema?: IBaseSchema<any> }) {
    const dataValidated = schema ? this.validateSchema(patialData, schema) : patialData;

    const filter = { _id: dataId } as Filter<T>;
    const result = await this.getDocClient().findOneAndUpdate(
      filter,
      { $set: { ...dataValidated } },
      { returnDocument: "after" },
    );

    if (!result?.value) {
      throw GenericFriendlyError.createValidationError("Data not updated");
    }

    return result.value;
  }
}

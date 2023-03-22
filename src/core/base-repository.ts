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

  protected getDocClient() {
    return getMongoConnection().db().collection<T>(this.tableName);
  }

  async getById(dataId: string) {
    const result = await this.getDocClient().findOne<T>({ _id: dataId as any });
    return result;
  }

  async findOne(filter: Filter<T>) {
    const result = await this.getDocClient().findOne<T>({ ...filter });
    return result;
  }

  async deleteById(dataId: string) {
    const result = await this.getDocClient().deleteOne({ _id: dataId as any });
    return result?.deletedCount;
  }

  async getAll(filter?: Filter<T>) {
    const filter01 = filter ? filter : {};

    const result = await this.getDocClient()
      .find<T>({ ...filter01 })
      .toArray();
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
    data01.id = randomUUID();
    data01._id = data01.id;
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
    const result = await this.getDocClient().findOneAndUpdate({ _id: data01.id as any }, dataValidated);

    if (!result?.ok) {
      throw GenericFriendlyError.createValidationError("Data not updated");
    }
    return result.value as unknown as T;
  }

  async patch({ dataId, patialData, schema }: { dataId: string; patialData: Partial<T>; schema?: any }) {
    const dataValidated = schema ? this.validateSchema(patialData, schema) : patialData;

    const result = await this.getDocClient().findOneAndUpdate({ _id: dataId as any }, { $set: { ...dataValidated } });

    if (!result?.ok) {
      throw GenericFriendlyError.createValidationError("Data not updated");
    }

    return result.value as unknown as T;
  }
}

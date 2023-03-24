import supertest from "supertest";
import app from "../app";
import { StatusCode } from "../helpers/status-codes";
import { demoUserSeller } from "./demo-data";
import { IProduct } from "../product/product.types";
const request = supertest(app);

const { username, password } = demoUserSeller;

export const productTest = () =>
  describe("Product CRUD operation", () => {
    let access_token = "";

    let productData = {} as IProduct;

    const prod01 = {
      amountAvailable: 14,
      cost: 50,
      productName: `Lolipo-${Date.now()}`,
    };

    beforeAll(async () => {
      const result = await request.post(`/login`).send({ username, password }).expect(StatusCode.OK_200);
      expect(typeof result.body.data.access_token).toBe("string");
      access_token = result.body.data.access_token;
    });

    it("create product", async () => {
      const result = await request
        .post(`/product`)
        .set("Authorization", `Bearer ${access_token}`)
        .set("Accept", "application/json")
        .send(prod01)
        .expect(StatusCode.OK_200);

      productData = result.body.data;

      expect(result.body).toHaveProperty("status");
      expect(result.body).toHaveProperty("data");
    });

    it("get all products", async () => {
      const result = await request
        .get(`/product`)
        .set("Authorization", `Bearer ${access_token}`)
        .set("Accept", "application/json")
        .expect(StatusCode.OK_200);

      expect(result.body).toHaveProperty("status");
      expect(result.body).toHaveProperty("data");
    });

    it("get product by id", async () => {
      const result = await request
        .get(`/product/${productData._id}`)
        .set("Authorization", `Bearer ${access_token}`)
        .set("Accept", "application/json")
        .expect(StatusCode.OK_200);

      expect(result.body).toHaveProperty("status");
      expect(result.body).toHaveProperty("data");
      expect(result.body.data._id).toBe(productData._id);
    });

    it("update product", async () => {
      const prod012: IProduct = { ...productData };
      prod012.amountAvailable++;

      const result = await request
        .put(`/product/${prod012._id}`)
        .set("Authorization", `Bearer ${access_token}`)
        .set("Accept", "application/json")
        .send(prod012)
        .expect(StatusCode.OK_200);

      expect(result.body).toHaveProperty("status");
      expect(result.body).toHaveProperty("data");
    });

    it("delete product", async () => {
      const result = await request
        .delete(`/product/${productData._id}`)
        .set("Authorization", `Bearer ${access_token}`)
        .set("Accept", "application/json")
        .expect(StatusCode.OK_200);

      expect(result.body).toHaveProperty("status");
      expect(result.body).toHaveProperty("data");
    });
  });

import supertest from "supertest";
import app from "../app";
import { StatusCode } from "../helpers/status-codes";
import { demoUserBuyer } from "./demo-data";
const { username, password } = demoUserBuyer;
const request = supertest(app);

export const buyTest = () =>
  describe("Buy", () => {
    let access_token = "";

    const buyData = {
      amount: 50,
      productId: "",
    };

    beforeAll(async () => {
      const result = await request.post(`/login`).send({ username, password }).expect(StatusCode.OK_200);
      expect(typeof result.body.data.access_token).toBe("string");
      access_token = result.body.data.access_token;
    });

    beforeAll(async () => {
      const result = await request
        .get(`/product`)
        .set("Authorization", `Bearer ${access_token}`)
        .set("Accept", "application/json")
        .expect(StatusCode.OK_200);

      expect(result.body.data).toBeTruthy();
      expect(Array.isArray(result.body.data)).toBe(true);
      expect(typeof result.body.data[0]._id).toBe("string");

      buyData.productId = result.body.data[0]._id;
    });

    it("buy product", async () => {
      const result = await request
        .post(`/buy`)
        .set("Authorization", `Bearer ${access_token}`)
        .set("Accept", "application/json")
        .send(buyData)
        .expect(StatusCode.OK_200);

      expect(result.body).toHaveProperty("status");
      expect(result.body).toHaveProperty("data");
    });
  });

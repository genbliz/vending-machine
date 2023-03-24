import supertest from "supertest";
import app from "../app";
import { StatusCode } from "../helpers/status-codes";
import { demoUserBuyer } from "./demo-data";
const { username, password } = demoUserBuyer;
const request = supertest(app);

export const depositTest = () =>
  describe("Buy", () => {
    let access_token = "";

    const coinData = { deposit: 50 };

    beforeAll(async () => {
      const result = await request.post(`/login`).send({ username, password }).expect(StatusCode.OK_200);
      expect(typeof result.body.data.access_token).toBe("string");
      access_token = result.body.data.access_token;
    });

    it("buy product", async () => {
      const result = await request
        .post(`/buy`)
        .set("Authorization", `Bearer ${access_token}`)
        .set("Accept", "application/json")
        .send(coinData)
        .expect(StatusCode.OK_200);

      expect(result.body).toHaveProperty("status");
      expect(result.body).toHaveProperty("data");
    });
  });

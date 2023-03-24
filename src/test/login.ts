import supertest from "supertest";
import app from "../app";
import { StatusCode } from "../helpers/status-codes";
import { demoUserBuyer, demoUserSeller } from "./demo-data";

const request = supertest(app);

export const loginTest = () =>
  describe("Login", () => {
    it("login buyer with correct credentials", async () => {
      const { username, password } = demoUserBuyer;
      const result = await request.post(`/login`).send({ username, password }).expect(StatusCode.OK_200);
      expect(result.body).toHaveProperty("status");
      expect(result.body).toHaveProperty("data");
      expect(result.body.data).toHaveProperty("access_token");
      expect(result.body.data).toHaveProperty("user");
      expect(result.body.data.user.username).toBe(username);
    });

    it("login seller with correct credentials", async () => {
      const { username, password } = demoUserSeller;
      const result = await request.post(`/login`).send({ username, password }).expect(StatusCode.OK_200);
      expect(result.body).toHaveProperty("status");
      expect(result.body).toHaveProperty("data");
      expect(result.body.data).toHaveProperty("access_token");
      expect(result.body.data).toHaveProperty("user");
      expect(result.body.data.user.username).toBe(username);
    });

    it("fails with invalid credentials", async () => {
      const user = { username: "jay1", password: "774848_kd" };
      await request.post(`/login`).send(user).expect(StatusCode.Unauthorized_401);
    });

    it("fails with missing credentials", async () => {
      const user = {};
      await request.post(`/login`).send(user).expect(StatusCode.Validation_Error_422);
    });
  });

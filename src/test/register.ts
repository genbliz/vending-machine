import supertest from "supertest";
import app from "../app";
import { StatusCode } from "../helpers/status-codes";
import { demoUserSeller } from "./demo-data";
const request = supertest(app);

export const registerTest = () =>
  describe("Register", () => {
    it("register buyer seller", async () => {
      const result = await request.post(`/user`).send(demoUserSeller).expect(StatusCode.OK_200);
      expect(result.body).toHaveProperty("status");
      expect(result.body).toHaveProperty("data");
    });

    it("fails with invalid register credentials", async () => {
      const user = { username: "nunu", pw: "774848_kd" };
      await request.post(`/user`).send(user).expect(StatusCode.Validation_Error_422);
    });

    it("fails with missing register credentials", async () => {
      const user = {};
      await request.post(`/user`).send(user).expect(StatusCode.Validation_Error_422);
    });
  });

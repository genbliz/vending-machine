import { loginTest } from "./login";
import { registerTest } from "./register";
import { productTest } from "./product";
import { depositTest } from "./deposit";
import { buyTest } from "./buy";

describe("Sequentially run tests", () => {
  registerTest();
  loginTest();
  productTest();
  depositTest();
  buyTest();
});

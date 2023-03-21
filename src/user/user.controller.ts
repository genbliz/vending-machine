import { Request, Response } from "express";
import { responseError, responseSuccess } from "../helpers/response";

export const userController = {
  async getById(req: Request, res: Response) {
    try {
      // const dataId: string = req.params.id;

      // const result = await DiscountRepository.findSingle({ tenantId, dataId });

      const result = await Promise.resolve();

      return responseSuccess({ res, data: result });
    } catch (error) {
      return responseError({ res, error });
    }
  },

  async deposit(req: Request, res: Response) {
    try {
      // const dataId: string = req.params.id;

      // const result = await DiscountRepository.findSingle({ tenantId, dataId });

      const result = await Promise.resolve();

      return responseSuccess({ res, data: result });
    } catch (error) {
      return responseError({ res, error });
    }
  },

  async resetDeposit(req: Request, res: Response) {
    try {
      // const dataId: string = req.params.id;

      // const result = await DiscountRepository.findSingle({ tenantId, dataId });

      const result = await Promise.resolve();

      return responseSuccess({ res, data: result });
    } catch (error) {
      return responseError({ res, error });
    }
  },

  async loginUser(req: Request, res: Response) {
    try {
      // const dataId: string = req.params.id;

      // const result = await DiscountRepository.findSingle({ tenantId, dataId });

      const result = await Promise.resolve();

      return responseSuccess({ res, data: result });
    } catch (error) {
      return responseError({ res, error });
    }
  },

  async getUsers(req: Request, res: Response) {
    try {
      // const dataId: string = req.params.id;

      // const result = await DiscountRepository.findSingle({ tenantId, dataId });

      const result = await Promise.resolve();

      return responseSuccess({ res, data: result });
    } catch (error) {
      return responseError({ res, error });
    }
  },

  async registerUser(req: Request, res: Response) {
    try {
      // const dataId: string = req.params.id;

      // const result = await DiscountRepository.findSingle({ tenantId, dataId });

      const result = await Promise.resolve();

      return responseSuccess({ res, data: result });
    } catch (error) {
      return responseError({ res, error });
    }
  },

  async deleteById(req: Request, res: Response) {
    try {
      // const dataId: string = req.params.id;

      // const result = await DiscountRepository.findSingle({ tenantId, dataId });

      const result = await Promise.resolve();

      return responseSuccess({ res, data: result });
    } catch (error) {
      return responseError({ res, error });
    }
  },
};

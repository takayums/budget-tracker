import { NextFunction, Request, Response } from "express";

function asyncErrorHanlder(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
}

export default asyncErrorHanlder;

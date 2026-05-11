import type { Request, Response, NextFunction } from "express";
import { type Schema } from "yup";
import { BAD_REQUEST } from "./constants";

interface Req<P = any, Q = any, B = any> extends Request {
  valid?: { params?: P; query?: Q; body?: B };
}

interface Res extends Response {}

type Nex = NextFunction;

export function bodyCast(schema: Schema) {
  return function (req: Req, res: Res, next: Nex) {
    if (!req.valid) req.valid = {};
    try {
      req.valid.body = schema.cast(req.body);

      next();
    } catch (error) {
      console.error(error.message, req.body);
      res.status(BAD_REQUEST).json({ message: error.message });
    }
  };
}

export function queryCast(schema: Schema) {
  return function (req: Req, res: Res, next: Nex) {
    if (!req.valid) req.valid = {};
    if (!req.valid.query) req.valid.query = {};
    try {
      req.valid.query = schema.cast(req.query);

      next();
    } catch (error) {
      console.error(error.message, req.body);
      res.status(BAD_REQUEST).json({ message: error.message });
    }
  };
}

export function paramCast(schema: Schema, key: string) {
  return function (req: Req, res: Res, next: Nex) {
    if (!req.valid) req.valid = {};
    if (!req.valid.params) req.valid.params = {};
    try {
      req.valid.params[key] = schema.cast(req.params?.[key]);

      next();
    } catch (error) {
      console.error(error.message, req.body);
      res.status(BAD_REQUEST).json({ message: error.message });
    }
  };
}

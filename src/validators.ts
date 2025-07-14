import type { Request, Response, NextFunction, RequestHandler } from "express";
import { type Schema, ValidationError } from "yup";
import { BAD_REQUEST } from "./constants";

export function valid(
  schema: Schema,
  { type = "Body", key, code = "V03" },
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const lowerType = type.toLowerCase();
    const value = key ? req?.[lowerType]?.[key] : req?.[lowerType];

    schema
      .validate(value)
      .then((data) => {
        req[`valid${type}`] = data;

        next();
      })
      .catch((error: Error) => {
        if (error instanceof ValidationError) {
          res.status(BAD_REQUEST).json({ message: error.message, value, code });
        }
      });
  };
}

export function validBody(schema: Schema, { key, code = "VO1" }) {
  return valid(schema, { key, code, type: "Body" });
}

export function validParams(schema: Schema, { key, code = "VO2" }) {
  return valid(schema, { key, code, type: "Params" });
}

export function validQuery(schema: Schema, { key, code = "V03" }) {
  return valid(schema, { key, code, type: "Query" });
}

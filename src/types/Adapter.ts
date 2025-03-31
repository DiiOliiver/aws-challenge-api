import { Controller } from "../contracts/Controller";
import { RequestHandler } from "express";

export type Adapter = (_controller: Controller) => RequestHandler;

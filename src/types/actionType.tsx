import { commentType } from "./commentType";
import { ACTION_TYPES } from "../constants/ACTION_TYPES";

export type actionType = {
  type: `${ACTION_TYPES}`;
  payload: commentType;
};
import { z } from "zod";
import {
  authEmail,
  authName,
  authPassword,
  authSurname,
} from "@/validation/zod-types";

export const registerSchema = z.object({
  email: authEmail,
  name: authName,
  surname: authSurname,
  password: authPassword,
});

export const loginSchema = z.object({
  email: authEmail,
  password: authPassword,
});

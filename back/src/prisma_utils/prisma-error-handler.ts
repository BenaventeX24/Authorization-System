import { Prisma } from "@prisma/client";

type targetError = {
  target: [string];
};

export function PrismaErrorHandler(
  e: Prisma.PrismaClientKnownRequestError
): Error {
  let catchedError = new Error("UKNOWN_ERROR");
  if (e.code === "P2002") {
    let error = e.meta as targetError;
    error.target.forEach((target) => {
      if (target === "email") catchedError = new Error("REPEATED_EMAIL");
      else catchedError = new Error("UKNOWN_ERROR");
    });
  }
  return catchedError;
}

import { Prisma } from "@prisma/client";

type targetError = {
  target: [string];
};

export function PrismaErrorHandler(e: Prisma.PrismaClientKnownRequestError) {
  if (e.code === "P2002") {
    let error = e.meta as targetError;
    error.target.forEach((target) => {
      if (target === "email") throw new Error("REPEATED_EMAIL");
    });
  }
}

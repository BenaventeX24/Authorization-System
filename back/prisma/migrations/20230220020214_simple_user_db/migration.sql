-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'COSTUMER');

-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "password" VARCHAR(256) NOT NULL,
    "name" VARCHAR(16) NOT NULL,
    "surname" VARCHAR(16) NOT NULL,
    "role" "Role" DEFAULT 'COSTUMER',
    "token_v" INTEGER DEFAULT 0,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

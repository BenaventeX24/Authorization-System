/*
  Warnings:

  - You are about to drop the column `token_id` on the `Users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Users" DROP COLUMN "token_id",
ALTER COLUMN "token_v" DROP NOT NULL;

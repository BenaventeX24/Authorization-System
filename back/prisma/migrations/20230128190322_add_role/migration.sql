/*
  Warnings:

  - You are about to drop the column `type` on the `Users` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'COSTUMER');

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "type",
ADD COLUMN     "role" "Role" DEFAULT 'COSTUMER';

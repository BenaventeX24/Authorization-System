/*
  Warnings:

  - You are about to drop the column `username` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `product_creation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `products_tags` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `surname` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_user_id_fkey";

-- DropForeignKey
ALTER TABLE "product_creation" DROP CONSTRAINT "product_creation_product_id_fkey";

-- DropForeignKey
ALTER TABLE "product_creation" DROP CONSTRAINT "product_creation_user_id_fkey";

-- DropForeignKey
ALTER TABLE "products_tags" DROP CONSTRAINT "products_tags_product_id_fkey";

-- DropForeignKey
ALTER TABLE "products_tags" DROP CONSTRAINT "products_tags_tag_id_fkey";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "username",
ADD COLUMN     "name" VARCHAR(16) NOT NULL,
ADD COLUMN     "surname" VARCHAR(16) NOT NULL;

-- DropTable
DROP TABLE "Order";

-- DropTable
DROP TABLE "Product";

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "product_creation";

-- DropTable
DROP TABLE "products_tags";

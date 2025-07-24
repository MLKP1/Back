/*
  Warnings:

  - Changed the type of `zip_code` on the `addresses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "addresses" ALTER COLUMN "complement" DROP NOT NULL,
DROP COLUMN "zip_code",
ADD COLUMN     "zip_code" INTEGER NOT NULL;

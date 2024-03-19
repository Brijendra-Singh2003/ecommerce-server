/*
  Warnings:

  - Changed the type of `phone` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `pincode` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Address" DROP COLUMN "phone",
ADD COLUMN     "phone" INTEGER NOT NULL,
DROP COLUMN "pincode",
ADD COLUMN     "pincode" INTEGER NOT NULL;

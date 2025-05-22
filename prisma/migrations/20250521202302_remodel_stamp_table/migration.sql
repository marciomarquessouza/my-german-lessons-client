/*
  Warnings:

  - You are about to drop the column `description` on the `Stamp` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Stamp` table. All the data in the column will be lost.
  - Added the required column `penalty` to the `Stamp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Stamp` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Stamp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Stamp" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "penalty" INTEGER NOT NULL,
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

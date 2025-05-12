/*
  Warnings:

  - You are about to drop the column `lessonsQnt` on the `trails` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_trails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slugName" TEXT NOT NULL,
    "title" TEXT NOT NULL
);
INSERT INTO "new_trails" ("id", "name", "slugName", "title") SELECT "id", "name", "slugName", "title" FROM "trails";
DROP TABLE "trails";
ALTER TABLE "new_trails" RENAME TO "trails";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

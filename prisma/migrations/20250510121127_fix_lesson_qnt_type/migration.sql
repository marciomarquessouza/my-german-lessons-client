/*
  Warnings:

  - You are about to alter the column `lessonsQnt` on the `trails` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_trails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slugName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "lessonsQnt" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_trails" ("id", "lessonsQnt", "name", "slugName", "title") SELECT "id", "lessonsQnt", "name", "slugName", "title" FROM "trails";
DROP TABLE "trails";
ALTER TABLE "new_trails" RENAME TO "trails";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

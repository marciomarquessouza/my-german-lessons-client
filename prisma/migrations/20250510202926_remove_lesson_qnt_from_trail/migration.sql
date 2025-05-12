/*
  Warnings:

  - You are about to drop the column `challengesQnt` on the `lessons` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_lessons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trailId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slugName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "doorTitle" TEXT NOT NULL DEFAULT '',
    "roomPosition" INTEGER NOT NULL DEFAULT 0,
    "floorPosition" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_lessons" ("description", "doorTitle", "floorPosition", "id", "name", "roomPosition", "slugName", "trailId") SELECT "description", "doorTitle", "floorPosition", "id", "name", "roomPosition", "slugName", "trailId" FROM "lessons";
DROP TABLE "lessons";
ALTER TABLE "new_lessons" RENAME TO "lessons";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

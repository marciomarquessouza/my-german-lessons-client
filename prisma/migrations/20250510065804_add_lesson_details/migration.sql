/*
  Warnings:

  - You are about to drop the column `quantity` on the `lessons` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_challenges" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lessonId" TEXT NOT NULL,
    "sourceLanguage" TEXT NOT NULL,
    "targetLanguage" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "tip" TEXT NOT NULL,
    "roomPosition" INTEGER NOT NULL DEFAULT 0,
    "floorPosition" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_challenges" ("answer", "id", "lessonId", "question", "sourceLanguage", "targetLanguage", "tip") SELECT "answer", "id", "lessonId", "question", "sourceLanguage", "targetLanguage", "tip" FROM "challenges";
DROP TABLE "challenges";
ALTER TABLE "new_challenges" RENAME TO "challenges";
CREATE TABLE "new_lessons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slugName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "challengesQnt" INTEGER NOT NULL DEFAULT 0,
    "roomsQnt" INTEGER NOT NULL DEFAULT 0,
    "floorsQnt" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_lessons" ("description", "id", "name", "slugName") SELECT "description", "id", "name", "slugName" FROM "lessons";
DROP TABLE "lessons";
ALTER TABLE "new_lessons" RENAME TO "lessons";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

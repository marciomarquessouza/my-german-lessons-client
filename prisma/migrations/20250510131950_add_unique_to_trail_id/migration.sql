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
    "challengesQnt" INTEGER NOT NULL DEFAULT 0,
    "roomPosition" INTEGER NOT NULL DEFAULT 0,
    "floorPosition" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_lessons" ("challengesQnt", "description", "doorTitle", "floorPosition", "id", "name", "roomPosition", "slugName", "trailId") SELECT "challengesQnt", "description", "doorTitle", "floorPosition", "id", "name", "roomPosition", "slugName", "trailId" FROM "lessons";
DROP TABLE "lessons";
ALTER TABLE "new_lessons" RENAME TO "lessons";
CREATE UNIQUE INDEX "lessons_trailId_key" ON "lessons"("trailId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_trails" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slugName" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "rooms" INTEGER NOT NULL DEFAULT 0,
    "floors" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_trails" ("id", "name", "slugName", "title") SELECT "id", "name", "slugName", "title" FROM "trails";
DROP TABLE "trails";
ALTER TABLE "new_trails" RENAME TO "trails";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

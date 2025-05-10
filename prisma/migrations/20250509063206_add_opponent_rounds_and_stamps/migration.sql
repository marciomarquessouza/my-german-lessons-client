-- CreateTable
CREATE TABLE "stamps" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "class" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "opponent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "lessonStamps" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lessonId" TEXT NOT NULL,
    "stampId" TEXT NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "penalty" INTEGER NOT NULL DEFAULT 0,
    "quantity" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "rounds" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "lessonId" TEXT NOT NULL,
    "opponentId" TEXT NOT NULL,
    "turns" INTEGER NOT NULL,
    "challengesLimit" INTEGER NOT NULL DEFAULT 0,
    "extraQuestion" INTEGER NOT NULL DEFAULT 0,
    "assistants" INTEGER NOT NULL DEFAULT 0
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_lessons" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slugName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_lessons" ("description", "id", "name", "slugName") SELECT "description", "id", "name", "slugName" FROM "lessons";
DROP TABLE "lessons";
ALTER TABLE "new_lessons" RENAME TO "lessons";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

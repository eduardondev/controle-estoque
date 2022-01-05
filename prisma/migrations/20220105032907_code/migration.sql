/*
  Warnings:

  - You are about to drop the column `status` on the `Status` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Status" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" INTEGER NOT NULL DEFAULT 0,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Status" ("id", "name") SELECT "id", "name" FROM "Status";
DROP TABLE "Status";
ALTER TABLE "new_Status" RENAME TO "Status";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

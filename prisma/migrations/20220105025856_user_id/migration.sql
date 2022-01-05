/*
  Warnings:

  - Added the required column `userId` to the `Outputs` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Outputs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" DATETIME,
    "date" DATETIME NOT NULL,
    "status" INTEGER NOT NULL,
    "employee" TEXT NOT NULL,
    "shipping" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "tracker" TEXT NOT NULL
);
INSERT INTO "new_Outputs" ("createdAt", "date", "deletedAt", "employee", "id", "orderId", "shipping", "sku", "status", "tracker", "updatedAt") SELECT "createdAt", "date", "deletedAt", "employee", "id", "orderId", "shipping", "sku", "status", "tracker", "updatedAt" FROM "Outputs";
DROP TABLE "Outputs";
ALTER TABLE "new_Outputs" RENAME TO "Outputs";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

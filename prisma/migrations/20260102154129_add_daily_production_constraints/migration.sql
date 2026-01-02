/*
  Warnings:

  - You are about to drop the `FlockRecord` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FlockRecord" DROP CONSTRAINT "FlockRecord_flockId_fkey";

-- DropTable
DROP TABLE "FlockRecord";

-- CreateTable
CREATE TABLE "DailyProduction" (
    "id" BIGSERIAL NOT NULL,
    "flockId" BIGINT NOT NULL,
    "recordDate" DATE NOT NULL,
    "eggsCollected" INTEGER NOT NULL,
    "fertileEggs" INTEGER NOT NULL,
    "infertileEggs" INTEGER NOT NULL,
    "damagedEggs" INTEGER NOT NULL,
    "chicksHatched" INTEGER NOT NULL,
    "healthyChicks" INTEGER NOT NULL,
    "unhealthyChicks" INTEGER NOT NULL,
    "deaths" INTEGER NOT NULL,
    "healthyAdults" INTEGER NOT NULL,
    "unhealthyAdults" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DailyProduction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DailyProduction_flockId_idx" ON "DailyProduction"("flockId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyProduction_flockId_recordDate_key" ON "DailyProduction"("flockId", "recordDate");

-- AddForeignKey
ALTER TABLE "DailyProduction" ADD CONSTRAINT "DailyProduction_flockId_fkey" FOREIGN KEY ("flockId") REFERENCES "Flock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

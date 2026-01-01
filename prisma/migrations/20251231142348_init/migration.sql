-- CreateEnum
CREATE TYPE "Role" AS ENUM ('admin', 'moderator', 'hatchery_member', 'normal_user');

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "role" "Role" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hatchery" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "ownerId" BIGINT NOT NULL,
    "renewalStatus" BOOLEAN NOT NULL,
    "yearEstablished" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hatchery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Breed" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "fertilityRate" DOUBLE PRECISION NOT NULL,
    "infertilityRate" DOUBLE PRECISION NOT NULL,
    "eggDamageRate" DOUBLE PRECISION NOT NULL,
    "hatchabilityRate" DOUBLE PRECISION NOT NULL,
    "healthyChickRate" DOUBLE PRECISION NOT NULL,
    "unhealthyChickRate" DOUBLE PRECISION NOT NULL,
    "mortalityRate" DOUBLE PRECISION NOT NULL,
    "healthyAdultRate" DOUBLE PRECISION NOT NULL,
    "unhealthyAdultRate" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Breed_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flock" (
    "id" BIGSERIAL NOT NULL,
    "hatcheryId" BIGINT NOT NULL,
    "breedId" BIGINT NOT NULL,
    "flockSize" INTEGER NOT NULL,
    "maleChicks" INTEGER NOT NULL,
    "femaleChicks" INTEGER NOT NULL,
    "purpose" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "intakeDate" TIMESTAMP(3) NOT NULL,
    "dateOfShipment" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Flock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FlockRecord" (
    "id" BIGSERIAL NOT NULL,
    "flockId" BIGINT NOT NULL,
    "week" INTEGER NOT NULL,
    "fertileEggCount" INTEGER NOT NULL,
    "nonFertileEggCount" INTEGER NOT NULL,
    "damagedEggCount" INTEGER NOT NULL,
    "hatchabilityCount" INTEGER NOT NULL,
    "healthyChickCount" INTEGER NOT NULL,
    "unhealthyChickCount" INTEGER NOT NULL,
    "mortalityCount" INTEGER NOT NULL,
    "healthyAdultCount" INTEGER NOT NULL,
    "unhealthyAdultCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FlockRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" BIGSERIAL NOT NULL,
    "userId" BIGINT NOT NULL,
    "hatcheryId" BIGINT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Hatchery_registrationNumber_key" ON "Hatchery"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Breed_name_key" ON "Breed"("name");

-- AddForeignKey
ALTER TABLE "Hatchery" ADD CONSTRAINT "Hatchery_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flock" ADD CONSTRAINT "Flock_hatcheryId_fkey" FOREIGN KEY ("hatcheryId") REFERENCES "Hatchery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flock" ADD CONSTRAINT "Flock_breedId_fkey" FOREIGN KEY ("breedId") REFERENCES "Breed"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FlockRecord" ADD CONSTRAINT "FlockRecord_flockId_fkey" FOREIGN KEY ("flockId") REFERENCES "Flock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_hatcheryId_fkey" FOREIGN KEY ("hatcheryId") REFERENCES "Hatchery"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

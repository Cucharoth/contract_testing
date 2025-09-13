/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `License` table. All the data in the column will be lost.
  - You are about to drop the column `doctorId` on the `License` table. All the data in the column will be lost.
  - You are about to drop the column `patientId` on the `License` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `License` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `License` table. All the data in the column will be lost.
  - The `status` column on the `License` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `createdAt` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `Doctor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doctor_id` to the `License` table without a default value. This is not possible if the table is not empty.
  - Added the required column `patient_id` to the `License` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `License` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `License` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."license_status" AS ENUM ('issued', 'revoked', 'expired');

-- DropForeignKey
ALTER TABLE "public"."License" DROP CONSTRAINT "License_doctorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."License" DROP CONSTRAINT "License_patientId_fkey";

-- AlterTable
ALTER TABLE "public"."Doctor" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."License" DROP COLUMN "createdAt",
DROP COLUMN "doctorId",
DROP COLUMN "patientId",
DROP COLUMN "startDate",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "doctor_id" TEXT NOT NULL,
ADD COLUMN     "patient_id" TEXT NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "public"."license_status" NOT NULL DEFAULT 'issued';

-- AlterTable
ALTER TABLE "public"."Patient" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."License" ADD CONSTRAINT "License_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "public"."Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."License" ADD CONSTRAINT "License_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "public"."Doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `Doctor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `License` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Patient` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."License" DROP CONSTRAINT "License_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."License" DROP CONSTRAINT "License_patient_id_fkey";

-- DropTable
DROP TABLE "public"."Doctor";

-- DropTable
DROP TABLE "public"."License";

-- DropTable
DROP TABLE "public"."Patient";

-- CreateTable
CREATE TABLE "public"."patient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."doctor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "doctor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."license" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "days" INTEGER NOT NULL,
    "status" "public"."license_status" NOT NULL DEFAULT 'issued',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "license_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."license" ADD CONSTRAINT "license_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "public"."patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."license" ADD CONSTRAINT "license_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "public"."doctor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

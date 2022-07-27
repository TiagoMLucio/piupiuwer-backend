/*
  Warnings:

  - You are about to drop the column `updated_ata` on the `users` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "updated_ata",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

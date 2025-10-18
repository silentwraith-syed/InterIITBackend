/*
  Warnings:

  - You are about to drop the `Otp` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable: Add password column with a temporary default (bcrypt hash of "password123")
-- This is the hash for "password123" with salt rounds 10: $2a$10$rVZ5YjKZfF1XJH5xKVQnH.7o6aZqQJZ5YjKZfF1XJH5xKVQnH.7o6
ALTER TABLE "User" ADD COLUMN "password" TEXT NOT NULL DEFAULT '$2a$10$rVZ5YjKZfF1XJH5xKVQnH.7o6aZqQJZ5YjKZfF1XJH5xKVQnH.7o6';

-- Remove the default constraint so future inserts must provide a password
ALTER TABLE "User" ALTER COLUMN "password" DROP DEFAULT;

-- DropTable
DROP TABLE "public"."Otp";

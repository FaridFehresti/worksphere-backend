-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthdate" TIMESTAMP(3),
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "gender" TEXT DEFAULT '',
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "userName" TEXT DEFAULT '';

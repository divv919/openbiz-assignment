-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "pan" TEXT NOT NULL,
    "currentStep" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "aadhar" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_pan_key" ON "public"."User"("pan");

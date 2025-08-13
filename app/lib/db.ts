import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query", "warn", "error"],
  });

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export const checkUser = async (aadhaar: string) => {
  return await prisma.user.findFirst({
    where: { aadhaar },
  });
};

export const postUserStep1 = async (aadhaar: string, aadhaarName: string) => {
  return await prisma.user.create({
    data: { aadhaar, aadhaarName, currentStep: 2 },
  });
};

export const postUserStep2 = async (
  aadhaar: string,
  panName: string,
  pan: string,
  type: number,
  dob: Date
) => {
  return await prisma.user.update({
    where: { aadhaar },
    data: {
      panName,
      pan,
      type,
      dob,
      currentStep: 3,
    },
  });
};

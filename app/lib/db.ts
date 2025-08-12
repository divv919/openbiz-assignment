import { PrismaClient } from "../generated/prisma";

export const prisma = new PrismaClient();
export const checkUser = async (aadhaar: string) => {
  const res = await prisma.user.findFirst({
    where: {
      aadhaar,
    },
  });
  return res;
};

export const postUserStep1 = async (aadhaar: string, aadhaarName: string) => {
  const res = await prisma.user.create({
    data: { aadhaar, aadhaarName, currentStep: 2 },
  });
  return res;
};
export const postUserStep2 = async (
  aadhaar: string,
  panName: string,
  pan: string,
  type: number,
  dob: Date
) => {
  const res = await prisma.user.update({
    where: { aadhaar },
    data: {
      panName,
      pan,
      type,
      dob,
      currentStep: 3,
    },
  });
  return res;
};

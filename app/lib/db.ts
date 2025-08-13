import { prisma } from "./prisma";

export const checkUser = async (aadhaar: string) => {
  return prisma.user.findFirst({ where: { aadhaar } });
};

export const postUserStep1 = async (aadhaar: string, aadhaarName: string) => {
  return prisma.user.create({
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
  return prisma.user.update({
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

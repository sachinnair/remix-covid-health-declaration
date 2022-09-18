import { prisma } from "~/db.server";

export const createCitizen = async ({ data }) => {
  return await prisma.citizen.create({ data });
}
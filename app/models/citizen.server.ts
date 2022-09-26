import { prisma } from "~/db.server";
import type { Citizen } from "@prisma/client";

export type TCitizen = Required<Pick<Citizen, "name" | "temperature">> &
  Partial<Pick<Citizen, "isDegreeCelsius">>;

export const createCitizen = async ({ data }: { data: TCitizen }) => {
  return await prisma.citizen.create({ data: data as Citizen });
};

-- AlterTable
ALTER TABLE "Citizen" ADD COLUMN     "hasBodyAches" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasBreathDiff" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasCough" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasDiarrhoea" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasFatigue" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasFever" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasHeadaches" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasRunnyNose" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasSoreThroat" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "hasSti" BOOLEAN NOT NULL DEFAULT false;

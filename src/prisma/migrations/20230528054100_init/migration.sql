-- CreateTable
CREATE TABLE "attend" (
    "id" BIGSERIAL NOT NULL,
    "Name" TEXT,
    "Date" TEXT,
    "EnterTime" TEXT,
    "ExitTime" TEXT,

    CONSTRAINT "attend_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attend_management" (
    "id" BIGSERIAL NOT NULL,
    "Name" TEXT,
    "Date" DATE,
    "EnterTime" TIME(6),
    "ExitTime" TIME(6),

    CONSTRAINT "attend_management_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" BIGSERIAL NOT NULL,
    "Name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

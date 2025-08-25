-- CreateTable
CREATE TABLE "auth_codes" (
    "id" TEXT NOT NULL,
    "code" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "auth_codes_code_key" ON "auth_codes"("code");

-- AddForeignKey
ALTER TABLE "auth_codes" ADD CONSTRAINT "auth_codes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "number" INTEGER NOT NULL,
    "street" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "complement" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT 'SP',
    "country" TEXT NOT NULL DEFAULT 'BR',
    "zipCode" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "total" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "pizzas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "image" TEXT,
    "slices" INTEGER NOT NULL,
    "flavor" TEXT NOT NULL,
    "slug" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "drinks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "image" TEXT,
    "volume" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "flavor" TEXT NOT NULL,
    "slug" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "desserts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL,
    "image" TEXT,
    "size" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "flavor" TEXT NOT NULL,
    "slug" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "carts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "total" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "carts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_OrderToPizza" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_OrderToPizza_A_fkey" FOREIGN KEY ("A") REFERENCES "orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_OrderToPizza_B_fkey" FOREIGN KEY ("B") REFERENCES "pizzas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_DrinkToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_DrinkToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "drinks" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DrinkToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_DessertToOrder" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_DessertToOrder_A_fkey" FOREIGN KEY ("A") REFERENCES "desserts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_DessertToOrder_B_fkey" FOREIGN KEY ("B") REFERENCES "orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CartToPizza" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CartToPizza_A_fkey" FOREIGN KEY ("A") REFERENCES "carts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CartToPizza_B_fkey" FOREIGN KEY ("B") REFERENCES "pizzas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CartToDrink" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CartToDrink_A_fkey" FOREIGN KEY ("A") REFERENCES "carts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CartToDrink_B_fkey" FOREIGN KEY ("B") REFERENCES "drinks" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CartToDessert" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CartToDessert_A_fkey" FOREIGN KEY ("A") REFERENCES "carts" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CartToDessert_B_fkey" FOREIGN KEY ("B") REFERENCES "desserts" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "addresses_userId_key" ON "addresses"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "pizzas_slug_key" ON "pizzas"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "drinks_slug_key" ON "drinks"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "desserts_slug_key" ON "desserts"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "carts_userId_key" ON "carts"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToPizza_AB_unique" ON "_OrderToPizza"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToPizza_B_index" ON "_OrderToPizza"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DrinkToOrder_AB_unique" ON "_DrinkToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_DrinkToOrder_B_index" ON "_DrinkToOrder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_DessertToOrder_AB_unique" ON "_DessertToOrder"("A", "B");

-- CreateIndex
CREATE INDEX "_DessertToOrder_B_index" ON "_DessertToOrder"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CartToPizza_AB_unique" ON "_CartToPizza"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToPizza_B_index" ON "_CartToPizza"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CartToDrink_AB_unique" ON "_CartToDrink"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToDrink_B_index" ON "_CartToDrink"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CartToDessert_AB_unique" ON "_CartToDessert"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToDessert_B_index" ON "_CartToDessert"("B");

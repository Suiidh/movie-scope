-- CreateTable
CREATE TABLE "films" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titre" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT,
    "duree" INTEGER NOT NULL,
    "avis" REAL DEFAULT 0.0,
    "dateSortie" DATETIME NOT NULL
);
CREATE TABLE "users" (
     "id" INTEGER PRIMARY KEY AUTOINCREMENT,
     "nom_users" TEXT NOT NULL,
     "mdp" TEXT NOT NULL,
     "email" TEXT NOT NULL UNIQUE
);

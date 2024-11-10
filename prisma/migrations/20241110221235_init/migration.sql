/*
  Warnings:

  - You are about to drop the column `group` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `permission` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "group",
DROP COLUMN "permission";

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "group_name" TEXT NOT NULL,
    "form" JSONB NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" SERIAL NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnGroupsOnPermissions" (
    "user_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "addedBy" TEXT NOT NULL,

    CONSTRAINT "UsersOnGroupsOnPermissions_pkey" PRIMARY KEY ("user_id","group_id","permission_id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Component" (
    "id" SERIAL NOT NULL,
    "component" TEXT NOT NULL,

    CONSTRAINT "Component_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroupsOnComponents" (
    "group_id" INTEGER NOT NULL,
    "component_id" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GroupsOnComponents_pkey" PRIMARY KEY ("group_id","component_id")
);

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "form_values" JSONB NOT NULL,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestOnUsersOnGroups" (
    "request_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "RequestOnUsersOnGroups_pkey" PRIMARY KEY ("request_id","user_id","group_id")
);

-- AddForeignKey
ALTER TABLE "UsersOnGroupsOnPermissions" ADD CONSTRAINT "UsersOnGroupsOnPermissions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnGroupsOnPermissions" ADD CONSTRAINT "UsersOnGroupsOnPermissions_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnGroupsOnPermissions" ADD CONSTRAINT "UsersOnGroupsOnPermissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "Permission"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupsOnComponents" ADD CONSTRAINT "GroupsOnComponents_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupsOnComponents" ADD CONSTRAINT "GroupsOnComponents_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "Component"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestOnUsersOnGroups" ADD CONSTRAINT "RequestOnUsersOnGroups_request_id_fkey" FOREIGN KEY ("request_id") REFERENCES "Request"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestOnUsersOnGroups" ADD CONSTRAINT "RequestOnUsersOnGroups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestOnUsersOnGroups" ADD CONSTRAINT "RequestOnUsersOnGroups_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

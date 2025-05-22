"use server";
import isNil from "lodash/isNil";
import set from "lodash/set";
import { prisma } from "@/lib/prisma";
import { User, UserModel } from "@/data/users";
import { OmitId } from "@toolpad/core";
import { hash } from "@uswriting/bcrypt";

export const getAllUsers = async (): Promise<User[]> => {
  const users = await prisma.user.findMany({ omit: { password: true } });
  const usersWithHidePassword = users.map(
    (user) => set(user, "password", "**********") as User
  );
  return usersWithHidePassword;
};

export const getUserById = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { id },
    omit: { password: true },
  });
  if (user) {
    return set(user, "password", "") as User;
  } else {
    return null;
  }
};

export const createUser = async (user: Partial<OmitId<UserModel>>) => {
  const newUser: Omit<User, "id"> = {
    name: user.name || "",
    email: user.email || "",
    password: hash(user.password || ""),
  };
  return await prisma.user.create({ data: newUser });
};

export const update = async (id: string, user: Partial<OmitId<UserModel>>) => {
  return await prisma.user.update({
    where: { id },
    data: user,
  });
};

export const remove = async (id: string): Promise<void> => {
  if (isNil(id)) {
    throw new Error("Empty Field");
  }
  await prisma.user.delete({ where: { id } });
};

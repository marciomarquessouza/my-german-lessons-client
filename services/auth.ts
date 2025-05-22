import { User } from "@/data/users";
import { prisma } from "@/lib/prisma";
import { compare } from "@uswriting/bcrypt";

export const authWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<Omit<User, "password"> | null> => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (user?.password) {
    const isValid = compare(password, user.password);
    if (isValid) {
      return {
        name: user.name,
        email: user.email,
        id: user.id,
      };
    }
  }

  return null;
};

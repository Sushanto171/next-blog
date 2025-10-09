import { prisma } from "../../config/db";

const loginWithEmailPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User does not exist.");
  }
  if (user.password !== password) {
    throw new Error("Password does not match");
  } else {
    const { password, ...cleanUser } = user;
    return cleanUser;
  }
};

export const AuthService = {
  loginWithEmailPassword,
};

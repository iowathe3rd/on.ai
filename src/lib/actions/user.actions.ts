"use server";
import { revalidatePath } from "next/cache";
import prisma from "../db";
import { handleError } from "../utils";

export async function createUser(user: CreateUserParams) {
  try {
    const newUser = await prisma.user.create({
      data: {
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
      }
    });

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId: string) {
  try {

    const user = await prisma.user.findUnique({ where: { clerkId: userId } });

    if (!user) throw new Error('User not found');

    return user;
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {

    // Find user to delete
    const userToDelete = await prisma.user.findUnique({
      where: {
        clerkId: clerkId
      }
    });

    if (!userToDelete) {
      throw new Error('User not found');
    }

    // Delete user
    const deletedUser = await prisma.user.delete({
      where: {
        clerkId: clerkId
      }
    });
    revalidatePath('/');

    return deletedUser;
  } catch (error) {
    handleError(error);
  }
}

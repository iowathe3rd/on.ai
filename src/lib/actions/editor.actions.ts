"use server";
import { EditorState } from "@/types";
import prisma from "../db";
import { handleError } from "../utils";
import { Diagram } from "@prisma/client";
import { redirect } from "next/navigation";

type UpdateDiagramInput = {
	data: EditorState;
	name: string;
	clerkId: string;
};

type CreateDiagramInput = Omit<UpdateDiagramInput, "data">;

export async function createDiagram(input: CreateDiagramInput) {
	let diagram;
	try {
		const user = await prisma.user.findUnique({
			where: {
				clerkId: input.clerkId,
			},
		});
		if (!user) {
			return Error("User not found");
		}
		diagram = await prisma.diagram.create({
			data: {
				name: input.name,
				userId: user.id,
				data: [],
			},
		});
	} catch (error) {
		// Обрабатываем ошибку, если сохранение не удалось
		console.log(error);
		handleError(error);
	}
	redirect(`/editor/${diagram!.id}`);
}

export async function updateDiagram(
	input: UpdateDiagramInput
): Promise<Diagram | undefined> {
	try {
		// Создаем новую диаграмму в базе данных
		// Возвращаем результат сохранения
		return await prisma.diagram.create({
			data: {
				name: input.name,
				data: JSON.stringify(input.data),
				user: {
					connect: {
						clerkId: input.clerkId,
					},
				},
			},
		});
	} catch (error) {
		// Обрабатываем ошибку, если сохранение не удалось
		console.log(error);
		handleError(error);
	}
}

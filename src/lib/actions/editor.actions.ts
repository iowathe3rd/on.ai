"use server";
import { EditorState } from "@/types";
import { Diagram } from "@prisma/client";
import prisma from "../db";
import { handleError } from "../utils";

type UpdateDiagramInput = {
	id: string;
	data?: EditorState;
	name?: string;
	clerkId?: string;
};

type CreateDiagramInput = {
	data?: EditorState;
	name: string;
	clerkId: string;
};

export async function createDiagram(input: CreateDiagramInput) {
	"use server";
	try {
		const user = await prisma.user.findUnique({
			where: {
				clerkId: input.clerkId,
			},
		});
		if (!user) {
			throw new Error("User not found");
		}
		const diagram = await prisma.diagram.create({
			data: {
				name: input.name,
				userId: user.id,
				data: [],
			},
		});

		return diagram;
	} catch (error) {
		// Обрабатываем ошибку, если сохранение не удалось
		console.log(error);
		handleError(error);
		throw error; // важно выбрасывать ошибку, а не возвращать объект ошибки
	}
}

export async function updateDiagram(
	input: UpdateDiagramInput
): Promise<Diagram | undefined> {
	"use server";
	try {
		// Создаем новую диаграмму в базе данных
		// Возвращаем результат сохранения
		const diagram = await prisma.diagram.update({
			where: {
				id: input.id,
			},
			data: {
				data: JSON.stringify(input.data),
			},
		});
		return JSON.parse(JSON.stringify(diagram));
	} catch (error) {
		// Обрабатываем ошибку, если сохранение не удалось
		console.log(error);
		handleError(error);
		throw error; // важно выбрасывать ошибку, а не возвращать объект ошибки
	}
}

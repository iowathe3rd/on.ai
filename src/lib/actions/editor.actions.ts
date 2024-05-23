"use server";
import { EditorState } from "@/types";
import prisma from "../db";
import { handleError } from "../utils";
import {Diagram} from "@prisma/client";

type UpdateDiagramInput = {
	data: EditorState;
	name: string;
	userId: string;
};

type CreateDiagramInput = Omit<UpdateDiagramInput, "data">;

export async function createDiagram(input: CreateDiagramInput): Promise<Diagram | undefined> {
	try {
		return await prisma.diagram.create({
			data: {
				name: input.name,
				userId: input.userId,
				data: [],
			},
		});
	} catch (error) {
		// Обрабатываем ошибку, если сохранение не удалось
		console.log(error);
		handleError(error);
	}
}

export async function updateDiagram(input: UpdateDiagramInput): Promise<Diagram | undefined> {
	try {
		// Создаем новую диаграмму в базе данных
		// Возвращаем результат сохранения
		return await prisma.diagram.create({
			data: {
				name: input.name,
				data: JSON.stringify(input.data),
				userId: input.userId,
			},
		});
	} catch (error) {
		// Обрабатываем ошибку, если сохранение не удалось
		console.log(error);
		handleError(error);
	}
}

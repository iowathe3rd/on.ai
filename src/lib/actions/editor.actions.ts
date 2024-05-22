import { EditorState } from "@/types";
import prisma from "../db";
import { handleError } from "../utils";

type SaveDiagramInput = {
  data: EditorState;
  name: string;
  userId: string;
};

export async function saveDiagram(input: SaveDiagramInput) {
  try {
    // Создаем новую диаграмму в базе данных
    const saved = await prisma.diagram.create({
      data: {
        name: input.name,
        data: JSON.stringify(input.data),
        userId: input.userId,
      },
    });

    // Возвращаем результат сохранения
    return saved;
  } catch (error) {
    // Обрабатываем ошибку, если сохранение не удалось
    console.log(error);
    handleError(error);
    throw error; // Можно выбросить ошибку дальше для обработки в вызывающем коде
  }
}

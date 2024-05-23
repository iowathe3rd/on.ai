"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createDiagram } from "@/lib/actions/editor.actions";
import { useUser } from "@clerk/nextjs";
import {redirect} from "next/navigation";

const formSchema = z.object({
	name: z.string().min(2).max(50),
});

export default function NewDiagram() {
	const { user } = useUser();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			// Вызываем функцию создания диаграммы, передавая в неё данные из формы
			const diagram = await createDiagram({
				name: values.name,
				userId: user!.id,
			});
			console.log("Диаграмма успешно создана:", diagram);
			redirect(`/editor/${diagram!.id}`)
		} catch (error) {
			// Обрабатываем ошибку, если создание диаграммы не удалось
			console.error("Ошибка при создании диаграммы:", error);
		}
	}
	return (
		<main className='flex items-center justify-center h-full'>
			<Card>
				<CardHeader>
					<CardTitle>Создайте бота</CardTitle>
					<CardDescription>Это займет немного.</CardDescription>
				</CardHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
						<CardContent>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Имя</FormLabel>
										<FormControl>
											<Input placeholder='Введите имя для бота...' {...field} />
										</FormControl>
										<FormDescription>
											Это название будет носить ваш будущий бот!
										</FormDescription>
										<FormMessage />
									</FormItem>
								)}
							/>
						</CardContent>
						<CardFooter className='flex justify-between'>
							<Button type='submit'>Создать</Button>
						</CardFooter>
					</form>
				</Form>
			</Card>
		</main>
	);
}

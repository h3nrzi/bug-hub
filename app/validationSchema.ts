import z from 'zod';

export const issueSchema = z.object({
	title: z.string().min(1, 'عنوان مورد نیاز است.').max(255),
	description: z.string({ required_error: 'توضیحات لازم است.' })
});

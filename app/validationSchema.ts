import z from 'zod';

export const issueSchema = z.object({
  title: z.string().min(1, 'عنوان مورد نیاز است.').max(255),
  description: z.string({ required_error: 'توضیحات لازم است.' }).max(65535)
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, 'عنوان مورد نیاز است.').max(255).optional(),
  description: z
    .string({ required_error: 'توضیحات لازم است.' })
    .max(65535)
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, 'اختصاص به شناسه کاربر الزامی است')
    .max(255)
    .optional()
    .nullable()
});

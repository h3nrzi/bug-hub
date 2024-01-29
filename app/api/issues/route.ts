import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import prisma from '@/prisma/client';

const createIssueSchema = z.object({
	title: z.string().min(1).max(255),
	description: z.string().min(1)
});

export const POST = async (req: NextRequest) => {
	// PARSING BODY
	const body = await req.json();

	// VALIDATE BODY
	const validation = createIssueSchema.safeParse(body);
	if (!validation.success) {
		return NextResponse.json(validation.error.errors, { status: 400 });
	}

	// CREATING ISSUE
	const newIssue = await prisma.issue.create({
		data: {
			title: body.title,
			description: body.description
		}
	});

	// SEND RESPONSE
	return NextResponse.json(newIssue, { status: 201 });
};

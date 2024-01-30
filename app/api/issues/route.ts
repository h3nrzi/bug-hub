import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { createIssueSchema } from '../../validationSchema';

export const POST = async (req: NextRequest) => {
	// PARSING BODY
	const body = await req.json();

	// VALIDATE BODY
	const validation = createIssueSchema.safeParse(body);
	if (!validation.success) {
		return NextResponse.json(validation.error.format(), { status: 400 });
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

import { NextRequest, NextResponse } from 'next/server';
import { issueSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';

export const PATCH = async (
	request: NextRequest,
	{ params }: { params: { id: string } }
) => {
	// 1)
	const body = await request.json();

	// 2)
	const validation = issueSchema.safeParse(body);
	if (!validation.success) {
		return NextResponse.json(validation.error.format(), { status: 400 });
	}

	// 3)
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(params.id) }
	});
	if (!issue) {
		return NextResponse.json({ error: 'آیدی مشکل نامعتبر است' }, { status: 404 });
	}

	// 4)
	const updatedIssue = await prisma.issue.update({
		where: { id: issue.id },
		data: {
			title: body.title,
			description: body.description
		}
	});

	// 5
	return NextResponse.json(updatedIssue);
};

export const DELETE = async (
	request: NextRequest,
	{ params }: { params: { id: string } }
) => {
	// 1)
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(params.id) }
	});
	if (!issue)
		return NextResponse.json({ error: 'آیدی مشکل نامعتبر است' }, { status: 404 });

	// 2)
	await prisma.issue.delete({
		where: { id: issue.id }
	});

	// 3)
	return NextResponse.json({});
};

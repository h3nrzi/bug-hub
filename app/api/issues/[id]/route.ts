import { NextRequest, NextResponse } from 'next/server';
import { patchIssueSchema } from '@/app/validationSchema';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '../../auth/authOptions';

export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  // PROTECT ROUTE
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  // PARSE REQUEST BODY
  const body = await request.json();

  // VALIDATE REQUEST BODY AGAINST SCHEMA
  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  // CHECK IF ASSIGN USER EXISTS
  const { title, description, assignedToUserId } = body;
  if (assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: assignedToUserId }
    });
    if (!user) return NextResponse.json({ error: 'کاربر نامعتبر' }, { status: 400 });
  }

  // FIND ISSUE BY ID
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  });
  if (!issue) {
    return NextResponse.json({ error: 'باگ نامعتبر' }, { status: 404 });
  }

  // UPDATE THE ISSUE
  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      assignedToUserId
    }
  });

  // RETURN RESPONSE
  return NextResponse.json(updatedIssue);
};

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  // PROTECT ROUTE
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  // FIND THE ISSUE BY ID
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  });
  if (!issue) return NextResponse.json({ error: 'باگ نامعتبر' }, { status: 404 });

  // DELETE THE ISSUE
  await prisma.issue.delete({
    where: { id: issue.id }
  });

  // RETURN RESPONSE
  return NextResponse.json({});
};

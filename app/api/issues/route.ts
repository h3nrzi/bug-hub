import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { issueSchema } from '../../validationSchema';
import { getServerSession } from 'next-auth';
import authOptions from '../auth/authOptions';

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({}, { status: 401 });

  // PARSING BODY
  const body = await req.json();

  // VALIDATE BODY
  const validation = issueSchema.safeParse(body);
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

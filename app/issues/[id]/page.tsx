import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import IssueDetails from './IssueDetails';
import EditIssueButton from './EditIssueButton';
import DeleteIssueButton from './DeleteIssueButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/api/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';
import { cache } from 'react';

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({ where: { id: issueId } }));

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);

  // FIXME:
  // if (typeof params.id !== 'number') notFound();

  const issue = await fetchUser(parseInt(params.id));
  if (!issue) notFound();

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="4">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Flex gap="4" direction="column">
          <AssigneeSelect issue={issue} />
          <EditIssueButton issueId={issue.id} />
          <DeleteIssueButton issueId={issue.id} />
        </Flex>
      )}
    </Grid>
  );
};

export const generateMetadata = async ({ params }: Props) => {
  const issues = await fetchUser(parseInt(params.id));

  return {
    title: issues?.title,
    description: issues?.description
  };
};
export default IssueDetailPage;

import prisma from '@/prisma/client';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import { Card, Flex, Grid } from '@radix-ui/themes';
import IssueChart from './IssueChart';

const Home = async ({ searchParams }: { searchParams: { page: string } }) => {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } });
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });
  const data = { open, inProgress, closed };

  return (
    <Card>
      <Grid columns={{ initial: '1', md: '2' }} gap="6">
        <Flex direction="column" gap="9">
          <IssueSummary {...data} />
          <IssueChart {...data} />
        </Flex>
        <LatestIssues />
      </Grid>
    </Card>
  );
};

export default Home;

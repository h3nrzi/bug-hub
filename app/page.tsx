import prisma from '@/prisma/client';
import IssueSummary from './IssueSummary';
import LatestIssues from './LatestIssues';
import { Card, Flex } from '@radix-ui/themes';

const Home = async ({ searchParams }: { searchParams: { page: string } }) => {
	const open = await prisma.issue.count({ where: { status: 'OPEN' } });
	const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } });
	const closed = await prisma.issue.count({ where: { status: 'CLOSED' } });

	return (
		<Card>
			<Flex direction="column" gap="9">
				<IssueSummary open={open} inProgress={inProgress} closed={closed} />
				<LatestIssues />
			</Flex>
		</Card>
	);
};

export default Home;

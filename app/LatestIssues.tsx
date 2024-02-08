import prisma from '@/prisma/client';
import { Avatar, Box, Card, Flex, Heading, Table } from '@radix-ui/themes';
import Link from 'next/link';
import { IssueStatusBadge } from './components';

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: 'desc' },
    take: 6,
    include: { assignedToUser: true }
  });

  return (
    <Box>
      <Heading size="4" mb="5" className="text-center">
        آخرین باگ ها
      </Heading>
      <Table.Root variant="surface">
        <Table.Body dir="rtl">
          {issues.map((i) => (
            <Table.Row key={i.id}>
              <Table.Cell>
                <Flex justify="between">
                  <Flex direction="column" gap="2" align="start">
                    <Link
                      className="hover:underline hover:text-purple-800 transition-colors"
                      href={'/issues/' + i.id}
                    >
                      {i.title}
                    </Link>
                    <IssueStatusBadge status={i.status} />
                  </Flex>
                  <Avatar
                    className="cursor-pointer"
                    src={i.assignedToUser?.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                    referrerPolicy="no-referrer"
                  />
                </Flex>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
};

export default LatestIssues;

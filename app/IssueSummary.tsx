import { Status } from '@prisma/client';
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
  const statuses: {
    label: string;
    value: number;
    status: Status;
  }[] = [
    { label: 'به اتمام رسیده', value: closed, status: 'CLOSED' },
    { label: 'در دست اقدام', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'جدید', value: open, status: 'OPEN' }
  ];
  return (
    <Box>
      <Heading size="4" mb="5" className="text-center">
        آمار
      </Heading>
      <Flex gap="6" justify="center">
        {statuses.map((s) => (
          <Card key={s.label} className="w-36 hover:text-purple-800 transition-colors">
            <Link href={'/issues/list?status=' + s.status}>
              <Flex direction="column" className="text-center">
                <Text className="font-medium sm:text-lg">{s.label}</Text>
                <Text className="font-extrabold sm:text-2xl">{s.value}</Text>
              </Flex>
            </Link>
          </Card>
        ))}
      </Flex>
    </Box>
  );
};

export default IssueSummary;

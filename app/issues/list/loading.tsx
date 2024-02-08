import { Skeleton } from '@/app/components';
import { Flex, Table, TableColumnHeaderCell } from '@radix-ui/themes';
import IssueActions from './IssueActions';

const LoadingIssuesPage = () => {
  const issues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16, 17];

  return (
    <Flex direction="column" gap="4">
      <IssueActions />

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <TableColumnHeaderCell className="hidden md:table-cell" justify="end">
              ایجاد شده
            </TableColumnHeaderCell>
            <TableColumnHeaderCell className="hidden md:table-cell" justify="end">
              وضعیت
            </TableColumnHeaderCell>
            <TableColumnHeaderCell justify="end">عنوان</TableColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell className="hidden md:table-cell" justify="end">
                <Skeleton />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell" justify="end">
                <Skeleton />
              </Table.Cell>
              <Table.Cell justify="end">
                <Skeleton />
                <div className="block md:hidden mt-2">
                  <Skeleton width="25%" />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Flex>
  );
};

export default LoadingIssuesPage;

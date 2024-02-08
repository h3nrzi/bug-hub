import { IssueStatusBadge } from '@/app/components';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon, DividerHorizontalIcon } from '@radix-ui/react-icons';
import { Table } from '@radix-ui/themes';
import NextLink from 'next/link';

export interface IssueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  const params = new URLSearchParams();
  if (searchParams.status) params.append('status', searchParams.status);
  const query = params.size ? '?' + params.toString() : '';

  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {columns.map((c) => (
            <Table.ColumnHeaderCell className={c.className} key={c.value} justify="end">
              {c.value === searchParams.orderBy ? (
                <NextLink href={'/issues/list' + query}>
                  <ArrowUpIcon className="inline me-2" />
                  {c.label}
                </NextLink>
              ) : (
                <NextLink href={{ query: { ...searchParams, orderBy: c.value } }}>
                  <DividerHorizontalIcon className="inline me-2" />
                  {c.label}
                </NextLink>
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell className="hidden md:table-cell" justify="end">
              {issue.createdAt.toLocaleDateString()}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell" justify="end">
              <IssueStatusBadge status={issue.status} />
            </Table.Cell>
            <Table.Cell justify="end">
              <NextLink
                className="hover:underline hover:text-purple-800 transition-colors"
                href={`/issues/${issue.id}`}
              >
                {issue.title}
              </NextLink>
              <div className="block md:hidden mt-2">
                <IssueStatusBadge status={issue.status} />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  { label: 'ایجاد شده در', value: 'createdAt', className: 'hidden md:table-cell' },
  { label: 'وضعیت', value: 'status', className: 'hidden md:table-cell' },
  { label: 'عنوان', value: 'title' }
];

export const columnNames = columns.map((c) => c.value);
export default IssueTable;

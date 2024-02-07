import { IssueStatusBadge, Link } from '@/app/components';
import prisma from '@/prisma/client';
import { Table } from '@radix-ui/themes';
import IssueActions from './IssueActions';
import { Issue, Status } from '@prisma/client';

interface Props {
	searchParams: { status: Status };
}

const IssuesPage = async ({ searchParams }: Props) => {
	const statuses = Object.values(Status);
	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined;

	const issues: Issue[] = await prisma.issue.findMany({
		where: { status: status }
	});

	return (
		<div>
			<IssueActions />

			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell className="hidden md:table-cell" justify="end">
							ایجاد شده در تاریخ
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="hidden md:table-cell" justify="end">
							وضعیت
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell justify="end">عنوان</Table.ColumnHeaderCell>
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
								<Link href={`/issues/${issue.id}`}>{issue.title}</Link>
								<div className="block md:hidden mt-2">
									<IssueStatusBadge status={issue.status} />
								</div>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	);
};

export const dynamic = 'force-dynamic';
export default IssuesPage;

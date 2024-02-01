import prisma from '@/prisma/client';
import { Table, TableColumnHeaderCell } from '@radix-ui/themes';
import IssueStatusBadge from '../components/IssueStatusBadge';
import delay from 'delay';
import IssueActions from './IssueActions';
import Link from 'next/link';

const IssuesPage = async () => {
	const issues = await prisma.issue.findMany();
	// FIXME:
	await delay(500);

	return (
		<div>
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

export default IssuesPage;

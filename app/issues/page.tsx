import prisma from '@/prisma/client';
import { Button, Table, TableCell, TableColumnHeaderCell } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusBadge from '../components/IssueStatusBadge';

const IssuesPage = async () => {
	const issues = await prisma.issue.findMany();

	return (
		<div>
			<div className="mb-5">
				<Button>
					<Link href="/issues/new">مشکل جدید</Link>
				</Button>
			</div>

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
								{issue.title}
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

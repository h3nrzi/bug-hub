import { IssueStatusBadge, Link } from '@/app/components';
import prisma from '@/prisma/client';
import { Box, Table } from '@radix-ui/themes';
import IssueActions from './IssueActions';
import { Issue, Status } from '@prisma/client';
import NextLink from 'next/link';
import { ArrowDownIcon, ArrowUpIcon } from '@radix-ui/react-icons';
import Pagination from '@/app/components/Pagination';

interface Props {
	searchParams: {
		status: Status;
		orderBy: keyof Issue;
		page: string;
	};
}

const IssuesPage = async ({ searchParams }: Props) => {
	//
	const columns: { label: string; value: keyof Issue; className?: string }[] = [
		{ label: 'ایجاد شده در', value: 'createdAt', className: 'hidden md:table-cell' },
		{ label: 'وضعیت', value: 'status', className: 'hidden md:table-cell' },
		{ label: 'عنوان', value: 'title' }
	];

	//
	const statuses = Object.values(Status);
	const status = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined;

	//
	const where = { status: status };

	//
	const orderBy = columns.map((c) => c.value).includes(searchParams.orderBy)
		? { [searchParams.orderBy]: 'asc' }
		: undefined;

	//
	const page = parseInt(searchParams.page) || 1;
	const pageSize = 5;

	//
	const issues: Issue[] = await prisma.issue.findMany({
		where: where,
		orderBy: orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize
	});

	//
	const issueCount = await prisma.issue.count({ where: where });

	return (
		<Box>
			<IssueActions />
			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						{columns.map((c) => (
							<Table.ColumnHeaderCell
								className={c.className}
								key={c.value}
								justify="end"
							>
								{c.value === searchParams.orderBy ? (
									<ArrowUpIcon className="inline" />
								) : (
									<ArrowDownIcon className="inline" />
								)}
								<NextLink href={{ query: { ...searchParams, orderBy: c.value } }}>
									{c.label}
								</NextLink>
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
								<Link href={`/issues/${issue.id}`}>{issue.title}</Link>
								<div className="block md:hidden mt-2">
									<IssueStatusBadge status={issue.status} />
								</div>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>

			<Pagination pageSize={pageSize} currentPage={page} itemCount={issueCount} />
		</Box>
	);
};

export const dynamic = 'force-dynamic';
export default IssuesPage;

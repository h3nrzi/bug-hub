import { Table, TableColumnHeaderCell } from '@radix-ui/themes';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import IssueActions from './IssueActions';

const LoadingIssuesPage = () => {
	const issues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
									<Skeleton />
								</div>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	);
};

export default LoadingIssuesPage;

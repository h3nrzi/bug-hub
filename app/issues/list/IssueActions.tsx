import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import IssueStatusFilter from './IssueStatusFilter';

const IssueActions = () => {
	return (
		<Flex mb="5" justify="between">
			<IssueStatusFilter />
			<Button>
				<Link href="/issues/new">ایجاد کردن باگ جدید</Link>
			</Button>
		</Flex>
	);
};

export default IssueActions;

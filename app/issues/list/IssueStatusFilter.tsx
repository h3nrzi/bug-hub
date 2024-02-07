'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';

const status: { label: string; value?: Status }[] = [
	{ label: 'All' },
	{ label: 'Open', value: 'OPEN' },
	{ label: 'In Progress', value: 'IN_PROGRESS' },
	{ label: 'Closed', value: 'CLOSED' }
];

const IssueStatusFilter = () => {
	const router = useRouter();
	return (
		<Select.Root
			onValueChange={(status) => {
				const queryString = status ? `?status=${status}` : '';
				router.push(`/issues/list${queryString}`);
			}}
		>
			<Select.Trigger variant="soft" />
			<Select.Content>
				{status.map((s) => (
					<Select.Item key={s.value} value={s.value || ''}>
						{s.label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
};

export default IssueStatusFilter;

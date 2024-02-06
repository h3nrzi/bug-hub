'use client';

import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
	const {
		data: users,
		error,
		isLoading
	} = useQuery({
		queryKey: ['users'],
		queryFn: () => axios.get<User[]>('/api/users').then((res) => res.data),
		staleTime: 60 * 1000, //60s
		retry: 3
	});

	if (isLoading) return <Skeleton height="2rem" />;
	if (error) return null;

	return (
		<Select.Root
			defaultValue={issue.assignedToUserId || ''}
			dir="rtl"
			onValueChange={(userId) => {
				axios.patch('/api/issues/' + issue.id, { assignedToUserId: userId || null });
			}}
		>
			<Select.Trigger />

			<Select.Content>
				<Select.Group dir="rtl">
					<Select.Label>پیشنهادها</Select.Label>

					<Select.Item value="">واگذار نشده</Select.Item>

					{users?.map((user) => (
						<Select.Item key={user.id} value={user.id}>
							{user.name}
						</Select.Item>
					))}
				</Select.Group>
			</Select.Content>
		</Select.Root>
	);
};

export default AssigneeSelect;

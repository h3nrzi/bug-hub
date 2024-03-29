'use client';

import { Issue, User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import toast, { Toaster } from 'react-hot-toast';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
  const { data: users, error, isLoading } = useUsers();

  if (isLoading) return <Skeleton height="2rem" />;
  if (error) return null;

  const assignIssue = (userId: string) => {
    axios
      .patch('/api/issues/' + issue.id, {
        assignedToUserId: userId || null
      })
      .then(() => toast.success('تغییرات ذخیره شد'))
      .catch(() => toast.error('تغییرات ذخیره نشد'));
  };

  return (
    <>
      <Toaster></Toaster>

      <Select.Root
        defaultValue={issue.assignedToUserId || ''}
        dir="rtl"
        onValueChange={(userId) => assignIssue(userId)}
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
    </>
  );
};

const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => axios.get<User[]>('/api/users').then((res) => res.data),
    // staleTime: 60 * 1000, //60s
    retry: 3
  });

export default AssigneeSelect;

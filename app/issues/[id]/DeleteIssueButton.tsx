'use client';

import { Spinner } from '@/app/components';
import { TrashIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	const router = useRouter();
	const [error, setError] = useState(false);
	const [isDeleting, setDeleting] = useState(false);

	const deleteIssue = async () => {
		try {
			setDeleting(true);
			await axios.delete('/api/issues/' + issueId);
			router.push('/issues');
			router.refresh();
		} catch (error) {
			setDeleting(false);
			setError(true);
		}
	};

	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button color="red" disabled={isDeleting}>
						<TrashIcon />
						حذف
						{isDeleting && <Spinner />}
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Title>عملیات حذف را تایید کنید.</AlertDialog.Title>
					<AlertDialog.Description>
						آیا مطمئن هستید که می خواهید این باگ را حذف کنید؟ این عمل قابل بازگشت
						نیست.
					</AlertDialog.Description>
					<Flex mt="4" gap="3">
						<AlertDialog.Cancel>
							<Button variant="soft" color="gray">
								انصراف
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button color="red" onClick={() => deleteIssue()}>
								تایید
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>

			<AlertDialog.Root open={error}>
				<AlertDialog.Content>
					<AlertDialog.Title>خطا</AlertDialog.Title>
					<AlertDialog.Description>
						عملیات حذف صورت نگرفت! لطفا دوباره امتحان کنید.
					</AlertDialog.Description>
					<Button color="gray" variant="soft" mt="2" onClick={() => setError(false)}>
						اوکی!
					</Button>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	);
};

export default DeleteIssueButton;

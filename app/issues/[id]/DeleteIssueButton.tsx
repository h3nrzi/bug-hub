'use client';

import { TrashIcon } from '@radix-ui/react-icons';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	return (
		<AlertDialog.Root>
			<AlertDialog.Trigger>
				<Button color="red">
					<TrashIcon />
					حذف
				</Button>
			</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Title>عملیات حذف را تایید کنید.</AlertDialog.Title>
				<AlertDialog.Description>
					آیا مطمئن هستید که می خواهید این باگ را حذف کنید؟ این عمل قابل بازگشت نیست.
				</AlertDialog.Description>
				<Flex mt="4" gap="3">
					<AlertDialog.Cancel>
						<Button variant="soft" color="gray">
							انصراف
						</Button>
					</AlertDialog.Cancel>
					<AlertDialog.Action>
						<Button color="red">تایید</Button>
					</AlertDialog.Action>
				</Flex>
			</AlertDialog.Content>
		</AlertDialog.Root>
	);
};

export default DeleteIssueButton;

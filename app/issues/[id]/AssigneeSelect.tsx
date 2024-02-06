'use client';

import { Select } from '@radix-ui/themes';

const AssigneeSelect = () => {
	return (
		<Select.Root defaultValue="1">
			<Select.Trigger />

			<Select.Content>
				<Select.Group dir="rtl">
					<Select.Label>پیشنهادها</Select.Label>

					<Select.Item value="1" dir="ltr">
						Mosh Hamedani
					</Select.Item>
				</Select.Group>
			</Select.Content>
		</Select.Root>
	);
};

export default AssigneeSelect;

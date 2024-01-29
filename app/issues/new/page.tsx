'use client';

import { TextArea, TextField, Button } from '@radix-ui/themes';

const page = () => {
	return (
		<div className="max-w-xl space-y-3">
			<TextField.Root>
				<TextField.Input placeholder="عنوان" style={{ padding: '5px' }} />
			</TextField.Root>
			<TextArea placeholder="شرح..." />
			<Button>ارسال مشکل جدید</Button>
		</div>
	);
};

export default page;

'use client';

import { TextField, Button } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useMemo } from 'react';

const IssuePage = () => {
	const options = useMemo(() => {
		return {
			autofocus: true,
			spellChecker: false
		};
	}, []);

	return (
		<div className="max-w-xl space-y-3">
			<TextField.Root>
				<TextField.Input placeholder="عنوان" style={{ padding: '5px' }} />
			</TextField.Root>
			<SimpleMDE placeholder="شرح" options={options} style={{ textAlign: 'right' }} />
			<Button>ارسال مشکل جدید</Button>
		</div>
	);
};

export default IssuePage;

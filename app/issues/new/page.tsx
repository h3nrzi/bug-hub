'use client';

import { useRouter } from 'next/navigation';
import { Button, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import { Controller, useForm } from 'react-hook-form';
import axios from 'axios';
import { useMemo } from 'react';
import 'easymde/dist/easymde.min.css';

interface IssueForms {
	title: string;
	description: string;
}

const IssuePage = () => {
	const router = useRouter();
	const { register, control, handleSubmit } = useForm<IssueForms>();

	const optionsSimpleMDE = useMemo(() => {
		return {
			autofocus: true,
			spellChecker: false
		};
	}, []);

	const onSubmit = async (data: IssueForms) => {
		await axios.post('/api/issues', data);
		router.push('/issues');
	};

	return (
		<form className="max-w-xl space-y-3" onSubmit={handleSubmit(onSubmit)}>
			<TextField.Root>
				<TextField.Input placeholder="عنوان" style={{ padding: '5px' }} {...register('title')} />
			</TextField.Root>
			<Controller
				name="description"
				control={control}
				render={({ field }) => (
					<SimpleMDE
						placeholder="شرح"
						options={optionsSimpleMDE}
						style={{ textAlign: 'right' }}
						{...field}
					/>
				)}
			/>
			<Button>ارسال مشکل جدید</Button>
		</form>
	);
};

export default IssuePage;

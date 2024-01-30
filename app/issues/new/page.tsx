'use client';

import { useRouter } from 'next/navigation';
import { Button, Callout, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import { Controller, useForm } from 'react-hook-form';
import axios, { AxiosError } from 'axios';
import { useMemo, useState } from 'react';
import 'easymde/dist/easymde.min.css';

interface IssueForms {
	title: string;
	description: string;
}

const NewIssuePage = () => {
	const router = useRouter();
	const { register, control, handleSubmit } = useForm<IssueForms>();
	const [error, setError] = useState('');

	const optionsSimpleMDE = useMemo(() => {
		return {
			autofocus: true,
			spellChecker: false
		};
	}, []);

	const onSubmit = async (data: IssueForms) => {
		try {
			await axios.post('/api/issues', data);
			router.push('/issues');
		} catch (error) {
			setError('یک خطای غیرمنتظره رخ داد!');
		}
	};

	return (
		<div className="max-w-xl">
			{error && (
				<Callout.Root color="red" className="mb-5">
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
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
		</div>
	);
};

export default NewIssuePage;

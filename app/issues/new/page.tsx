'use client';

import { useRouter } from 'next/navigation';
import { Button, Callout, TextField, Text } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useMemo, useState } from 'react';
import 'easymde/dist/easymde.min.css';
import { z } from 'zod';
import { createIssueSchema } from '../../validationSchema';
import ErrorMessage from '@/app/components/ErrorMessage';

type IssueForms = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
	const router = useRouter();
	const [error, setError] = useState('');

	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<IssueForms>({
		resolver: zodResolver(createIssueSchema)
	});

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
				<ErrorMessage>{errors.title?.message}</ErrorMessage>

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
				<ErrorMessage>{errors.description?.message}</ErrorMessage>

				<Button>ارسال مشکل جدید</Button>
			</form>
		</div>
	);
};

export default NewIssuePage;

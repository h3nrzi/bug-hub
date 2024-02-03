'use client';

import { useRouter } from 'next/navigation';
import { Button, Callout, TextField } from '@radix-ui/themes';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useMemo, useState } from 'react';
import 'easymde/dist/easymde.min.css';
import { z } from 'zod';
import { createIssueSchema } from '../../validationSchema';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import dynamic from 'next/dynamic';
import { Issue } from '@prisma/client';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false });

type IssueFormsData = z.infer<typeof createIssueSchema>;

const IssueFrom = ({ issue }: { issue?: Issue }) => {
	const router = useRouter();
	const [error, setError] = useState('');
	const [isSubmitting, setSubmitting] = useState(false);

	const {
		register,
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<IssueFormsData>({
		resolver: zodResolver(createIssueSchema)
	});

	const optionsSimpleMDE = useMemo(() => {
		return {
			autofocus: true,
			spellChecker: false
		};
	}, []);

	const onSubmit = async (data: IssueFormsData) => {
		try {
			setSubmitting(true);
			await axios.post('/api/issues', data);
			router.push('/issues');
		} catch (error) {
			setSubmitting(false);
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
					<TextField.Input
						defaultValue={issue?.title}
						placeholder="عنوان"
						style={{ padding: '5px' }}
						{...register('title')}
					/>
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
					defaultValue={issue?.description}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>

				<Button disabled={isSubmitting}>ارسال مشکل جدید {isSubmitting && <Spinner />}</Button>
			</form>
		</div>
	);
};

export default IssueFrom;

'use client';

import { Skeleton } from '@/app/components';
import { Box } from '@radix-ui/themes';

const IssueFormSkeleton = () => {
	return (
		<Box className="max-w-xl">
			<Skeleton height="2rem" />
			<Skeleton height="24rem" />
			<Skeleton height="2rem" width="4rem" />
		</Box>
	);
};

export default IssueFormSkeleton;

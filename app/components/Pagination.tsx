import {
	ChevronLeftIcon,
	ChevronRightIcon,
	DoubleArrowLeftIcon,
	DoubleArrowRightIcon
} from '@radix-ui/react-icons';
import { Button, Flex, Text } from '@radix-ui/themes';

interface Props {
	itemCount: number;
	pageSize: number;
	currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
	const pageCount = Math.ceil(itemCount / pageSize);
	if (pageCount <= 1) return null;

	return (
		<Flex align="center" gap="2">
			<Text size="2">
				صفحه {currentPage} از {pageCount}
			</Text>
			<Button variant="surface" disabled={currentPage === 1}>
				<DoubleArrowRightIcon />
			</Button>
			<Button variant="surface" disabled={currentPage === 1}>
				<ChevronRightIcon />
			</Button>
			<Button variant="surface" disabled={currentPage === pageCount}>
				<ChevronLeftIcon />
			</Button>
			<Button variant="surface" disabled={currentPage === pageCount}>
				<DoubleArrowLeftIcon />
			</Button>
		</Flex>
	);
};

export default Pagination;

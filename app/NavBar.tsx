'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';
import { useSession } from 'next-auth/react';
import {
	Avatar,
	Box,
	Button,
	Container,
	DropdownMenu,
	Flex,
	Text
} from '@radix-ui/themes';

const NavBar = () => {
	const currentPath = usePathname();
	const { status, data: session } = useSession();

	const links = [
		{ label: 'داشبورد', href: '/' },
		{ label: 'باگ ها', href: '/issues/list' }
	];

	return (
		<nav className="border-b mb-5 py-4 px-6 h-14">
			<Container>
				<Flex justify="between" align="center">
					<Flex gap="6" align="center">
						<Link href="/">
							<AiFillBug />
						</Link>
						<ul className="flex gap-6">
							{links.map((link) => (
								<li key={link.href}>
									<Link
										href={link.href}
										className={classnames({
											'text-zinc-900': link.href === currentPath,
											'text-zinc-500': link.href !== currentPath,
											'hover:text-zinc-800 transition-colors': true
										})}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</Flex>
					<Box>
						{status === 'authenticated' && (
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<Avatar
										className="cursor-pointer"
										src={session.user!.image!}
										fallback="!"
										size="2"
										radius="full"
									/>
								</DropdownMenu.Trigger>

								<DropdownMenu.Content>
									<DropdownMenu.Label>
										<Text size="2">{session.user!.email}</Text>
									</DropdownMenu.Label>

									<DropdownMenu.Item dir="rtl">
										<Link href="/api/auth/signout" className="w-full cursor-pointer">
											خروج
										</Link>
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						)}
						{status === 'unauthenticated' && (
							<Link href="/api/auth/signin">ثبت نام / ورود</Link>
						)}
					</Box>
				</Flex>
			</Container>
		</nav>
	);
};

export default NavBar;

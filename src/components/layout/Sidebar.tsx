"use client";

import { navLinks } from "@/data";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";

const Sidebar = () => {
	const pathname = usePathname();
	return (
		<aside className='bg-background-300 hidden h-screen w-72 flex-col justify-between p-5 border border-border shadow-md lg:flex'>
			<div className='flex size-full flex-col gap-4'>
				<nav className='h-full flex-col justify-between md:flex md:gap-4'>
					<SignedIn>
						<ul className='hidden w-full flex-col items-start gap-2 md:flex'>
							{navLinks.slice(0, 6).map((link) => {
								const isActive = link.route === pathname;

								return (
									<li key={link.route} className='w-full'>
										<Button
											asChild
											variant={isActive ? "default" : "ghost"}
											className='flex w-full justify-start'
										>
											<Link
												className='p-16-semibold flex size-full gap-4 p-4'
												href={link.route}
											>
												<Image
													src={link.icon}
													width={25}
													alt={link.route}
													height={25}
													color={isActive ? "white" : undefined}
												/>
												{link.label}
											</Link>
										</Button>
									</li>
								);
							})}
						</ul>

						<ul className='hidden w-full flex-col items-start gap-2 md:flex'>
							{navLinks.slice(6).map((link) => {
								const isActive = link.route === pathname;

								return (
									<li key={link.route} className='w-full'>
										<Button
											asChild
											variant={isActive ? "default" : "ghost"}
											className='flex w-full justify-start'
										>
											<Link
												className='p-16-semibold flex size-full gap-4 p-4'
												href={link.route}
											>
												<Image
													src={link.icon}
													width={25}
													alt={link.route}
													height={25}
												/>
												{link.label}
											</Link>
										</Button>
									</li>
								);
							})}

							<li className='flex cursor-pointer flex-row-reverse items-center justify-center gap-2 p-4'>
								<UserButton afterSignOutUrl='/' showName />
							</li>
						</ul>
					</SignedIn>

					<SignedOut>
						<Button asChild>
							<Link href='/sign-in'>Войти</Link>
						</Button>
					</SignedOut>
				</nav>
			</div>
		</aside>
	);
};

export default Sidebar;

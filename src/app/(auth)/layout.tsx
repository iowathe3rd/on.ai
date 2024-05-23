import { PropsWithChildren } from "react";

export default function AuthLayout(props: PropsWithChildren) {
	return (
		<div className='container flex items-center justify-center h-screen'>
			{props.children}
		</div>
	);
}

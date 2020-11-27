import { useRouter } from "next/router";
import { Fragment, useState } from "react";

function Router(props: { on: string; component: JSX.Element }) {
	return props.component;
}

function ShallowQuery({
	default: _default,
	selector,
	children,
}: {
	selector: string;
	children: React.ReactNode[];
	default: JSX.Element;
}): JSX.Element {
	const router = useRouter();
	const [queryList] = useState<any>(() =>
		(children as any).map((child: any) => child.props.on)
	);

	return (
		<>
			{queryList.includes(router.query[selector])
				? (children as any).map((child: any, index: number) => {
						if (child.props.on === router.query[selector]) {
							return <Fragment key={index}>{child.props.component}</Fragment>;
						}
						return null;
				  })
				: _default}
		</>
	);
}

export { Router, ShallowQuery };

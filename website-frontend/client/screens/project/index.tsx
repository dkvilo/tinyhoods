import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";

import { useQuery } from "@apollo/react-hooks";
import { isEmpty } from "ramda";

import PostLoader from "../../components/PostLoader";

import { ShallowQuery, Router } from "../../components/ShallowRouter";

import { GET_USER_PROJECTS } from "./query";
import { UserTokenContext } from "../../context";

import EmptyCard from "../../components/EmptyCard";
import ProjectItem from "../../components/project";

export default function Project({
	username,
}: {
	username: string;
}): JSX.Element {
	const [page, setPage] = useState(1);

	const { state: loginState } = useContext(UserTokenContext);

	const { loading, data, error, refetch } = useQuery(GET_USER_PROJECTS, {
		fetchPolicy: "network-only",
		variables: {
			page,
			username,
      token: loginState.isLogin ? loginState.token : null
		},
	});

	const observer = useRef<any>();
	const lastPostElementRef = useCallback(
		(node) => {
			if (loading) return;
			if (observer.current) observer.current.disconnect();
			observer.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && data.getUserProjects.nextPage) {
					setPage(data.getUserProjects.nextPage);
				}
			});
			if (node) observer.current.observe(node);
		},
		[loading]
	);

	// cache posts in memory
	const [projects, setProjects] = useState<[]>([]);
	useEffect(() => {
		if (!loading && !error) {
			setProjects(
				(prevProjects) =>
					[...new Set([...prevProjects, ...data.getUserProjects.docs])] as any
			);
		}
	}, [loading, error, data]);

	useEffect(() => {
		if (loginState.isLogin) {
			setProjects([]);
			setPage(1);
			refetch({
        token: loginState.isLogin ? loginState.token : null,
				page,
				username,
			});
		}
	}, [loginState.isLogin]);

	if (!loading && error) {
		return (
			<>
				{JSON.parse(JSON.stringify(error as any)).graphQLErrors.map(
					(err: string, index: number) => (
						<EmptyCard key={index} message={err} />
					)
				)}
			</>
		);
	}

	return (
		<>
			<ShallowQuery
				selector="tab"
				default={
					<div className="h-screen">
						{(projects as any).map((item: any, index: number) => {
							if ((projects as any).length === index + 1) {
								return (
									<div key={index} ref={lastPostElementRef}>
										<ProjectItem {...item} />
									</div>
								);
							}
							return (
								<div key={index}>
									<ProjectItem {...item} />
								</div>
							);
						})}
						{!loading && !error && isEmpty(projects) && (
							<EmptyCard
								message={`Looks like @${username} has not any project yet.`}
							/>
						)}
						{loading &&
							!error &&
							Array(3)
								.fill(0)
								.map((_, index) => (
									<div key={index} className="flex flex-col w-full">
										{/* TODO: ProjectsLoader */}
										<PostLoader index={index} />
									</div>
								))}
					</div>
				}
			>
				<Router component={<div />} on="empty" />
				<Router
					on="project"
					component={
						<>
							<h1>Selected Project Shallow View</h1>
							{/* {selectedPost && typeof window !== "undefined" ? (
								<Detailed {...selectedPost} onImageClick={openLightBox} />
							) : (
								<ShallowRedirect href={`/post/${router.query.id}`} />
							)} */}
						</>
					}
				/>
			</ShallowQuery>
		</>
	);
}

export const config = {
	amp: true,
};

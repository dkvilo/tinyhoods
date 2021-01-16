import EditUserProfileCard from "../EditUserProfileCard";
import AuthCard from "../AuthCard";
import { UserTokenContext } from "../../context";
import { useContext } from "react";

export default function LSidebar(): JSX.Element {
	const { state: loginState } = useContext<any>(UserTokenContext);

	return (
		<div className="w-full mt-4">
			<div className="sticky" style={{ top: 20 }}>
				{loginState.isLogin ? <EditUserProfileCard /> : <AuthCard />}
			</div>
		</div>
	);
}

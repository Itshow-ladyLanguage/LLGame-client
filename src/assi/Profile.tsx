interface ProfileProps {
	rank: number | string;
	imgSrc: string;
	name: string;
	score: number;
	description: string;
	rankColor?: string; // 선택적 props, 기본값 블랙
}

export default function Profile(props: ProfileProps) {
	return (
		<div
			style={{
				background: "#ffffff",
				width: "1087px",
                height: "110px",
				border: "2px solid #7a1d36",
				borderRadius: "20px",
				display: "flex",
				alignItems: "center",
				marginBottom: "23px",
			}}
		>
			<p
				style={{
					width: "60px",
					fontSize: "28px",
					marginLeft: "31px",
					color: props.rankColor || "#000000",
					fontWeight: "bold",
				}}
			>
				{props.rank}
			</p>
			<img
				src={props.imgSrc}
				alt="profile"
				style={{
					width: "93px",
					height: "93px",
					marginLeft: "80px",
					objectFit: "cover", // 이미지를 비율 유지 & 꽉 채우게
    				borderRadius: "50px",
				}}
			/>
			<p
				style={{
					fontSize: "28px",
					marginLeft: "39px",
					fontWeight: "bold",
				}}
			>
				{props.name}
			</p>
			<p
				style={{
					fontSize: "25px",
					marginLeft: "8px",
					fontWeight: "bold",
				}}
			>
				({props.score}점)
			</p>
			<p
				style={{
					fontSize: "28px",
					marginLeft: "auto",
					marginRight: "44.5px",
					fontWeight: "500",
				}}
			>
				{props.description}
			</p>
		</div>
	);
}

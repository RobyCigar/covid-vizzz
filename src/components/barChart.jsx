import { useEffect, useRef } from "react";
import Chart from "chart.js";

export default function Graph({
	data,
	labels,
	country
}) {
	const graphRef = useRef(null);


	useEffect(() => {
		if (graphRef.current) {
			const ctx = graphRef.current.getContext("2d");

			var blueGrd = ctx.createLinearGradient(0, 500, 0, 0);
			blueGrd.addColorStop(0, "blue");
			blueGrd.addColorStop(1, "white");

			var yellowGrd = ctx.createLinearGradient(0, 500, 0, 0);
			yellowGrd.addColorStop(0, "yellow");
			yellowGrd.addColorStop(1, "white");

			var redGrd = ctx.createLinearGradient(0, 500, 0, 0);
			redGrd.addColorStop(0, "red");
			redGrd.addColorStop(1, "white");

			new Chart(ctx, {
				type: "bar",
				data: {
					labels: ["Confirmed", "Recovery", "Death"],
					datasets: [
						{
							label: false,
							data: data,
							backgroundColor: [yellowGrd, blueGrd, redGrd],
							borderColor: "#00000077",
							borderWidth: 2,
							hoverBorderColor: "black",
							hoverBackgroundColor: ["#FBF937", "#8888FF", "#FFA0A0"],
							pointBackgroundColor: "#FFFFFF",
							pointBorderWidth: 0,
							pointRadius: 4,
							pointHoverRadius: 6,
							pointHoverBorderWidth: 0,
							showLines: true,
							lineTension: 0.3,
						},
					],
				},
				options: {
				    legend: {
				        display: false
				    },
					animation: {
						duration: 2000,
						easing: "easeInOutQuint",
					},
					title: {
						display: true,
						text: "Covid Tracker",
					},
				},
			});
		}

	}, [graphRef.current, data, labels]);

	return <canvas ref={graphRef} width="500" height="500" />;
}

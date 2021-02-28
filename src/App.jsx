import { useEffect, useState } from "react";
import axios from "axios";
import BarChart from "./components/barChart";
import Dropdown from "./components/dropdown";
import LineChart from "./components/lineChart";
import Loading from "./components/loading"

import styles from "./App.module.css";

function App() {
	const [country, setCountry] = useState("false");
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState(false);
	const [deathCase, setDeathCase] = useState([]);
	const [recoveryCase, setRecoveryCase] = useState([]);
	const [labels, setLabels] = useState(false);
	const [key, setKey] = useState(1);

	useEffect(() => {
		if (country && country !== "false") {
			axios
				.get(`https://api.covid19api.com/dayone/country/${country}`)
				.then((res) => {
					let tmpData = [];
					let tmpLabel = [];
					let tmpDeath = [];
					let tmpRecover = [];

					// looping data in fetch
					res.data.map((val) => {
						tmpLabel.push(val.Date.split("T")[0]);
						tmpData.push(val.Confirmed);
						tmpDeath.push(val.Deaths);
						tmpRecover.push(val.Recovered);
					});

					// update state
					setData(tmpData);
					setLabels(tmpLabel);
					setDeathCase(tmpDeath);
					setRecoveryCase(tmpRecover);
					setKey(key + 1);
					setLoading(false);
				})
				.catch((error) => {
					if (error.response) {
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
					} else if (error.request) {
						console.log(error.request);
					} else {
						console.log("Error", error.message);
					}
					console.log(error.config);
				});
		} else {
			axios
				.get("https://covid19.mathdro.id/api")
				.then((res) => {
					let { confirmed, recovered, deaths } = res.data;

					setData([confirmed.value, recovered.value, deaths.value]);
					setKey(key + 1);
					setLoading(false);
				})
				.catch((error) => {
					if (error.response) {
						console.log(error.response.data);
						console.log(error.response.status);
						console.log(error.response.headers);
					} else if (error.request) {
						console.log(error.request);
					} else {
						console.log("Error", error.message);
					}
					console.log(error.config);
				});
		}
	}, [country]);

	const handleCountry = (e) => {
		setCountry(e.target.value);
		setLoading(true);
	};

	const numberWithCommas = (x) => {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};

	if (!data) {
		return (
			<>
				<div className={styles.loading}>
					<Loading color={'white'}/>
				</div>
			</>
		);
	}

	return (
		<>
			<div className={styles.card}>
				<Dropdown handleCountry={handleCountry} />
				<div className={styles.container}>
					{loading ? (
						<div className={styles.loading}>
							<Loading color={'#8B92FF'}/>
						</div>
					) : country !== "false" ? (
						<LineChart
							key={key}
							labels={labels}
							deathCase={deathCase}
							recoveryCase={recoveryCase}
							data={data}
						/>
					) : (
						<BarChart key={key} labels={labels} data={data} />
					)}
				</div>
				{loading ? null : (
				<div className={styles.data}>
					<div >
						{country !== "false" ? (
							<>Confirmed : <span style={{color: 'green'}}>{numberWithCommas(data[data.length - 1])}</span></>
						) : (
							<>Confirmed : <span style={{color: 'green'}}>{numberWithCommas(data[0])}</span></>
						)}
					</div>
					<div >
						{country !== "false" ? (
							<>Recovered : <span style={{color: 'blue'}}>{numberWithCommas(recoveryCase[recoveryCase.length - 1])}</span></>
						) : (
							<>Recovered : <span style={{color: 'blue'}}>{numberWithCommas(data[1])}</span></>
						)}
					</div>
					<div>
						{country !== "false" ? (
							<>Death : <span style={{color: 'red'}}>{numberWithCommas(deathCase[deathCase.length - 1])}</span></>
						) : (
							<>Death : <span style={{color: 'red'}}>{numberWithCommas(data[2])}</span></>
						)}
					</div>
				</div>
				)}
			</div>
		</>
	);
}

export default App;

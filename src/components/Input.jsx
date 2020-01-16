import React, { useState } from 'react';
import Select from 'react-select';
import Data from './Data';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import axios from 'axios';
import { cityIATA } from './city';

const Input = () => {
	const [ data, setData ] = useState([]);
	const [ loading, setLoading ] = useState(false);
	const [ source, setSource ] = useState(cityIATA[0]);
	const [ destination, setDestination ] = useState(cityIATA[1]);
	const [ date, setDate ] = useState(new Date());

	const fetchData = async () => {
		setLoading(true);
		const res = await axios.get(
			`http://developer.goibibo.com/api/search/?app_id=01d52fa3&app_key=c54035af66e7a542afda2280f4fa5a71&format=json&source=${source.value}&destination=${destination.value}&dateofdeparture=${formatDate(
				date
			)}&seatingclass=E&adults=1&children=0&infants=0&counter=100`
		);
		setData(res.data);
		setLoading(false);
	};

	function formatDate(date) {
		// GOIBIBO API required date in YYYYMMDD format
		let month = '' + date.getMonth() + 1;
		let day = '' + date.getDate();
		let year = date.getFullYear();

		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;

		return [ year, month, day ].join('');
	}

	const handleSource = (selected) => {
		setSource(selected);
	};

	const handleDestination = (selected) => {
		setDestination(selected);
	};

	const handleDate = (date) => {
		setDate(date);
	};

	return (
		<div className="input-container">
			<div className="columns is-mobile">
				<div className="column is-one-quarter">
					<div class="field">
						<div class="field-label is-normal">
							<label class="label">Source</label>
						</div>
						<div className="field">
							<div className="control">
								<Select name="source" value={source} onChange={handleSource} options={cityIATA} />
							</div>
						</div>
					</div>
				</div>
				<div className="column is-one-quarter">
					<div class="field">
						<div class="field-label is-normal">
							<label class="label">Destination</label>
						</div>
						<div className="field">
							<div className="control">
								<Select
									name="destination"
									value={destination}
									onChange={handleDestination}
									options={cityIATA}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="column is-one-quarter">
					<div class="field">
						<div class="field-label is-normal">
							<label class="label">Date Of Journey</label>
						</div>
						<DatePicker
							className="calendar"
							selected={date}
							onChange={handleDate}
							dateFormat={'yyyy/MM/dd'}
							minDate={new Date()}
						/>
					</div>
				</div>
				<div className="column">
					<button onClick={fetchData} className="button is-link is-rounded button-margin-top">
						Find Flights
					</button>
				</div>
			</div>
			<div>
				<Data data={data} loading={loading} />
			</div>
		</div>
	);
};
export default Input;

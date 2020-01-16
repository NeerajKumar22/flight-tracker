import React from 'react';

const Data = ({ data, loading }) => {
	if (loading) {
		return <div>Loading</div>;
	}
	if (data.data && data.data.Error) {
		return <div>{data.data.Error}</div>;
	}
	return (
		<div className="input-container">
			{data.data &&
				data.data.onwardflights.map((detail, i) => {
					return (
						<div key={detail.CINFO + i} className="card margin-bottom">
							<div className="card-content">
								<div className="content">
									<div className="columns is-variable is-1-mobile is-0-tablet is-3-desktop is-8-widescreen is-2-fullhd">
										<div className="column">
											<div>Airline: {detail.airline}</div>
											<div>Flight Code: {detail.flightcode}</div>
										</div>
										<div className="column">
											<div>Departure At: {detail.deptime}</div>
											<div>Duration: {detail.duration}</div>
										</div>
										<div className="column">
											<div>Seats Available: {detail.seatsavailable}</div>
											<div>Total Fare: {detail.fare.adulttotalfare}</div>
										</div>
										<div className="column">
											<button className="button is-link is-rounded">Book Now</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default Data;

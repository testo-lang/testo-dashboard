import React from "react";
import { Container, Row, Col } from "reactstrap";

import LineChart from "./LineChart";
import PieChart from "./PieChart";
import Tests from "./Tests";

const Default = () => (
	<Container fluid className="p-0">
		<Row>
			<Col lg="4" className="d-flex">
				<PieChart />
			</Col>
			<Col lg="8" className="d-flex">
				<LineChart />
			</Col>
		</Row>
		<Row>
			<Col lg="12" className="d-flex">
				<Tests />
			</Col>
		</Row>
	</Container>
);

export default Default;

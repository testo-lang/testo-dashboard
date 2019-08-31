
import React from "react";
import { Container, Row, Col } from "reactstrap";

import Wrapper from "../../components/Wrapper";
import Sidebar from "../../components/Sidebar";
import Main from "../../components/Main";
import Navbar from "../../components/Navbar";
import Content from "../../components/Content";
import Footer from "../../components/Footer";

import LineChart from "./LineChart";
import PieChart from "./PieChart";
import Tests from "./Tests";

const Default = () => (
	<Wrapper>
		<Sidebar />
		<Main>
			<Navbar />
			<Content>
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
			</Content>
		</Main>
	</Wrapper>
);

export default Default;

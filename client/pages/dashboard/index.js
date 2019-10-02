
import React from "react";
import {
	Container,
	Row,
	Col,
	Card,
	CardBody,
	Media
} from "reactstrap";

import {
	Clock,
	Layers,
} from "react-feather";

import Wrapper from "../../components/Wrapper";
import Sidebar from "../../components/Sidebar";
import Main from "../../components/Main";
import Navbar from "../../components/Navbar";
import Content from "../../components/Content";
import Footer from "../../components/Footer";

import LineChart from "./LineChart";
import PieChart from "./PieChart";
import Tests from "./Tests";

import { StringifyDuration } from "../../utils";

const Statistics = ({title, description, icon: Icon}) => (
	<Card className="flex-fill">
		<CardBody className="py-4">
			<Media>
				<div className="d-inline-block mt-2 mr-3">
					<Icon className="feather-lg text-primary" />
				</div>
				<Media body>
					<h4 className="mb-2">{title}</h4>
					<div className="mb-0">{description}</div>
				</Media>
			</Media>
		</CardBody>
	</Card>
);

const Default = () => (
	<Wrapper>
		<Sidebar />
		<Main>
			<Navbar />
			<Content>
				<Container fluid className="p-0">
					<h4 className="mb-3">Сборка #{testo.lastReport.build_number}</h4>
					<Row>
						<Col md="6" xl>
							<Statistics icon={Layers} title={testo.lastReport.totalTestsCount} description="Общее количество тестов для этой сборки"/>
						</Col>
						<Col md="6" xl>
							<Statistics icon={Clock} title={StringifyDuration(testo.lastReport.duration)} description="Суммарное время прогона тестов"/>
						</Col>
					</Row>
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

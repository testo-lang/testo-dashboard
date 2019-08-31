import React from "react";

import {
	CardBody,
	Card,
	CardHeader,
	CardTitle,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	UncontrolledDropdown
} from "reactstrap";

import { MoreHorizontal } from "react-feather";

import Timeline from "../../../components/Timeline";
import TimelineItem from "../../../components/TimelineItem";

const Appointments = () => (
	<Card className="flex-fill w-100">
		<CardHeader>
			<div className="card-actions float-right">
				<UncontrolledDropdown>
					<DropdownToggle tag="a">
						<MoreHorizontal />
					</DropdownToggle>
					<DropdownMenu right>
						<DropdownItem>Action</DropdownItem>
						<DropdownItem>Another Action</DropdownItem>
						<DropdownItem>Something else here</DropdownItem>
					</DropdownMenu>
				</UncontrolledDropdown>
			</div>
			<CardTitle tag="h5" className="mb-0">
				Новые тесты
			</CardTitle>
		</CardHeader>
		<CardBody className="d-flex">
			<Timeline>
				<TimelineItem>
					<strong>cas1_install_rpm</strong>
					<span className="float-right text-muted text-sm">30 минут назад</span>
					<p>JinnServer должен корректно устанавливаться из rpm пакетов на узел CAS1</p>
				</TimelineItem>
				<TimelineItem>
					<strong>cas2_remove_rmp</strong>
					<span className="float-right text-muted text-sm">2 дня назад</span>
					<p>JinnServer должен корректно удалятся из системы с помощью стандартных инструментов ОС CentOS.
						При этом в системе не должно оставаться лишних файлов.</p>
				</TimelineItem>
				<TimelineItem>
					<strong>cas1_install_previous_release</strong>
					<span className="float-right text-muted text-sm">1 месяц назад</span>
					<p className="mb-0">JinnServer должен корректно обновлятся с предыдущей релизной версии</p>
				</TimelineItem>
			</Timeline>
		</CardBody>
	</Card>
);

export default Appointments;

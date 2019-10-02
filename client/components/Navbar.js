import React from "react";
import { connect } from "react-redux";

import {
	Row,
	Col,
	Collapse,
	Navbar,
	Nav,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	ListGroup,
	ListGroupItem,
	Badge
} from "reactstrap";

import {
	Clock
} from "react-feather";

import Select from "react-select";
import { StringifyTimestamp } from "../utils";

const formatGroupLabel = data => {
	const groupStyles = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	};

	return (
		<div style={groupStyles}>
			<span>{data.label}</span>
		</div>
	)
}

const noOptionsMessage = input => "Нет сборки c таким номером"

const NavbarComponent = ({ dispatch }) => {

	const options = [];

	for (const report of testo.buildNumbers) {
		const option = {
			label: report.build_number,
			value: report.build_number
		};
		if (options.length) {
			const group = options[options.length - 1];
			if (group.label == StringifyTimestamp(report.stop_timestamp)) {
				group.options.push(option);
				continue;
			}
		}
		options.push({
			label: StringifyTimestamp(report.stop_timestamp),
			options: [option]
		});
	}

	const onChange = option => {
		location.pathname = `\\project\\${testo.currentProject}\\branch\\${testo.currentBranch}\\build\\${option.value}`
	}

	return (
		<Navbar color="white" light expand>
			<span
				className="sidebar-toggle d-flex mr-2"
				onClick={() => dispatch({type: 'TOGGLE_SIDEBAR'})}
			>
				<i className="hamburger align-self-center" />
			</span>
			<h4 className="mb-0 ml-1">{testo.currentProject} - {testo.currentBranch}</h4>
			<Collapse navbar>
				<Nav className="ml-auto" navbar>
					<div style={{width: "200px"}}>
					<Select
						className="react-select-container"
						classNamePrefix="react-select"
						options={options}
						placeholder="Выбрать сборку"
						formatGroupLabel={formatGroupLabel}
						noOptionsMessage={noOptionsMessage}
						isSearchable
						onChange={onChange}
					/>
					</div>
				</Nav>
			</Collapse>
		</Navbar>
	);
};

export default connect(store => ({
	app: store.app
}))(NavbarComponent);

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

const NavbarComponent = ({ dispatch }) => {
	return (
		<Navbar color="white" light expand>
			<span
				className="sidebar-toggle d-flex mr-2"
				onClick={() => dispatch({type: 'TOGGLE_SIDEBAR'})}
			>
				<i className="hamburger align-self-center" />
			</span>
			<h4 className="mb-0 ml-1">{testo.currentProject} - {testo.currentBranch}</h4>
		</Navbar>
	);
};

export default connect(store => ({
	app: store.app
}))(NavbarComponent);

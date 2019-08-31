import React from "react";
import { connect } from "react-redux";
import { toggleSidebar } from "../redux/actions/sidebarActions";

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
				onClick={() => {
					dispatch(toggleSidebar());
				}}
			>
				<i className="hamburger align-self-center" />
			</span>
		</Navbar>
	);
};

export default connect(store => ({
	app: store.app
}))(NavbarComponent);

import React from "react";
import { connect } from "react-redux";

import { Badge, Collapse } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import { Box, Activity } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

class SidebarCategory extends React.Component {
	render() {
		let {
			name,
			icon: Icon,
			isOpen,
		} = this.props;
		return (
			<li className={"sidebar-item active"}>
				<span
					data-toggle="collapse"
					className={"sidebar-link " + (!isOpen ? "collapsed" : "")}
					aria-expanded={isOpen ? "true" : "false"}
				>
					<Icon size={18} className="align-middle mr-3" />
					<span className="align-middle">{name}</span>
				</span>
				<Collapse isOpen={isOpen}>
					<ul id="item" className={"sidebar-dropdown list-unstyled"}>
						{this.props.children}
					</ul>
				</Collapse>
			</li>
		);
	}
};

class SidebarItem extends React.Component {
	render() {
		let { name, to } = this.props;
		return (
			<li className={"sidebar-item active"}>
				<a to={to} className="sidebar-link">
					{name}
				</a>
			</li>
		);
	}
}

class Sidebar extends React.Component {
	render() {
		const { sidebar } = this.props;

		return (
			<nav
				className={
					"sidebar" +
					(!sidebar.isOpen ? " toggled" : "") +
					" sidebar-sticky"
				}
			>
				<div className="sidebar-content">
					<PerfectScrollbar>
						<a className="sidebar-brand" href="/">
							<Box className="align-middle text-primary" size={24} />{" "}
							<span className="align-middle">Testo</span>
						</a>

						<ul className="sidebar-nav">
							<SidebarCategory
								name='JinnServer'
								icon={Activity}
								to='/dashboard'
								isOpen={true}
							>
								<SidebarItem
									name='develop'
									to='/dashboard'
								/>
							</SidebarCategory>
						</ul>
					</PerfectScrollbar>
				</div>
			</nav>
		);
	}
}

export default connect(store => ({
		sidebar: store.sidebar,
	}))(Sidebar);

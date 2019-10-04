import React from "react";
import { connect } from "react-redux";

import { Badge, Collapse } from "reactstrap";
import PerfectScrollbar from "react-perfect-scrollbar";

import { Box, Activity } from "react-feather";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

function SidebarCategory({
	name,
	icon: Icon,
	isOpen,
	isActive,
	onClick,
	children
}) {
	return (
		<li className={"sidebar-item " + (isActive ? "active" : "")}>
			<span
				data-toggle="collapse"
				className={"sidebar-link " + (!isOpen ? "collapsed" : "")}
				aria-expanded={isOpen ? "true" : "false"}
				onClick={onClick}
			>
				<Icon size={18} className="align-middle mr-3" />
				<span className="align-middle">{name}</span>
			</span>
			<Collapse isOpen={isOpen}>
				<ul id="item" className={"sidebar-dropdown list-unstyled"}>
					{children}
				</ul>
			</Collapse>
		</li>
	);
}

function SidebarItem({ name, to, isActive }) {
	return (
		<li className={"sidebar-item " + (isActive ? "active" : "")}>
			<a href={to} className="sidebar-link">
				{name}
			</a>
		</li>
	);
}

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {openedProject: testo.currentProject}
	}

	toggleProject(name) {
		if (name == this.state.openedProject) {
			this.setState({
				openedProject: null
			});
		} else {
			this.setState({
				openedProject: name
			});
		}
	}

	render() {
		return (
			<nav
				className={
					"sidebar" +
					(!this.props.sidebarIsOpen ? " toggled" : "") +
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
							{
								testo.projects.map((project) =>
									<SidebarCategory
										key={project.name}
										name={project.name}
										icon={Activity}
										isOpen={this.state.openedProject === project.name}
										isActive={(project.name == testo.currentProject)}
										onClick={() => this.toggleProject(project.name)}
									>
										{
											project.branches.map((branch) =>
												<SidebarItem
													key={branch.name}
													name={branch.name}
													to={`/project/${project.name}/branch/${branch.name}`}
													isActive={(project.name == testo.currentProject) && (branch.name == testo.currentBranch)}
												/>
											)
										}
									</SidebarCategory>
								)
							}
						</ul>
					</PerfectScrollbar>
				</div>
			</nav>
		);
	}
}

export default connect(store => ({sidebarIsOpen: store.sidebarIsOpen}))(Sidebar);

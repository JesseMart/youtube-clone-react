import React from 'react';
import { Image, Menu, Form, Input, Icon } from "semantic-ui-react";
import './HeaderNav.scss';
import logo from '../../assets/images/youtube-logo.jpg';
import {Link} from 'react-router-dom'


export class HeaderNav extends React.Component{
    render(){
        return(
            // MENU CONTAINER
            <Menu borderless className="top-menu" fixed="top">
                            {/* LOGO */}
                <Menu.Item header className="logo">
                    <Link to="/" ><Image src={logo} size="tiny"/></Link>
                </Menu.Item>

                        {/* SEARCH BOX & ICONS CONTAINER  */}
                <Menu.Menu className="nav-container">
                    <Menu.Item className="search-input">
                        <Form>
                            <Form.Field>
                                <Input 
                                    placeholder="Search..."
                                    size="small"
                                    action="go"
                                />
                            </Form.Field>
                        </Form>
                    </Menu.Item>

                        {/* ICONS GO HERE */}
                    <Menu.Menu position="right">
                        <Menu.Item>
                            <Icon className="header-icon" name="video camera" size="large" />
                        </Menu.Item>
                        <Menu.Item>
                            <Icon className="header-icon" name="grid layout" size="large" />
                        </Menu.Item>
                        <Menu.Item>
                            <Icon className="header-icon" name="chat" size="large" />
                        </Menu.Item>
                        <Menu.Item>
                            <Icon className="header-icon" name="alarm" size="large" />
                        </Menu.Item>
                        <Menu.Item name="avatar">
                            <Image src='http://via.placeholder.com/80x80' avatar />
                        </Menu.Item>
                    </Menu.Menu>

                </Menu.Menu>
            </Menu> 
        );
    }
}
export default HeaderNav;
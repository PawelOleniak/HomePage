import React            from "react";
import { Header, List, NavigationWrapper } from "./NavigationCss";
import { Link }         from "react-router-dom";
import PropTypes        from "prop-types";

function Navigation({ items = [], Languages }){
    return(
        <Header>
            <NavigationWrapper>
                <List>
                    {items.map(item => (
                        <li key={item.to}>
                            <Link to={item.to}>{item.content}</Link>
                        </li>
                    ))}
                </List>
                {Languages}
            </NavigationWrapper>
        </Header>
    )
}

Navigation.propTypes = {
    items: PropTypes.array.isRequired
};



export default Navigation;
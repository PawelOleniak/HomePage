import React            from "react";
import { Header, List, NavigationWrapper, NavLi } from "./NavigationCss";
import PropTypes        from "prop-types";
import { useTranslation } from "react-i18next";

import { Button }         from "components"

function Navigation({ items = [], Languages }){
    const { t } = useTranslation();
    return(
        <Header>
            <NavigationWrapper>
                <List>
                    {items.map(item => (
                        <NavLi key={item.to}>
                            <Button to={item.to}>{t(item.content)}</Button>
                        </NavLi>
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
import React, { useContext } from 'react';
import { Header, List, NavigationWrapper, NavLi } from './NavigationCss';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { Button } from 'components';
import { Clockbox } from 'components/Clock';
import Provider, { Context } from 'Context';
function Navigation({ items = [], Languages }) {
  const { t } = useTranslation();
  const { isBigScreen, isTabletOrMobile } = useContext(Context);

  return (
    <>
      <Provider>
        <Header isBigScreen={isBigScreen} isTabletOrMobile={isTabletOrMobile}>
          <NavigationWrapper>
            <List>
              {items.map((item) => (
                <NavLi key={item.to} isBigScreen={isBigScreen} isTabletOrMobile={isTabletOrMobile}>
                  <Button primary="true" to={item.to}>
                    {t(item.content)}
                  </Button>
                </NavLi>
              ))}
            </List>
            {Languages}
          </NavigationWrapper>
          <Clockbox />
        </Header>
      </Provider>
    </>
  );
}

Navigation.propTypes = {
  items: PropTypes.array.isRequired,
};

export default Navigation;

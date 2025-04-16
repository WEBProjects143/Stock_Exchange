import React, { useState } from 'react'
import { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { ReactComponent as CrwnLogo } from '../../asset/crown.svg';
import './Navigation.scss';

const Navigation = () => {
  // const [price,setPrice] = useState(0);
  // console.log(price);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };



  return (
    //fragment id you don.t want to render()
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/ShopHome'>
          <CrwnLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
            <Link className='nav-link' to='/ShopHome/shop'>
              SHOP
            </Link>
            <Link className='nav-link' to='/ShopHome/signin'>
              SIGN IN
            </Link>
            <Link className='nav-link' to='/ShopHome/cards'>
              CARDS
            </Link>
           <Badge badgeContent={4} color="primary" style={{margin:"20px"}}
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
           >       
              <i class="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer"}}></i>
            </Badge>
        </div>
      </div>

      <Outlet />
    </Fragment>
  );
};

export default Navigation;
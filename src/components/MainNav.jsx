import * as React from 'react';
import Box from '@mui/material/Box';
import { useEffect } from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import TvIcon from '@mui/icons-material/Tv';
import {useNavigate} from "react-router-dom";
import "./Header.css"
export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const history = useNavigate();
    useEffect(() => {
    if (value===0) history("/");
    else if (value ===1) history("/Movies");
    else if (value ===2) history("/Series")
    else if (value ===3) history("/searchs")

  },[value,history]);
  return (
    <div className='Main'>
    <Box sx={{ width: 500 }} >
      <BottomNavigation 
      style={{backgroundColor:'#0C4A6E',
      width:"100%",
      position: 'fixed',
      bottom:0,
      zIndex:100,
    }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
        style={{color:'white'}}
        label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction 
        style={{color:'white'}}
        label="Movies" icon={<MovieIcon />} />
        <BottomNavigationAction
        style={{color:'white'}}
        label="TV Series" icon={<TvIcon />} />
       
      </BottomNavigation>
    </Box>
    </div>
  );
}
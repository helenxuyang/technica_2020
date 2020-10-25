import React from 'react';
import Box from '@material-ui/core/Box';
import avatar from './avatar.svg'
import './App.css';
export default function Avatar() {
  return (
    <Box bgcolor="#dadada" borderRadius={8} padding="32px">
      <h1>You</h1>
      <img className="AvatarImage" src={avatar} alt="Your avatar" />
    </Box>
  );
}

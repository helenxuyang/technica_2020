import React from 'react';
import Grid from '@material-ui/core/Grid';
import logo from './questodo.svg';
import './App.css';
import Avatar from './Avatar';
import QuestList from './QuestList';

function App() {
  return (
    <div className="App">
      <img src={logo} alt="Logo" width="300px"></img>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={3}><Avatar /></Grid>
        <Grid item xs={12} sm={9}><QuestList /></Grid>
      </Grid>
    </div>
  );
}

export default App;

import React from 'react';
import QuestDialog from './QuestDialog';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import book from './boss.svg'
import './App.css';

export type QuestInfo = {
  id: string,
  name: string,
  difficulty: number,
  tasks: string[],
}

export type QuestProps = QuestInfo & {
  removeCallback: () => void,
  setAsCurrent: (quest: string) => void
}

function Stars(difficulty: number) {
  const stars = [];
  const colors = ["#349beb", "#69cf67", "#c4be00", "#f2873a", "#ba190d"];
  const starColor = colors[difficulty - 1];
  for (let i = 0; i < difficulty; i++) {
    stars.push(<StarIcon style={{ color: starColor }}></StarIcon>);
  }
  for (let i = difficulty; i < colors.length; i++) {
    stars.push(<StarBorderIcon style={{ color: starColor }}></StarBorderIcon>);
  }
  return <Grid container spacing={2}>
    {stars.map((star) => <Grid item xs={1}>{star}</Grid>)}
  </Grid>
}

export default function Quest({ id, name, difficulty, tasks, removeCallback, setAsCurrent }: QuestProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setAsCurrent(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="QuestRow">
      <Grid container direction="row" alignItems="center" spacing={4} justify="center">
        <Grid item xs={12} sm={3}>
          <img className="QuestImage" src={book} alt="Angry book" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <h2>{name}</h2>
          <ol>
            {tasks.map((task) => (
              <li key={task}>{task}</li>
            ))}
          </ol>
        </Grid>
        <Grid item xs={12} sm={3}>
          <h3>Difficulty</h3>
          {Stars(difficulty)}
          <Button variant="contained" color="primary" onClick={handleClickOpen}>Start quest</Button>
        </Grid>
      </Grid>
      <Divider style={{ margin: "16px 0px" }} />
      {<QuestDialog
        quest={{
          id: id,
          name: name,
          difficulty: difficulty,
          tasks: tasks,
          removeCallback: removeCallback,
          setAsCurrent: setAsCurrent
        }}
        userName="Helen"
        open={open}
        handleClose={handleClose}
      />}
    </div>
  );
}


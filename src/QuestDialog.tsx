import React from 'react';
import Confetti from 'react-dom-confetti';
import Dialog from '@material-ui/core/Dialog';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import avatar from './avatar.svg'
import book from './boss.svg'
import { QuestProps } from './Quest';

function Character(name: string, image: string, health: number, totalHealth: number) {
  return (
    <div>
      <img className="AvatarImage" src={image} alt="Character" />
      <h1>{name}</h1>
      {Health(health, totalHealth)}
    </div>
  );
}

function Health(current: number, total: number) {
  const hearts = [];
  for (let i = 0; i < current; i++) {
    hearts.push(<FavoriteIcon></FavoriteIcon>);
  }
  for (let i = current; i < total; i++) {
    hearts.push(<FavoriteBorderIcon></FavoriteBorderIcon>);
  }
  return <Grid container spacing={1}>
    {hearts.map((heart) => <Grid item xs={2}>{heart}</Grid>)}
  </Grid>
}

type QuestDialogProps = {
  quest: QuestProps,
  userName: string,
  open: boolean,
  handleClose: any,
}

export default function QuestDialog(props: QuestDialogProps) {
  const [bossHealth, setBossHealth] = React.useState(props.quest.tasks.length);

  const emptyMap = new Map<string, boolean>();
  props.quest.tasks.map((task) => emptyMap.set(task, false));
  const [tasksDone, setTasksDone] = React.useState<Map<string, boolean>>(emptyMap);

  const attackWord = () => {
    const words = ['SLASH', 'POW', 'WHAM', 'BANG', 'BAM', 'SMACK', 'BOOM', 'PUNCH'];
    return words[Math.round(Math.random() * (words.length - 1))];
  }
  const words = React.useState(props.quest.tasks.reduce((prev, curr) => prev.set(curr, attackWord()), new Map<string, string>()))[0];

  const attack = (task: string) => {
    setBossHealth(bossHealth - 1);
    let newTasksDone = new Map(tasksDone);
    newTasksDone.set(task, true);
    setTasksDone(newTasksDone);
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title" maxWidth="xl" fullWidth={true}>
      <div style={{ margin: 32 }}>
        <IconButton aria-label="close" onClick={props.handleClose}>
          <CloseIcon />
        </IconButton>
        <Grid container direction="row" spacing={8} alignItems="center" justify="center">
          <Grid item>{Character("Helen", avatar, 5, 5)}</Grid>
          <Grid item style={{ fontSize: 40 }}>vs</Grid>
          <Grid item>{Character(props.quest.name, book, bossHealth, props.quest.tasks.length)}</Grid>
        </Grid>
        <div style={{ position: "relative", left: "50%", bottom: "0%" }}>
          <Confetti active={bossHealth === 0} />
        </div>

        <Grid container direction="row" alignItems="center" justify="center">
          {props.quest.tasks.map((task) =>
            <Button variant="contained" color="primary" onClick={() => attack(task)} style={{ whiteSpace: "pre-line", margin: "16px" }} disabled={tasksDone.get(task)}>
              <p>{`${words.get(task)}!\n${task}`}</p>
            </Button>
          )}
        </Grid>
        {bossHealth === 0 &&
          <div>
            <Button size="large" style={{ display: "block", margin: "auto" }} variant="contained" color="primary" onClick={() => { props.quest.removeCallback(); props.handleClose(); }}>
              Victory!
            </Button>
          </div>}
      </div>
    </Dialog>
  );
}
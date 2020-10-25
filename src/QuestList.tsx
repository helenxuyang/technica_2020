import React, { useState } from 'react';
import Quest from './Quest';
import { QuestProps } from './Quest';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';

export default function QuestList() {

  const [open, setOpen] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [newDifficulty, setNewDifficulty] = React.useState(1);
  const [newTask, setNewTask] = React.useState("");
  const [tasks, setTasks] = React.useState<string[]>([]);

  const updateNewTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTask = event.currentTarget.value;
    setNewTask(newTask);
  }

  const updateNewName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.currentTarget.value;
    setNewName(newName);
  }

  const updateDifficulty = (event: any, newDifficulty: number | number[]) => {
    setNewDifficulty(newDifficulty as number);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setNewName("");
    setNewTask("");
    setTasks([]);
    setOpen(false);
  };

  const marks = [
    { value: 1, label: "Trivial" },
    { value: 2, label: "Easy" },
    { value: 3, label: "Medium" },
    { value: 4, label: "Hard" },
    { value: 5, label: "Extreme" },
  ];

  const addTask = () => {
    setTasks([...tasks, newTask]);
    setNewTask("");
  }

  const addQuest = () => {
    const newQuestInfo: QuestProps = {
      id: newName,
      name: newName,
      difficulty: newDifficulty,
      tasks: tasks,
      removeCallback: removeQuest,
      setAsCurrent: updateCurrentQuest
    }

    setQuests([...quests, newQuestInfo]);
    setNewName("");
    setNewTask("");
    setTasks([]);
    setOpen(false);
  }

  const removeQuest = () => {
    setQuests(quests.filter((quest) => quest.id !== currentQuestID));
  }

  const updateCurrentQuest = (id: string) => {
    setCurrentQuestID(id);
  }

  const [quests, setQuests] = useState<QuestProps[]>([
    {
      id: "temp1",
      name: "Math HW",
      difficulty: 5,
      tasks: ["question 1", "question 2", "question 3"],
      removeCallback: removeQuest,
      setAsCurrent: () => updateCurrentQuest("temp1")
    }
  ]);
  const [currentQuestID, setCurrentQuestID] = useState<string>("");

  const createQuestDialog = <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth={true}>
    <h1 style={{ margin: "20px" }}>Create a new quest</h1>
    <DialogContent>
      <h2>Name</h2>
      <TextField autoFocus fullWidth onChange={updateNewName} label="Enter the name of the quest" />
      <h2 style={{ marginTop: 16 }}>Difficulty</h2>
      <div style={{ padding: "16px" }}>
        <Slider aria-labelledby="discrete-slider" min={1} max={5} marks={marks} value={newDifficulty} onChange={updateDifficulty} aria-label="Difficulty slider"></Slider>
      </div>
      <h2>Tasks</h2>
      <ol>
        {tasks.map((task) => <li key={task}>{task}</li>)}
      </ol>
      <TextField fullWidth value={newTask} onChange={updateNewTask} label="Enter a task of the quest"></TextField>
      <Button onClick={addTask}>Add task</Button>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={addQuest} color="primary">
        Create
      </Button>
    </DialogActions>
  </Dialog>;

  return (
    <Box bgcolor="#dadada" borderRadius={8} padding="32px">
      <h1>Quests</h1>
      {quests.map((quest) => <Quest key={quest.id} {...quest} />)}
      <Button style={{ marginTop: 16 }} variant="contained" color="primary" onClick={handleClickOpen}>Create a new quest</Button>
      {createQuestDialog}
    </Box >
  );
}
import React, { useEffect, useState } from 'react';
import { TextField, InputLabel, MenuItem, FormControl } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import '../App.css';
import Grid from '@mui/material/Grid';
import { Container, Paper, Button, FormGroup, FormControlLabel } from '@material-ui/core';
import Checkbox from '@mui/material/Checkbox';
import Student from './Student';

const Points = () => {
    const [check, setCheck] = useState([]);
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
    const [completedEvent, setcompletedEvent] = React.useState('');
    const [maxPoints, setmaxPoints] = React.useState('');
    const [grade, setGrade] = React.useState('');
    const [completedEvents, setcompletedEvents] = useState([]);
    const [studentsInGrade, setStudentsInGrade] = useState([]);



    useEffect(() => {
        fetch("http://localhost:8080/event/completedEvents")
            .then(res => res.json())
            .then((result) => {
                setcompletedEvents(result);
            }
            )
    }, []);

    useEffect(() => {
        console.log(grade);
    }, [completedEvent], [maxPoints], [grade])


    const handleCheckboxChange = (studentid) => (event: React.ChangeEvent<HTMLInputElement>) => {

        const { id, checked } = event.target;
        const index = studentsInGrade.findIndex(s => s.id == studentid);
        check[index] = checked;
        setCheck([...check]);
    };

    const handleEventChange = (event: SelectChangeEvent) => {
        setcompletedEvent(event.target.value);
        setmaxPoints(event.target.value.points);
    };

    const handleGradeChange = (event: SelectChangeEvent) => {

        //clear out the checkbox array
        setCheck(check.filter(s => {
            console.log(s);
        }));
        setGrade(event.target.value);

        console.log("http://localhost:8080/student/studentsInGrade?grade=" + grade);
        if (grade != 0) {

            fetch("http://localhost:8080/student/studentsInGrade?grade=" + grade)
                .then(res => res.json())
                .then((result) => {
                    setStudentsInGrade(result);
                }
                )
        }
    };

    const handleSubmit = (e) => {
        console.log(check);
        console.log(studentsInGrade);
    };


    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return (
        <div>
            <h1>Assign Points</h1>
            <div>

                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={6}>
                        <Item>
                            <FormControl fullWidth >
                                <InputLabel id="demo-simple-select-label">Completed Events</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={completedEvent}
                                    label="Completed Events"
                                    onChange={handleEventChange}
                                >
                                    {completedEvents.map((item, index) => (
                                        <MenuItem key={item.id} value={item}>
                                            {item.name}
                                        </MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <FormControl fullWidth >
                                <TextField id="outlined-basic" label="Points" variant="outlined" value={maxPoints} />
                            </FormControl>
                        </Item>
                    </Grid>
                    <Grid item xs={3}>
                        <Item>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Grade</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={grade}
                                    label="Grade"
                                    onChange={handleGradeChange}
                                >
                                    <MenuItem value={0}>Select Grade</MenuItem>
                                    <MenuItem value={9}>9</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={11}>11</MenuItem>
                                    <MenuItem value={12}>12</MenuItem>
                                </Select>
                            </FormControl>
                        </Item>
                    </Grid>
                    <Grid item xs={12}>
                        <Item>
                            <Paper elevation={3} style={paperStyle}>

                                {studentsInGrade.map((student, index) => (
                                    <FormGroup aria-label="Temas" row={true} key={student.id}>
                                        <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={student.id}>
                                            Id:{student.id}<br />
                                            Name:{student.name} <br />

                                            <FormControlLabel
                                                key={student}
                                                control={
                                                    <input
                                                        type="checkbox"
                                                        id={`checkbox-${index}`}
                                                        checked={check[index]}
                                                        name={student.id}
                                                        value={student.id}
                                                        onChange={handleCheckboxChange(student.id)}
                                                    />
                                                }
                                            />
                                            <br />
                                        </Paper>
                                    </FormGroup>
                                ))
                                }
                            </Paper>
                        </Item>
                    </Grid>
                </Grid>
                <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </div>
        </div >
    );
};

export default Points;
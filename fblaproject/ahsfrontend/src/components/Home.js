import React, { useEffect, useState } from 'react';
import { Container, Paper, Button } from '@material-ui/core';

export default function Home() {
  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
  const [name, setName] = useState('')
  const [time, setTime] = useState('')
  const [upcomingEvents, setUpcomingEvents] = useState([])


  useEffect(() => {
    fetch("http://localhost:8080/event/getAll")
      .then(res => res.json())
      .then((result) => {
        setUpcomingEvents(result);
      }
      )
  }, [])

  return (
    <Container>

      <h1>Upcoming Events</h1>

      <Paper elevation={3} style={paperStyle}>

        {upcomingEvents.map(event => (

          <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={event.id}>
            Id:{event.id}<br />
            Name:{event.name}<br />
            Description:{event.description}<br />
            Time:{event.time}

          </Paper>
        ))
        }
      </Paper>
    </Container>
  );
}

import React from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  Grid,
  AppBar,
  Toolbar,
  Button,
  TextField,
  Slide,
  Snackbar
} from "@material-ui/core";

const activeLinkStyle = {
  border: "1px solid rgba(0,0,0,0.23)",
  borderRadius: 4
};

const brandStyle = {
  flexGrow: 1
};

const Menu = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="title" color="inherit" style={brandStyle}>
        Anecdotes
      </Typography>
      <Button
        color="inherit"
        component={NavLink}
        to="/"
        activeStyle={activeLinkStyle}
        exact
      >
        Anecdotes
      </Button>
      <Button
        color="inherit"
        component={NavLink}
        to="/create"
        activeStyle={activeLinkStyle}
        exact
      >
        Create
      </Button>
      <Button
        color="inherit"
        component={NavLink}
        to="/about"
        activeStyle={activeLinkStyle}
        exact
      >
        About
      </Button>
    </Toolbar>
  </AppBar>
);

const notificationStyle = {
  border: "solid 1px #aaa",
  borderRadius: 5,
  boxShadow: "3px 3px 8px #888",
  marginBottom: "1em",
  padding: "0.5em",
  fontSize: "21px"
};

const Notification = ({ message }) => (
  <div style={notificationStyle}>{message}</div>
);

const paperStyle = {
  padding: "1em",
  margin: "1em 0"
};

const Anecdote = ({ anecdote }) => (
  <Grid container justify="center" spacing={24}>
    <Grid item xs={12} sm={6}>
      <Paper style={paperStyle}>
        <Typography variant="headline">
          {anecdote.content} by {anecdote.author}
        </Typography>
        <Typography variant="body1">Has {anecdote.votes} votes</Typography>
        <Typography variant="body1">
          For more info, see: <a href={anecdote.info}>{anecdote.info}</a>
        </Typography>
      </Paper>
    </Grid>
  </Grid>
);

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <Typography variant="display1" align="center" gutterBottom>
      Anecdotes
    </Typography>
    <List component="nav">
      {anecdotes.map(anecdote => (
        <ListItem
          key={anecdote.id}
          button
          component={NavLink}
          to={`/anecdotes/${anecdote.id}`}
        >
          <ListItemText primary={anecdote.content} />
        </ListItem>
      ))}
    </List>
  </div>
);

const About = () => (
  <div>
    <Typography variant="title" gutterBottom>
      About anecdote app
    </Typography>
    <Grid container>
      <Grid item xs={8}>
        <Typography variant="body1" gutterBottom>
          According to Wikipedia:
        </Typography>

        <Typography variant="body1" gutterBottom>
          <em>
            An anecdote is a brief, revealing account of an individual person or
            an incident. Occasionally humorous, anecdotes differ from jokes
            because their primary purpose is not simply to provoke laughter but
            to reveal a truth more general than the brief tale itself, such as
            to characterize a person by delineating a specific quirk or trait,
            to communicate an abstract idea about a person, place, or thing
            through the concrete details of a short narrative. An anecdote is "a
            story with a point."
          </em>
        </Typography>

        <Typography variant="body1" gutterBottom>
          Software engineering is full of excellent anecdotes, at this app you
          can find the best and add more.
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background:
              "url(https://upload.wikimedia.org/wikipedia/commons/6/69/Linus_Torvalds.jpeg) no-repeat center center",
            backgroundSize: "contain"
          }}
        />
      </Grid>
    </Grid>
  </div>
);

const footerStyle = {
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  background: "#eee",
  height: "3rem",
  justifyContent: "center",
  flexShrink: 0
};

const Footer = () => (
  <div style={footerStyle}>
    <Typography variant="body1">
      Anecdote app for{" "}
      <a href="https://courses.helsinki.fi/fi/TKT21009/121540749">
        Full Stack -sovelluskehitys
      </a>. See{" "}
      <a href="https://github.com/mluukkai/routed-anecdotes">
        https://github.com/mluukkai/routed-anecdotes
      </a>{" "}
      for the source code.
    </Typography>
  </div>
);

const formStyle = {
  display: "flex",
  flexDirection: "column"
};

class CreateNew extends React.Component {
  constructor() {
    super();
    this.state = {
      content: "",
      author: "",
      info: ""
    };
  }

  handleChange = e => {
    console.log(e.target.id, e.target.value);
    this.setState({ [e.target.id]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    });
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <Typography variant="title" color="inherit" align="center">
          Create a new anecdote
        </Typography>
        <Grid container justify="center" spacing={24}>
          <Grid item xs={12} sm={8}>
            <div style={formStyle}>
              <TextField
                id="content"
                label="content"
                value={this.state.content}
                margin="normal"
                onChange={this.handleChange}
              />
              <TextField
                id="author"
                label="author"
                value={this.state.author}
                margin="normal"
                onChange={this.handleChange}
              />
              <TextField
                id="info"
                label="Url for more info"
                value={this.state.info}
                margin="normal"
                onChange={this.handleChange}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={this.handleSubmit}
                type="submit"
                variant="contained"
                color="primary"
              >
                Create
              </Button>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      anecdotes: [
        {
          content: "If it hurts, do it more often",
          author: "Jez Humble",
          info:
            "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
          votes: 0,
          id: "1"
        },
        {
          content: "Premature optimization is the root of all evil",
          author: "Donald Knuth",
          info: "http://wiki.c2.com/?PrematureOptimization",
          votes: 0,
          id: "2"
        }
      ],
      notification: "",
      open: false
    };
  }

  TransitionUp = props => {
    return <Slide {...props} direction="up" />;
  };

  addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    this.setState({ anecdotes: this.state.anecdotes.concat(anecdote) });
    this.updateNotification(`A new anecdote ${anecdote.content} created!`);
  };

  anecdoteById = id => this.state.anecdotes.find(a => a.id === id);

  updateNotification = notification => {
    this.setState({ open: true, notification });
    setTimeout(() => this.setState({ notification: "", open: false }), 10000);
  };

  vote = id => {
    const anecdote = this.anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    };

    const anecdotes = this.state.anecdotes.map(a => (a.id === id ? voted : a));

    this.setState({ anecdotes });
  };

  render() {
    const getById = id => this.state.anecdotes.find(item => item.id === id);
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ flex: "1 0 auto" }}>
          <Router>
            <div>
              <Menu />
              <Grid container justify="center" style={{ padding: "1rem" }}>
                <Grid item xs={12} sm={8}>
                  <Route
                    exact
                    path="/"
                    render={() => (
                      <AnecdoteList anecdotes={this.state.anecdotes} />
                    )}
                  />
                  <Route
                    exact
                    path="/anecdotes/:id"
                    render={({ match }) => (
                      <Anecdote anecdote={getById(match.params.id)} />
                    )}
                  />

                  <Route exact path="/about" render={() => <About />} />
                  <Route
                    exact
                    path="/create"
                    render={({ history }) => (
                      <CreateNew history={history} addNew={this.addNew} />
                    )}
                  />
                </Grid>
              </Grid>
            </div>
          </Router>
        </div>
        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={this.TransitionUp}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={<span id="message-id">{this.state.notification}</span>}
        />
        <Footer />
      </div>
    );
  }
}

export default App;

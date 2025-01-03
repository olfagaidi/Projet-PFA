import React, { useState, useEffect, useReducer, Fragment } from 'react';
import { Grid, Paper, Box, Button, Card, CardContent, Select, NativeSelect, MenuItem, InputLabel, FormControl, FormHelperText, Tooltip, Typography, TextField, AppBar, IconButton, Toolbar, makeStyles } from '@material-ui/core';
import { ArrowBack, Home, Menu } from '@material-ui/icons';
import { Formik, Form, Field, ErrorMesage } from 'formik';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import Snack from './Snackbar';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import es from 'date-fns/locale/es';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Importer useNavigate ici

function editPage(edit, action) {
  const dataInfo = JSON.parse(localStorage.getItem("myEdit"));
  
  switch (action.type) {
    case 'field': {
      return {
        ...edit,
        [action.fieldName]: action.payload,
      };
    }

    case 'success': {
      return {
        event_id: dataInfo.event_id,
        name: dataInfo.name,
        event_type: "Weekend event",
        description: dataInfo.description,
        venue: dataInfo.venue,
        start_time: moment(dataInfo.start_time).format("YYYY-MM-DDThh:mm"),
        end_time: moment(dataInfo.end_time).format("YYYY-MM-DDThh:mm"),
      };
    }
    case 'error': {
      return {
        ...edit,
      };
    }

    default:
      return edit;
  }
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const EditEvents = (props) => {
  const navigate = useNavigate();  // Déclarer `navigate` pour pouvoir rediriger

  const dataInfo1 = JSON.parse(localStorage.getItem("myEdit"));
  const marginTop = { marginTop: '10px', marginBottom: '8px', width: '100px' };
  const initialValues = {
    event_id: " ",
    name: " ",
    event_type: "Weekend event",
    description: " ",
    venue: " ",
    start_time: " ",
    end_time: " "
  };

  const [notify, setNotify] = React.useState({ isOpen: false, mesg: '' });
  const [wevent, setWevent] = useState([]);
  const [edit, setEdit] = useReducer(editPage, initialValues);
  const { event_id, name, venue, description, start_time, end_time, event_type } = edit;

  const [eventId, setEventId] = React.useState();
  const { editp, setEditp } = props;

  const handleClose = () => {
    setEditp({
      openEdit: false
    });
  };

  React.useEffect(() => {
    axios.get('/account/events/getEventsList/true/Weekend event')
      .then(response => {
        console.log(response);
        setWevent(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleChange = (event) => {
    const evid = event.target.value;
    localStorage.setItem('editeventId', JSON.stringify(evid));
    const editid = JSON.parse(localStorage.getItem("editeventId"));
    axios.get(`/account/events/${editid}`)
      .then(response => {
        const pro = response.data;
        localStorage.setItem('myEdit', JSON.stringify(pro));
        setEdit({ type: 'success' });
      })
      .catch(err => {
        console.log(err);
        setEdit({ type: 'error' });
      });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const user = {
      event_id,
      name,
      event_type,
      description,
      venue,
      start_time,
      end_time
    };

    axios.post("/account/admin/updateEvents", user)
      .then((response) => {
        var res = response.status;

        console.log(response.status);
        if (res === 200) {
          setNotify({
            isOpen: true,
            mesg: "Saved Changes Successfully!"
          });

          // Remplacer history.push par navigate
          navigate('/accueil');  // Redirection vers la page d'accueil après la mise à jour réussie
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          console.log(error.response.data.message);
          setNotify({
            isOpen: true,
            mesg: "Something Went Wrong!"
          });
        } else {
          setNotify({
            isOpen: true,
            mesg: "Something Went Wrong!"
          });
          console.log(error);
        }
      });
  };

  return (
    <Fragment>
      <Dialog
        open={editp.openEdit}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <center>
          <DialogTitle id="past-event-dialog-title">Edit Events</DialogTitle>
        </center>
        <DialogContent>
          <Grid>
            <Box>
              <Grid container style={{ width: '200' }}>
                <Grid item xs={12}>
                  <Grid>
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                      {(props) => (
                        <Form style={{ textAlign: 'center' }}>
                          <Grid container spacing={2}>
                            <Grid item xs={6}>
                              <FormControl alignItems="center" style={{ minWidth: 200, height: 80 }}>
                                <InputLabel id="demo-simple-select-outlined-label">Event Name</InputLabel>
                                <Select
                                  labelId="demo-simple-select-outlined-label"
                                  id="demo-event-name"
                                  label="Event Name"
                                  value={eventId}
                                  onChange={handleChange}
                                  MenuProps={MenuProps}
                                >
                                  {wevent.map((eve) => (
                                    <MenuItem key={eve.event_id} value={eve.event_id}>
                                      {eve.name}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                              <Field as={TextField} label='Venue' name="venue" onInput={props.handleChange} value={venue}
                                onChange={e =>
                                  setEdit({
                                    type: 'field',
                                    fieldName: 'venue',
                                    payload: e.currentTarget.value,
                                  })
                                }
                                required />
                            </Grid>
                            <Grid item xs={6}>
                              <Field as={TextField} label="Start time" name='start_time' value={start_time} style={{ marginLeft: '10px' }}
                                type="datetime-local"
                                defaultValue="2021-08-24T10:30" min="2021-08-24"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                required placeholder="Start_time"
                                onInput={props.handleChange}
                                onChange={(e) => {
                                  setEdit({
                                    type: 'field',
                                    fieldName: 'start_time',
                                    payload: e.target.value,
                                  });
                                }}
                              />
                            </Grid>

                            <Grid item xs={6}>
                              <Field as={TextField} label="End time" name='end_time' value={end_time} style={{ marginLeft: '20px' }}
                                type="datetime-local"
                                defaultValue="2021-08-24T10:30" min="2021-08-24"
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                required placeholder="end Time"
                                onInput={props.handleChange}
                                onChange={(e) => {
                                  setEdit({
                                    type: 'field',
                                    fieldName: 'end_time',
                                    payload: e.target.value,
                                  });
                                }}
                              />
                            </Grid>

                            <Grid item xs={12}>
                              <Field as={TextField} label='Description' name="description" required value={description}
                                onInput={props.handleChange}
                                InputLabelProps={{
                                  shrink: true,
                                }}
                                onChange={(e) =>
                                  setEdit({
                                    type: 'field',
                                    fieldName: 'description',
                                    payload: e.currentTarget.value,
                                  })
                                }
                              />
                            </Grid>

                          </Grid>

                          <Box ml={30}>
                            <Button type='submit' color='primary' disabled={props.isSubmitting}
                              style={marginTop} onClick={onSubmit}>{props.isSubmitting ? "Loading" : "Edit"}</Button>
                            <Button onClick={handleClose} color="primary">
                              Close
                            </Button>
                          </Box>
                        </Form>
                      )}
                    </Formik>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </DialogContent>
      </Dialog>

      <Snack
        notify={notify}
        setNotify={setNotify}
      />
    </Fragment>
  );
};

export default EditEvents;
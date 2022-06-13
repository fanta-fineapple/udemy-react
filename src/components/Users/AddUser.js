import React, {useState} from 'react';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';

const AddUser = props => {
  const [enterUsername, setEnterUsername] = useState('');
  const [enterAge, setEnterAge] = useState('');
  const [error, setError] = useState();


  const addUserHandler = e => {
    e.preventDefault();
    if(enterUsername.trim().length === 0 || enterAge.trimEnd().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'please enter a valid name and age'
      });
      return 
    }
    if (+enterAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'please enter a valid age'
      })
      return;
    }
    props.onAddUser(enterUsername, enterAge);
    setEnterUsername('');
    setEnterAge('');
  }

  const usernameChangeHnadler = e => {
    setEnterUsername(e.target.value);
  }

  const ageChangeHnadler = e => {
    setEnterAge(e.target.value);
  }

  const errorHandler = () => {
    setError(null);
  }

  return (
    <>
    {error && <ErrorModal onConfirm={errorHandler} title={error.title} message={error.message} />}
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" value={enterUsername} onChange={usernameChangeHnadler} />
        <label htmlFor="age">Age (Years)</label>
        <input id="age" type="number" value={enterAge} onChange={ageChangeHnadler} />
        <Button type="submit">Add User</Button>
      </form>
    </Card>
    </>
  )
}

export default AddUser;
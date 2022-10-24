import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import SignUpForm from './Form/Form';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  onContactCreate = (name, number) => {
    this.setState(prevState => ({
      ...prevState,
      contacts: [...prevState.contacts, { id: nanoid(), name, number }],
    }));
  };
  onContactDelete = id => {
    this.setState(prevState => ({
      ...prevState,
      contacts: prevState.contacts.filter(contact => contact.id != id),
    }));
  };
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  normalizedFilter = this.state.filter.toLowerCase();
  visibleContacts = this.state.contacts.filter(contact =>
    contact.name.toLowerCase().includes(this.normalizedFilter)
  );
  render() {
    const { filter } = this.state;
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <SignUpForm onSubmit={this.onContactCreate} />
        <Contacts
          listOfContacts={this.visibleContacts}
          onDelete={this.onContactDelete}
        ></Contacts>
        <Filter value={filter} onChange={this.changeFilter} />
      </div>
    );
  }
}

# fullstackopen2020 phonebook

The exercise for this project can be found [here](https://fullstackopen.com/en/part2/forms#exercises-2-6-2-10)

![Phonebook Screenshot](https://i.imgur.com/sY5U9JM.png)

A SPA used to create, display and filter through contacts.

## Implementation

The root _App_ component manages the entire application state - of which there are 4 pieces of state:

- _contacts_: an array containing contact objects with 2 properties, _name_ and _number_. initialized with some dummy data.

- _newName_: used to control the form input element for the new name.

- _newNumber_: used to control the form input element for new number.

- _search_: controls the form input element for a search query.

The form event handler _handleNewContact_ will initialize a new contact object and check if the _name_ property (case insensitive) or _number_ property already exists in the phonebook using the Array _some_ method. An alert is displayed in this case - otherwise the _contacts_ state is updated and the _newName_ and _newNumber_ states reset.

    const handleNewContact = (e) => {
        e.preventDefault()

        const newPerson = {
            name: newName,
            number: newNumber
        }

        if (checkAlreadyExists(newPerson))
            alert(`${newName} or ${newNumber} Already Added To Phonebook`)
        else {
            setContacts(contacts.concat(newPerson))
            setNewName('')
            setNewNumber('')
        }
    }

Finally before rendering, a conditional operator is ran to assess the current _search_ state - if empty all contacts are displayed - otherwise only include the contacts that match the search query.

    const contactsToShow =
        search === ''
        ? contacts
        : contacts.filter((p) => p.name.toLocaleLowerCase().includes(search.toLowerCase()))

![Filtering Contacts Screenshot](https://i.imgur.com/RTs3Mxg.png)

## Component Tree

![Phonebook Component Tree](https://i.imgur.com/Wedozru.png)

## Other Info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

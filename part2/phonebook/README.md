# fullstackopen2020 phonebook

The exercise for this project can be found [here](https://fullstackopen.com/en/part2/forms#exercises-2-6-2-10)

![Phonebook Screenshot](https://i.imgur.com/ZP6VZEa.gif)

A SPA used to create, update, delete, display and filter through contacts.

## Implementation

The root _App_ component manages the entire application state - of which there are 4 pieces of state:

- _contacts_: an array containing contact objects with 3 properties, _name_, _number_ & _id_. Initial contacts are fetched from _json-server_ using the imported _contactService getAll_ method during initial render through a _useEffect_ hook.

- _newName_: used to control the form input element for the new name.

- _newNumber_: used to control the form input element for new number.

- _search_: controls the form input element for a search query.

The form event handler _handleNewContact_ will initialize a new contact object and check if the _name_ property (case insensitive) already exists in the phonebook using the Array _filter_ method. If a contact already exists, an alert is shown giving the user an option to update the contacts number, upon confirmation the _contactService update_ method is called. Alternatively, the _contacts_ state is updated and the _newName_ and _newNumber_ states reset. (This is by far the most complex and convoluted part of the code)

    const handleNewContact = (e) => {
        e.preventDefault()

        const newContact = {
            name: newName,
            number: newNumber
        }

        const existing = checkExists(newContact)
        if (existing.length !== 0) {
            const existingContact = existing[0]

            const shouldUpdate = window.confirm(
                `${existingContact.name} Already Exists - Update Their Phone Number?`
            )

            const updatedContact = { ...existingContact, number: newContact.number }

            if (shouldUpdate) {
                contactService.update(existingContact.id, updatedContact).then((contact) => {
                    setContacts(contacts.map((c) => (c.id !== updatedContact.id ? c : contact)))
                })

                setShowNotification({ message: `Updated ${updatedContact.name}`, type: 'updated' })

                setTimeout(() => setShowNotification({ message: null, type: null }), 2000)

                setNewName('')
                setNewNumber('')
            }
        } else {
            contactService
                .create(newContact)
                .then((contact) => {
                    setContacts(contacts.concat(contact))

                    setShowNotification({ message: `Added ${contact.name}`, type: 'added' })

                    setTimeout(() => setShowNotification({ message: null, type: null }), 2000)

                    setNewName('')
                    setNewNumber('')
                })
                .catch((err) => {
                    setShowNotification({ message: `Error Adding Contact`, type: 'error' })

                    setTimeout(() => setShowNotification({ message: null, type: null }), 2000)
                })
        }

    }

Finally before rendering, a conditional operator is ran to assess the current _search_ state - if empty, all contacts are displayed - otherwise only include the contacts that match the search query.

    const contactsToShow =
        search === ''
        ? contacts
        : contacts.filter((p) => p.name.toLocaleLowerCase().includes(search.toLowerCase()))

When rendering contacts, each _Contact_ component is passed a _handleDeleteContact_ function to give as an event handler for its delete button - the event handler is unique to each contact respective of its _id_ value. _handleDeleteContact_ first runs the _window.confirm_ method informing the user of its actions, upon confirmation will utilize the _contactService deleteOne_ method to remove the contact from the server.

When dealing with creating, updating, deleting contacts as well as rejected promises from the server, a relevant message is rendered to the UI for 2 seconds. This message is shown using the _Notification_ component which takes the _message_ and _type_ as props. Depending on the value of _type_ the relevant styling is applied. Relevant notifications are given based on user actions such as creating, updating or deleting a contact. A notification is also displayed within the _catch_ function if a returned server side promise is in the _rejected_ state - which can occur if a users client is not in sync with the server.

## Component Tree

![Phonebook Component Tree](https://i.imgur.com/49BfVTT.png)

## Other Info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run server`

Runs the json-server to mimic a REST API - this will monitor changes within the file _db.json_ in the root of the project.
Open [http://localhost:3001/contacts](http://localhost:3001/contacts) to view in the browser.

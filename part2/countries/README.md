# fullstackopen2020

These exercises are optional and can be found [here](https://fullstackopen.com/en/part2/getting_data_from_server#exercises-2-11-2-14).

A SPA where a user enters a search term and is given a result of countr(ies) as a list.

![Countries App Demonstration](https://i.imgur.com/t1OkRpD.gif)

Country information fetched from [restcountries.eu](https://restcountries.eu).
Weather information fetched from [weatherstack.com](https://weatherstack.com).

## Implementation

The root _App_ component manages two state variables:

- _countries_: which is the list of countries fetched from the _restcountries_ endpoint.

- _search_: used to control the state of the _Search_ components input element.

On initial render a _useEffect_ hook is run to send an _axios_ HTTP GET request to _restcountries_ endpoint. There are a number of conditions within the _Countries_ component controlling the information rendered. This component is passed the _countriesToShow_ value from _App_ component - named as _data_:

    const Countries = ({ data, searchQuery }) => {
        const whatToShow = () => {
            if (data.length > 10 && searchQuery === '')
                return <Message text={'Search For A Country'} />

            else if (data.length > 10 && searchQuery !== '')
                return <Message text={'Too Many Matches, Specify Another Filter'} />

            else if (data.length > 1 && data.length < 11)
                return data.map((c) => <Country key={c.alpha2Code} cInfo={c} showingOne={false} />)
            else
                return data.map((c) => <Country key={c.alpha2Code} cInfo={c} showingOne={true} />)
        }

        return (
            <div>
            <h1>Results</h1>
            {whatToShow()}
            </div>
        )
    }

The current state value of _search_ is also passed as props to the _Countries_ component. The conditions within this component can be summarized as:

(_data.length_ refers to the number of country objects currently stored in state)

- Prompt the user to enter a search query if value of _search_ is empty string.

- Prompt the user to continue entering a query if _data.length_ is above 10.

- If _data.length_ is above 1 but less than 11 - render _Country_ components for each.

- If _data.length_ is equal to 1 - render a single _Country_ component.

Within the _Countries_ component - the attribute _showingOne_ is used to determine whether a list of countries are displayed or only one is displayed. If true - one country with further information is displayed. If false - a list of countries names are displayed along with a button to view further information about each. This button is managed through the state variable _showMore_ within the _Country_ component.

    const Country = ({ cInfo, showingOne }) => {
    const [showMore, setShowMore] = useState(false)

        const showMultiple = () => {
            return showMore ? (
            <div>
                <span>{cInfo.name}</span>
                <button onClick={() => setShowMore(!showMore)}>Hide</button>
                <CountryContent cInfo={cInfo} />
            </div>
            ) : (
            <div>
                <span>{cInfo.name}</span>
                <button onClick={() => setShowMore(!showMore)}>Show</button>
            </div>
            )
        }

    return <div>{showingOne ? <CountryContent cInfo={cInfo} /> : showMultiple()}</div>
    }

The _Country_ component uses the _CountryContent_ component. When this is rendered, an HTTP GET request is sent to the _weatherstack_ endpoint with the current country name. The response data is stored in a state variable _weather_. The request sometimes fails so it is conditionally rendered.

    weather.current ? (
        <div>
            <p>Temperature: {weather.current.temperature}°C</p>
            <img alt="Country Flag" src={weather.current.weather_icons[0]} width={150} height={120} />
            <p>
                Wind: {weather.current.wind_speed}MPH Direction {weather.current.wind_dir}
            </p>
        </div>
        ) : (
        <p>Problem Retrieving Weather </p>
    )}

## Other Info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To clone and run this project, create a _.env_ file in the root directory with the following content:

    REACT_APP_API_KEY=<YOUR_ACCESS_KEY>

You need to register on [weatherstack.com](https://weatherstack.com) for an access key. You can also just skip this and the weather information will be ignored.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

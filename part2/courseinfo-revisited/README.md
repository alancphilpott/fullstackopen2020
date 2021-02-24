# fullstackopen2020 courseinfo (revisited)

Exercise info can be found (here)[https://fullstackopen.com/en/part2/rendering_a_collection_modules#exercises-2-1-2-5]. These exercises are a follow up to the application found (here)[https://github.com/alancphilpott/fullstackopen2020/tree/master/part1/courseinfo].

!(courseinfo-revisited screenshot)[https://i.imgur.com/REZuW90.png]

## Refactoring Information

- The _Header_, _Content_, _Part_ & _Total_ components are now separated into their own modules, as well as the _App_ component which is instead now imported within _index.js_.
- The course data is now an array of 'course' objects and a new _Course_ component is now used to render each course object in the array of courses.
- Each _Course_ component has been assigned a 'key' attribute value corresponding the _id_ property of the course object. (Not within the exercise requirements)
- The _Content_ component now uses the _map_ method of the Array object to render elements for each course part in the array of parts.
- Each _Part_ component has been assigned a 'key' attribute value corresponding the _id_ property of each part with the _parts_ property of the course object. (Not within the exercise requirements)
- The total number of exercises calculation has been updated to use the _reduce_ method.

## Other Info

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

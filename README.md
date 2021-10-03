# Banner Design

A challenge to mimic a banner design

## Design

The design was provided via figma, and was entirely absolutely positioned. I modified from this approach.

## Break points

MUI break points were chosen.
* 1440
* 1200
* 992
A requirement that the design could not break above 1000px was met. Responsiveness breaks below 992px.
Transition all set to animate breakpoints.

## data

A fetch was created to get the required json file. A timeout set to allow simulating the fetch and to incorporate an animation

## savings calculation
displayed savings will update on input change & on enter key

## subscribe button

Subscribing saves a variable to session storage; refreshing the page will not result in a loss of this variable

## Running the App

To run the App, use commands 'npm install' & then 'npm run start'

## Structure

Built with CRA, and utilizing functional components with hooks

## packages

* clsx
* node-sass

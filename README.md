This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## How to modify the project

- Clone the repository using the URL: https://github.com/montanx/card-validator.git.
- Switch to the created folder.
- Open your terminal and run `npm install`
- After that, run `npm run dev`
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy

- To check the live version of this project, go to: https://card-validator-git-main-fernandomontano.vercel.app/

## About this project

This project contains the solution for a card validator that checks the card number, expiration date and also the CVV. Following simple instructions, in this project you will find two pages, one which is the root (or home "/"). And the other one which is ("onchange"), this second route validates the card on every change that the user makes to the input, it has a debounce to ensure that I'm not sending 16+ requests everytime the user changes its card. The first page (home) will validate the card, cvv and expiration date everytime the user clicks on the button.

I present two solutions as, I understand that is uncomfortable for the user (giving that this is an e-commerce) to check with a button if its card is correct.

I added comments to ensure that my logic is explained in the best way possible and also as a good practice for following developers to understand what every method does!

It's been a pleasure sharing this experience with everyone. Hopefully I will be hearing from you!

Montano.

# Potluck

Welcome to Potluck! This is an open source for-fun fullstack web app project by Vincent Li with a mobile interface as well (see my repo Potluck_Mobile).

Potluck is a recipe-sharing social network. Please proceed to the following link to sign up and start participating in our Potluck in browser!

https://v2uqrys5x2.us-east-2.awsapprunner.com/

## Usage

You can sign up with your own account or use the already created test account below to explore Potluck. 

user names and emails have to be unique, and emails must pass a basic email validator (must have an @ and a . followed by letters) but the email address does not need to be a real email address. I will not send you emails!
Passwords are salted using BCrypt.


Email: test@test.com

Password: testtest

## Running the server locally

To run the server locally:
1. Download or clone this repo
2. Run `npm install` in the root directory
3. Reach out to me - you will need a the key to access the MongoDB database
4. Set up a .env file with the db key and a port (the mobile app uses port `8000` for the local server, if you use a different one and are using the mobile frontend you will need to change that)
5. Run `npm run start` to start the server

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.



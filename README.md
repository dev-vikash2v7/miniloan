# Steps to Run the Backend

Clone the repository:

git clone https://github.com/yourusername/mini-loan-app.git
cd mini-loan-app/backend


Install dependencies:

npm install

npm start
The server will be running on http://localhost:5000.

API Endpoints:

POST /loans: Create a new loan request.
GET /loans: Retrieve all loans (Admin & User access).
PATCH /loans/:id/approve: Approve a loan (Admin access).
PATCH /loans/:id/repay: Submit a repayment.


Mobile App Setup (Frontend)

Prerequisites
Expo CLI: Ensure you have the Expo CLI installed. If not, install it globally:
npm install -g expo-cli

Node.js: Ensure Node.js is installed.
Expo Go App: Install the Expo Go app on your iOS or Android device.

Steps to Run the Mobile App

- Navigate to the mobile folder:

npm install

Configure Backend URL:

Install Ngrok in your system 

Run backend server and then run ngrok in cmd prompt - ngrok http 5000 

Now copy the url into  the screens/constants.js file 


Run the mobile app:

npm start

This will open the Expo DevTools in your browser. You can scan the QR code with the Expo Go app to run the app on your physical device or choose to run it on an emulator.

Mobile App Navigation

Authentication: Users can sign up or log in.
Loan Request: Users can request a loan by specifying the amount and term.
Loan Details: Users can view the loan details and repayment schedule.
Make Repayment: Users can submit repayments for their loan.
Admin: Admins can approve loans and see loan status.
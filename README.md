# Customer Rewards Program (Frontend)

This project implements the frontend for a rewards program for a retailer using React JS. The application calculates reward points for customers based on their purchases and displays them in a user-friendly interface.

## Project Description

A customer receives:

- 2 points for every dollar spent over $100 in each transaction.
- 1 point for every dollar spent between $50 and $100 in each transaction.

For example, a $120 purchase results in 2x$20 + 1x$50 = 90 points.

The application calculates the reward points earned for each customer per month and in total, given a record of every transaction during a three-month period.

## Tech Stack

- **Frontend:** React JS
- **Testing:** Jest, React Testing Library

## Getting Started

### Prerequisites

- Node.js and npm installed

### Setup

1. **Clone the repository:**

   ```sh
   git clone https://github.com/yourusername/customer-rewards-frontend.git
   cd customer-rewards-frontend
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Start the React application:**

   ```sh
   npm start
   ```

### Usage

The frontend application will be available at `http://localhost:3000`.

### Mock Data

The application uses mock data to simulate the rewards calculation. The mock data is defined in `src/__mocks__/mockData.js`.

### Testing

The project uses Jest and React Testing Library for frontend testing.

1. **Run tests:**

   ```sh
   npm test
   ```

### File Structure

```plaintext
React-Retailer/
├── public/
├── src/
│   ├── components/
│   │   ├── Error.js
│   │   └── ...
│   ├── services/
│   │   ├── useFetchApi.js
│   │   └── ...
│   ├── utils/
│   │   ├── calculateMonthlyPoints.js
│   │   └── ...
│   ├── __mocks__/
│   │   ├── mockData.js
│   ├── App.css
│   ├── App.js
│   ├── App.test.js
│   ├── index.js
│   ├── setupTests.js
│   └── ...
├── package.json
└── ...
```

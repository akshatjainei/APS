# Automated Parking System

An advanced parking management solution that uses computer vision to identify free parking slots and provides an integrated user authentication and payment system.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Computer Vision**: Utilizes OpenCV to identify free parking slots in real-time.
- **Dockerized Application**: The computer vision model is hosted on DockerHub for easy deployment.
- **Node.js Backend**: Provides an API for parking lot management.
- **MongoDB Database**: Stores user and parking lot information.
- **Redis Caching Layer**: Improves performance and scalability.
- **Google OAuth 2.0**: User authentication and authorization.
- **Stripe Payment Gateway**: Handles payments and generates QR code tickets.
- **Frontend**: Built with HTML, CSS, and JavaScript located in the `public` folder.

## Installation

### Prerequisites
- Docker
- Node.js
- npm
- MongoDB
- Redis

### Clone the Repository

```bash
git clone https://github.com/akshatjainei/APS.git
```

### Computer Vision Model Setup and Redis 
```bash
docker compose up
```

### Backend Setup 
- Install Node.js dependencies:
```bash
npm install
```
-Set up environment variables: Create a .env file in the directory and add the following:
```bash
PORT=your_port_number
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
MONGO_URI=your_mongodb_url
```
- Run the backend:
```bash
nodemon app.js
```

## Usage

### User Authentication
- Navigate to http://localhost:PORT/auth to authenticate using Google OAuth 2.0.
### Parking Lot Management
- Access the parking lot API at http://localhost:PORT/parkingLot for managing parking slots.
### Payments and QR Code Generation
- The Stripe payment gateway is integrated, and upon successful payment, a QR code ticket is generated for the user.
### Frontend
- The frontend can be accessed by opening the index.html file located in the public folder.


## Technologies Used

- OpenCV: For computer vision and free slot detection.
- Docker: To containerize the computer vision model.
- Node.js: Backend server.
- MongoDB: Database for storing user and parking lot data.
- Redis: Caching layer to enhance performance.
- Google OAuth 2.0: For user authentication.
- Stripe: For payment processing.
- QR Code Generator: To generate QR code tickets.
- HTML, CSS, JavaScript: Frontend technologies used in the public folder.

## Contributing

- Fork the repository.
- Create a new branch (git checkout -b feature-branch).
- Commit your changes (git commit -m 'Add some feature').
- Push to the branch (git push origin feature-branch).
- Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

# Login and Dashboard Application

## Description
This project is a simple React application for Daynt-Internship Application that includes a login page and a dashboard page. The login page allows users to input their email and password. After successful login, the user is redirected to the dashboard. The dashboard displays a data table with features such as editing, deleting, and adding new items. It also includes authentication guard functionality to prevent unauthorized access to the dashboard.

---

## Features

1. **Login Page**
   - Accepts email and password.
   - Redirects to the dashboard on successful login.

2. **Authentication Guard**
   - Ensures only logged-in users can access the dashboard.
   - Redirects unauthorized users back to the login page.

3. **Dashboard**
   - Displays a data table with columns: Name, Age, Date of Birth, and Actions.
   - Actions include Edit, Delete, and Add New Item.
   - Automatically calculates the age from the date of birth.
   - Provides toast notifications for Add/Edit/Delete operations.
   - Includes skeleton loaders during AJAX operations.

4. **Backend Integration**
   - Retrieves data from a mock backend API.
   - Sends POST, PUT, and DELETE requests to handle Add, Edit, and Delete operations.

---

## Technologies Used

### Frontend
- **React.js**: For building the user interface.
- **Tailwind CSS**: For styling the components.
- **React Router**: For routing and navigation.
- **Toastify**: For showing toast messages.
- **Axios**: For making API calls.
- **React Skeleton**: For loading indicators.

### Backend
- Mock backend data served through a simple Node.js/Express API.
---

## Installation and Setup

### Prerequisites
- Node.js installed on your system.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/LovkashGarg/daynt-Lovkash_garg.git
   ```

2. Navigate to the client directory :
   ```bash
   cd client
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

5. Navigate to the server directory:
   ```bash
   npm install 
   node index.js
   ```

6. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Usage

1. **Login**
   - Use any valid email and password combination (mock authentication).
   - Use user@example.com as email and Test@123 as password to login 

2. **Dashboard**
   - View the table with data fetched from the backend.
   - Perform CRUD (Create, Read, Update, Delete) operations using the Action buttons.

3. **Authentication Guard**
   - Attempting to access the dashboard directly without logging in will redirect you to the login page.

---

## Key Components

1. **Login.jsx**: Handles user login functionality.
2. **Dashboard.jsx**: Contains the data table and operations like Add/Edit/Delete.
3.
4. **index.js**: Handles API calls.

---

## Future Enhancements
- Add user authentication with JWT.
- Implement persistent login with local storage or cookies.
- Add pagination to the data table.
- Enhance the backend to use a real database.

---

## Contributing
Feel free to contribute to this project by creating a pull request or raising issues.

---

## License
This project is licensed under the [MIT License](LICENSE).



# Roster Management System with CSV Upload

This project is a **React-based Roster Management System** where team admins can manage player data. It allows adding players via a form, uploading CSV files to bulk add players, and provides alerts for success or errors. The application stores data in **localStorage** to ensure persistence across page reloads, and it has a fully responsive design.

## Features

- **Add, Edit, and Delete Players**: Simple forms for adding or updating player information (Name, Position, Jersey Number).
- **CSV File Upload**: Bulk add players by uploading a properly formatted CSV file. A sample CSV template can be downloaded for easy reference.
- **Alerts for Feedback**: Displays success alerts when players are added successfully from CSV, and error alerts if the CSV format is invalid.
- **Data Persistence**: Player data is saved in **localStorage**, ensuring it persists even when the page is refreshed.
- **Responsive Design**: Built using **Bootstrap** to ensure a smooth experience across devices.
- **Form Validation**: **Formik** and **Yup** are used for form validation.

## Live Demo

Check out the live demo at: [Roster Management System](https://smith-0.github.io/CRUD-FORM-CSV/)

## Deployment

This repository uses GitHub Actions to automatically deploy to GitHub Pages. Any changes pushed to the `main` branch will trigger a workflow that builds the project and updates the `gh-pages` branch.

## Technologies Used

- **React.js** (with Vite + TypeScript)
- **Formik** for form handling and validation
- **Context API** for state management
- **localStorage** for data persistence
- **Bootstrap** for responsive UI
- **Papaparse** for CSV parsing

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/roster-management-system.git
   ```

2. Navigate to the project directory:

   ```bash
   cd roster-management-system
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173/`.

## Usage

1. **Adding a Player**: Fill out the form and click "Add Player". The player will appear in the table below.
2. **Editing a Player**: Click the "Edit" button next to a player, modify their details in the form, and submit.
3. **Deleting a Player**: Click the "Delete" button to remove the player from the roster.
4. **CSV Upload**: Download the sample CSV, fill it out, and upload it to bulk add players. Make sure the format matches the template to avoid errors.
5. **Alerts**: Success or error alerts will appear after uploading the CSV file, and disappear after 5 seconds, or you can manually close them.

## Sample CSV Format

The CSV file should contain the following columns:

Example:

```csv
Name,Position,Number
John Doe,Forward,7
Jane Smith,Guard,12
```

# NASA Space Gallery

This project is a simple web application that fetches data from the NASA API to display a gallery of space images. Each image can be viewed in a modal that shows its title, date, and explanation. The application is styled with NASA branding and includes a loading message during data retrieval.

## Project Structure

```
nasa-space-gallery
├── src
│   ├── css
│   │   ├── modal.css        # Styles for the modal view
│   │   └── style.css        # Main styles with NASA branding
│   ├── js
│   │   ├── api.js           # Functions to fetch data from NASA API
│   │   ├── gallery.js        # Functions to display the image gallery
│   │   ├── modal.js         # Functions to manage modal functionality
│   │   └── loader.js        # Functions to manage loading messages
│   └── index.html           # Main HTML file for the application
├── package.json              # npm configuration file
└── README.md                 # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd nasa-space-gallery
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Open `src/index.html` in your browser to view the application.

## Features

- Fetches space images from the NASA API.
- Displays images in a responsive gallery layout.
- Modal view for detailed image information.
- Loading message during data retrieval.
- NASA branding applied throughout the application.

## License

This project is licensed under the MIT License.
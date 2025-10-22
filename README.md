# Flatmate Finder 
Demo video Link:
Hosted Link:

A web application to help users find and manage flatmate profiles. Users can create, search, edit, and delete profiles. Built with modern full-stack tools for speed and scalability.


## Stack and Tools Used

Frontend 
- React (Vite)  
- React Router v6  
- Bootstrap 5  
- CSS Modules  

Backend  
- Node.js  
- Express.js  
- MongoDB (Mongoose)  

Other Tools 
- dotenv for environment variable management  
- Fetch API for HTTP requests  
- Git for version control  

 ## Setup Instructions

1. Clone the repository 
- git clone https://github.com/kelleman/flatmate_finder.git
- cd flatmate_finder

2. Install Backend Dependencies
- cd flatmate_finder_test
- npm install

3. Install frontend dependencies

- cd ../frontend
- npm install

4. Configure environment variables
- MONGO_URI=your_mongodb_connection_string
- PORT=5000

5. Run the backend
- npm start

6. Run the frontend
- cd ../frontend
- npm run dev

7. Open your browser at http://localhost:5173

## LinkedIn Image Handling
For profile images, the application currently does not fetch real LinkedIn images due to API access restrictions. Instead, a placeholder image is used for each profile.

If more time or API access were available, LinkedIn OAuth and profile picture endpoints could be integrated for real images.

## Tradeoffs & Next Steps
Tradeoffs made due to time constraints:
- Profile images are placeholders instead of real LinkedIn images.
- Search filtering is basic (matches name and location with regex).
- No authentication or user accounts implemented yet.

## Next steps if given more time:
- Integrate LinkedIn OAuth to fetch real profile images.
- Add user authentication (login/signup) with JWT or session management.
- Make the design fully responsive and mobile-friendly.
- Add testing (unit & integration) for API endpoints and frontend components.
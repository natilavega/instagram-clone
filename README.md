# Instagram Clone

Clone of the web version of Instagram developed in React.js with Tailwind CSS styling and Firebase services. This application is designed to be responsive and brings back the nostalgic feel of the classic Instagram interface.

### Features

- **Authentication:**
  - Users can log in or sign up using their email and password.
  - Firebase authentication service is utilized for secure user authentication.

- **Dashboard:**
  - Registered users have access to a dashboard displaying posts from accounts they follow.
  - Registered users can like and comment on posts.
  - New users are greeted with suggested accounts to follow.

- **User Profiles:**
  - User profiles showcase the publications made by the user.
  - Profiles are accessible to both registered and unregistered users.

- **Firebase Real-time Database:**
  - The application uses Firebase's real-time database to ensure seamless updates and interactions.

#### Limitations in the First Version

- Currently, users can only browse existing posts and follow/unfollow other accounts.
- Users can register but cannot publish new images in this version.
  

### Getting Started

1. **Clone the Repository:**
   
     ```bash
     git clone https://github.com/natilavega/instagram-clone.git

2. **Set Up Firebase:**
   
    - Create a Firebase project and set up authentication and real-time database.
    - Update the Firebase configuration in your application.

3. **Run the Application:**
   
    ```bash
    npm start
    ```
  
    The application will be available at http://localhost:3000.

### Contributing
Contributions are welcome! If you find issues or have suggestions, please open an issue or submit a pull request.

### Acknowledgements
- [Instagram](https://www.instagram.com/) for the inspiration.
- [Firebase](https://firebase.google.com/) for providing authentication and real-time database services.
- [Karl Hadwel](https://www.youtube.com/@CognitiveSurge) for his educational content on YouTube.

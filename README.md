# **Recipes App**


Detitans Random Recipes is a React Native application that generates random recipes using the Spoonacular API. This project was developed as part of my studies for Wix exams, and it showcases my skills in React Native, backend development with Spring Boot, and database management with MongoDB.

## Features

- Generates random recipes based on user preferences.
- Retrieves recipe data from the Spoonacular API.
- Stores recipe data in MongoDB using a backend built with Spring Boot.
- Allows users to search for specific recipes.
- Provides detailed information about each recipe, including ingredients and instructions.

## Technologies Used

- React Native: A JavaScript framework for building cross-platform mobile applications.
- Spoonacular API: An API that provides access to a vast collection of recipes.
- MongoDB: A NoSQL database used for storing recipe data.
- Spring Boot: A Java-based framework used for building the backend RESTful API.

## Installation

1. Clone the repository: `git clone https://github.com/your-username/detitans-random-recipes.git`
2. Install dependencies: `npm install`
3. Set up the backend:
   - Ensure you have MongoDB installed and running.
   - Navigate to the `backend` directory: `cd backend`
   - Update the MongoDB connection settings in `application.properties` file.
   - Build and run the backend: `./mvnw spring-boot:run`
4. Start the React Native application:
   - Navigate back to the root directory: `cd ..`
   - Run the app: `npm start`

## Configuration

To configure the application, you'll need to obtain an API key from the Spoonacular API. Once you have the key, create a file named `.env` in the project root directory and add the following line:

```
SPOONACULAR_API_KEY=your-api-key
```

Replace `your-api-key` with your actual API key.

## Contributing

Contributions are welcome! If you encounter any issues or have suggestions for improvement, please open an issue or submit a pull request. Make sure to follow the project's code style and guidelines.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

I would like to express my gratitude to the following resources:

- Spoonacular API for providing access to a wide range of recipe data.
- Spring Boot and MongoDB for their powerful backend and database capabilities.
- Wix exams for providing a valuable learning opportunity to enhance my skills.

**Requirments**

    1) NodeJS version 18.16.0 or higher
    2) To run it on android emulator need to install Android Studio
    3) To run it on Iphone simulator need to install xcode

**Usage**

    in the root dir run:
    1) npm install
    2) npx expo start
    3) press `i` to run on IOS or `a` to run on Android

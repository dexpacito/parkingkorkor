# parkingkorkor

# **NUS Orbital 2023 – Milestone 2**


## **Proposed Level of Achievement:**

Apollo 11


## **Project Motivation:**

What do young adults do when they first get their driver’s license? You’re right, they go out for a drive. Being young adults ourselves, we have found ourselves in similar situations. Perhaps it is to run errands during the day, or to drive to dinner with friends, one thing is sure, drivers need to find a place to park.

Parking can get complicated very quickly. Especially for the budget-conscious and time-conscious folk, balancing between various factors when deciding where to park can be challenging. 


## **Aim:**

Parkingkorkor will be a web-based application that serves as a platform for drivers to get up-to-date information about carparks in the vicinity of their selected destination, such as the number of lots, price, and distance to their final destination.

Inspired by the similarly titled “RainKorKor” bot popular on Telegram, Parkingkorkor sees itself as an accessible way for drivers to get information to better plan their journeys.


## **User Stories:**

1. As a budget-conscious driver, I want to know where I can park at the most affordable rate near my destination without spending too much time researching.

2. As a forward-thinking driver, I want to know that the car park I am travelling to has lots available, and where the alternative parking spaces are if the car park is full.

3. As a frequent driver, I want to be able to search for available parking spots in real-time so that I can find a convenient location to park my car without wasting time driving around.

4. As a student, I want to be able to compare parking prices in different areas so that I can find the most affordable option near my school.


## **Tech Stack:**



* **Frontend:**
    * React
    * HTML
    * CSS + chakra ui
* **Backend:**
    * FireBase
    * Axios
    * Express
    * NodeJS
* **APIs:**
    * Google Maps API
    * LTA DataMall API
    * URA API \



## **Project Scope:**

The web app provides a map interface with a search bar for users to enter their desired destination. Parkingkorkor then provides the user with options on where best to park their car.

Features to be rolled out by mid-June:.



1. Search Feature
    1. Users can quickly access destinations through a search.
2. User Log in
    2. Users can login via gmail or email
3. Compilation of Carpark Database
    3. Users benefit from a wider range of carparks.


## **Development Plan:**


<table>
  <tr>
   <td><strong>Task</strong>
   </td>
   <td><strong>Description</strong>
   </td>
   <td><strong>Date</strong>
   </td>
   <td><strong>Person</strong>
   </td>
  </tr>
  <tr>
   <td>Pick up necessary Technologies
   </td>
   <td>To learn sufficient HTML, CSS, JS
   </td>
   <td>May
   </td>
   <td>Dexter, Nicholas
   </td>
  </tr>
  <tr>
   <td>Wireframe
   </td>
   <td>To mockup in figma
   </td>
   <td>May 20-27
   </td>
   <td>Dexter
   </td>
  </tr>
  <tr>
   <td>Firebase
   </td>
   <td>Setup and integrate Firebase
   </td>
   <td>May 25-27 
   </td>
   <td>Nicholas
   </td>
  </tr>
  <tr>
   <td>Extract data
   </td>
   <td>Familiarise with API
   </td>
   <td>June 1-5
   </td>
   <td>Nicholas (LTA) ,Dexter (URA,google)
   </td>
  </tr>
  <tr>
   <td>Build Main Page UI
   </td>
   <td>To have technical implementation of main page
   </td>
   <td>June 1-9
   </td>
   <td>Dexter,Nicholas
   </td>
  </tr>
  <tr>
   <td>Integrate APIs
   </td>
   <td>Connect all relevant APIs to map, do any due diligence
   </td>
   <td>June 10-14
   </td>
   <td>Dexter,Nicholas
   </td>
  </tr>
  <tr>
   <td>MVP
   </td>
   <td>To have barebone version of webapp 
   </td>
   <td>June 15-19
   </td>
   <td>Dexter,Nicholas
   </td>
  </tr>
  <tr>
   <td>Gather User Feedback
   </td>
   <td>To identify areas of improvement
   </td>
   <td>June 19-23
   </td>
   <td>Dexter,Nicholas
   </td>
  </tr>
  <tr>
   <td>Debug and improve
   </td>
   <td>Adjust MVP based on feedback
   </td>
   <td>June 24-29
   </td>
   <td>Dexter,Nicholas
   </td>
  </tr>
  <tr>
   <td>Poster 
   </td>
   <td>Milestone 2
   </td>
   <td>June 24-27
   </td>
   <td>Nicholas
   </td>
  </tr>
  <tr>
   <td>Video
   </td>
   <td>Milestone 2
   </td>
   <td>June 24-27
   </td>
   <td>Dexter
   </td>
  </tr>
  <tr>
   <td>Implement suggestions
   </td>
   <td>To evaluate and implement suggestions from team evaluation
   </td>
   <td>June 28 - July 2
   </td>
   <td>Dexter,  Nicholas
   </td>
  </tr>
  <tr>
   <td>Implement additional features
   </td>
   <td>Work on adding supplementary features like community feedback and enhance user profile
   </td>
   <td>July 3-13
   </td>
   <td>Dexter,  Nicholas
   </td>
  </tr>
  <tr>
   <td>Testing and Debugging
   </td>
   <td>Run user tests and identify and bugs to fix
   </td>
   <td>July 14-20
   </td>
   <td>Dexter, Nicholas
   </td>
  </tr>
</table>



## **Project Management**

After our check-in at Milestone 1, we realized that we had a little catching up to do. Therefore, since then, our meetups became more frequent as we made up for lost time. A sprint session together would be held every two or three days, lasting for three hours at a time.

During this time, work was split between the both of us, with Nicholas taking more tasks on the frontend while Dexter taking more tasks on the backend.


## **Core Features Developed**

As we approach into Milestone 2, these are the core features that we have successfully been able to develop.



* Main page UI: We have built the user interface for the main page, providing an intuitive and visually appealing design.
* Map feature: Using the Google Maps JavaScript API and Places API, we have implemented the map functionality, allowing users to view and interact with the map.
* Carpark location data: By integrating the LTA Datamall API, we have incorporated carpark location data into the application. This empowers users to make informed decisions regarding parking solutions.
* Firebase Log In: We have integrated Google Accounts for logging into Parkingkorkor's web app, ensuring secure and convenient access for users.

From a design perspective, we followed this approach



* Adopting Chakra UI for specific elements, enhancing the overall look and feel of the application.
* Implementing a custom Google Maps style to provide a unique and cohesive visual experience.


## **Problems Encountered**

Throughout the weeks leading up to Milestone 2, we faced several challenges while implementing the desired changes for Parkingkorkor. As developers with limited prior experience, we relied on a combination of online tutorials from platforms like YouTube and AI tools like ChatGPT to guide us.

Here are some of the problems we encountered and how we resolved them:



* **Implementing the Google Maps JavaScript API: **The Google Maps API is fundamental to our project, as it enables users to find parking solutions. However, we initially faced issues with invalid hook calls, which prevented the map from being rendered in our React app. We overcame this by carefully reviewing the documentation and troubleshooting the specific runtime errors.
* **Creating API Endpoints with LTA Datamall API**. Another key component of our project, we faced headwinds when we tried to retrieve data from the API. Initially, we had only used Axios to perform a GET call to the LTA Datamall API, but that was insufficient. We needed to include the API key in the request headers for proper authentication and validation. In order to accomplish this, we decided to utilize Express, a NodeJS framework.

    Express gave us with the flexibility to handle HTTP requests and add custom headers to our API calls. By setting up an Express server, we were able to create a route that made the GET request to the LTA Datamall API with the necessary headers, including the API key. This allowed us to securely access the data and retrieve the desired information.

* **Facing CORS Errors with API calls**. Later in the project, we encountered an issue where we were unable to log the returned data from the API, even though we could see it in our Terminal. This problem was eventually traced back to Cross-Origin Resource Sharing (CORS) complications arising from the fact that our React server was running on a different domain than our backend server. CORS is a security mechanism that restricts cross-origin HTTP requests.

    To resolve this issue, we integrated the CORS middleware into our Express server. This middleware allowed us to configure the necessary headers to explicitly permit cross-origin requests from our React server. By specifying the appropriate access control headers, including the allowed origin, methods, and headers, we effectively bypassed the CORS restrictions.



## **Future Development**

Looking ahead, we have identified several areas for future development:



* **Refinement of UI/UX:** Continuously improving the user interface and experience based on user feedback and usability testing.
* **Additional Features:** Implementing features such as real-time parking availability, personalized recommendations, and user profiles to enhance the functionality and usefulness of the application.
* **Performance Optimization:** Optimizing the application's performance to ensure fast loading times and smooth user interactions, even with a large volume of data.
* **Mobile Friendly site**: WIth many drivers on the go, we aim to enrich Parkingkorkor to allow for a smoother experience on the website
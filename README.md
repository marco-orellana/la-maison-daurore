# la-maison-daurore
The app is built for a non-profit association named [La Maison d'Aurore](http://maisonaurore.org/) located in Montreal which helps children to do their homeworks. The association needed an app that could help her managing the registration of the children and collaborator that would be participating in the homework support activity because everything was being organized in a excel sheet and a lot of time was consumed in filling the forms and putting the informations in the excel sheet. Each students is supervised by a collaborator (volunteer verified by the assocation).


The app consist of 3 parts: Web client, Mobile client and a Server.


I worked on the mobile app and the algorithm to makes the schedules. We had a deadline of 7 weeks.

# Web client
The main platform for parents to register their children or if a volunteer want to participate in the activities.
There is also and admin dashboard that allows the admin to register, manage and see all the users of the app (parents, children, collaborator) and to manage the schedule of the activies. The parents and collaborators can see their own schedules and the admins can see all the schedules. 

The website makes asynchronus requests to the server to fetch the data.


Technologies used: ReactJS, React Router, MaterialUI, Webpack and JWT.



# Mobile client
The mobile app was only made for an admin to use. It allows the admin to have a quick access to the informations of the children, collaborators and the schedules.

This app makes REST calls to the server, fetch the data and synchronise it with the internal database (SQLite).



Technology used: Android.


# Server
This is where all the data is fetched from and where the algorithm for the schedules is located. It is currently hosted with [Heroku](https://www.heroku.com/). The documentation was done with [Postman](https://www.postman.com/api-documentation-generator/). To see the it, you can click [here](https://maison-aurore-api.herokuapp.com/).


Technologies used: NodeJS, Express.js, Mongoose and MongoDB.


# How to install

1. You need to have [Node.js]( https://nodejs.org/en/). If you don't have it, install the LTS version.
2. If you want to use the website, download [Visual Studio Code](https://code.visualstudio.com/download)
3. If you want to use the mobile app, download [Android Studio](https://developer.android.com/studio/?gclid=CjwKCAjwiMj2BRBFEiwAYfTbCsC5km2rQK2nMtURoYvu7CPZERwTLOVvGVrnuKQsj8cjAnFNvSpdqRoCm2MQAvD_BwE&gclsrc=aw.ds)
4. Clone or download the repository.


# How to use

**Website**
1. In Visual Studio Code, click on _File_, then on _Add Folder to Workspace..._ and then choose the repository.
2. Open a terminal at the path of the website _la-maison-daurore/web/_ and do _npm install_ 
3. In Visual Studio Code, open a terminal at the path of the website _la-maison-daurore/web/_ and do _npm run dev_. This should open the website in your default browser.
4. In the connection page, you can log as an super admin with _super_admin@gmail.com_ as email and _abc123..._ as password to see the admin dashboard or you can create an account an fill the forms.

**Mobile**
1. Open Android Studio and then choose the repository.
2. Connect your phone and make sures Android Studio detected it and is using it.
3. In your phone, you must allows other source to install app on it. Press _f6_ and it will install and run the app.
4. In the connection page, you can log as an super admin with _super_admin@gmail.com_ as email and _abc123..._ as password.

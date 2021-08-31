
# FBLoginSamples


The Login Connect With Messenger enables apps to communicate with their FB logged in users via Facebook Messenger. This repo contains sample implmementation that will help you learn to build this experience.

**More Resources
To learn more about the Messenger Platform, check out these other resources:

📚  [Docs : Learn about the feature](https://developers.facebook.com/docs/facebook-login/messenger-integration)
😺 [Developer Community:] Join our developer community! Get help. Give help.

[Access the Login Connect With experience](https://bubbly-fluffy-wholesaler.glitch.me/)

![image](https://user-images.githubusercontent.com/27999169/116519219-cfb9fa00-a903-11eb-9089-f42d3629cf21.png)

# Requirements

* Facebook Login App Page - This app manages the login experience of the website
* Facebook Messenger Experience App - This app manages the messaging experience of the website
* Facebook Page - This is the page on behalf of which message will be sent to the user

To [create new app, follow this documentation](https://developers.facebook.com/docs/development/create-an-app/)
To [create a page, follow this documentation](https://www.facebook.com/pages/create/?ref_type=site_footer)

# Setup Steps

## Installation
1. Clone this repository on your local machine
2. Replace the values  <app_id>,<messenger_page_id> in the file: main.pug
3. Replace  value of <app_id> in script.js


## Deployment
1. npm install express --save
2. npm install got
3. npm install pug
4. Navigate to the folder of your project
5. Install [self certificates to run your localhost](https://nodejs.org/en/knowledge/HTTP/servers/how-to-create-a-HTTPS-server/) on https. Run node server.js to start your project locally using the command : node server.js
6. Open browser and go to - https://localhost:8443/. Ensure that the localhost url is added in the Valid Oauth Redirect URIs of your app setting on [Developer Dashboard](https://developers.facebook.com/apps)

![image](https://cdn.glitch.com/b79404e6-f2f6-4108-bcf6-88c99a9e649e%2Ff55b9803-186f-42bd-9b62-a1d9f5e20e51.image.png?v=1623137720797)

## License

Login Connect With Messenger App Fashionista is Plarform licensed, as found in the LICENSE file.

See the [CONTRIBUTING](CONTRIBUTING.md) file for how to help out.

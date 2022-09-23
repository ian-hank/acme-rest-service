# ACME Corporation REST Service

Time Limit: 3 hours(timed with a timer, all in one shot). All code in this repository was completed within the time limit and in one single go. This repository is not meant to be a guide or example of what a production ready RESTful API should look like. This repository was simply a test to see how far I could get within the time.

A demo RESTful API to support ACME Corp in their endeavors to investigate counterfiet widget production and duplication. Below you can find the details for interacting with this API as well as the prerequisites for using this API. The API is essentially just managing the creation of fake accounts to use for investigating the perps.

---

## Requirements

For development, you will only need to run a Docker container.

In order to run this container you'll need `docker` installed.

* [Windows](https://docs.docker.com/windows/started)
* [OS X](https://docs.docker.com/mac/started/)
* [Linux](https://docs.docker.com/linux/started/)

If the installation was successful, you should be able to run the following command.

    $ docker -v
    Docker version 20.10.14, build a224086

If you need to update `docker` on Windows or Mac, you can do so by using `docker desktop` and navigating to the place listed below.

    Docker Desktop GUI --> Settings --> Software Updates --> Check for updates

---

## Install

    $ git clone https://github.com/ian-hank/acme-rest-service
    Cloning into 'acme-rest-service'...

## Running the project

Running the API is as simple as navigating to the recently cloned directory and issuing the `$ docker compose up` command.

    $ cd acme-rest-service

    $ docker compose up 

In order to gracefully stop/shutdown the container you can use `CTRL + C` or issue the following command below.

    $ docker compose down

---

## REST API Specification and Usage

The calls available and expected responses for ACME Corp's profiles

---

### GET Connection and Status

#### Request

`GET /`

    http://localhost:9000/

#### Response

    {"status":"OK"}

---

### GET a list of all Profiles

#### Request

`GET /api/profiles/`

    http://localhost:9000/api/profiles

#### Response

    Example response:

    [{"_id":"628dab654d8e55bcf74d7515","firstName":"Jeff","lastName":"Witmer","interests":["Lacrosse","MX","API Design"],"locLatitude":{"$numberDecimal":"330.45674"},"locLongitude":{"$numberDecimal":"1.87364"},"__v":0}]

---

### GET a Profile by ID

#### Request

`GET /api/profiles/:id/`

    http://localhost:9000/api/profiles/:id/

#### Response

    Example response from valid ID:
    
    [{"_id":"628dab654d8e55bcf74d7515","firstName":"Jeff","lastName":"Witmer","interests":["Lacrosse","MX","API Design"],"locLatitude":{"$numberDecimal":"330.45674"},"locLongitude":{"$numberDecimal":"1.87364"},"__v":0}]

---

### POST a new profile

#### Request

`POST /api/profiles/new/`

    http://localhost:9000/api/profiles/new/

    JSON Body:
    {
    "firstName": "Ian",
    "lastName": "Hank",
    "interests": [
        "Electric Guitar",
        "Coding",
        "Cyber Security"
    ],
    "locLatitude": 42.45674,
    "locLongitude": 56.87364
}

#### Response

    {"firstName":"Ian","lastName":"Hank","interests":["Electric Guitar","Coding","Cyber Security"],"locLatitude":{"$numberDecimal":"42.45674"},"locLongitude":{"$numberDecimal":"56.87364"},"_id":"6296d8a9c2dd5a1b9f7fb3ed","__v":0}

---

### PATCH a profile by ID

#### Request

`PATCH /api/profiles/update/:id`

    http://localhost:9000/api/profiles/update/:id/

    JSON Body:
    {
    "lastName": "Charles",
    "interests": [
        "Office 365",
        "Landscaping"
    ]}
}

#### Response

    {"firstName":"Ian","lastName":"Charles","interests":["Office 365","Landscaping"],"locLatitude":{"$numberDecimal":"42.45674"},"locLongitude":{"$numberDecimal":"56.87364"},"_id":"6296d8a9c2dd5a1b9f7fb3ed","__v":0}

---

### DELETE a profile by ID

#### Request

`DELETE /api/profiles/delete/:id`

    http://localhost:9000/api/profiles/update/:id/

#### Response

    "message": "Deleted Profile with ID: 6296d8a9c2dd5a1b9f7fb3ed"

---

## Question & Answer

### Were you able to complete all the functionality in the time allotted?  If not, which pieces are outstanding? 

I was not able to complete the entire prompt as assigned within the time limit. I ran out of time beforing being able to fully implement the `node-fetch` calls to provide the weather data and location data based off of a profile's coordinates. I was beginning to work on it when I realized that I was going to run out of time to do the docker container and docker compose files. In the end I decided to prioritize getting those working as I felt they were much more crucial to the overall design.

I also planned to come back to the Persona Id field and see how I wanted to tackle that as well. Depsite asking for clarification, I should have asked for even more clarification. I ended up not doing anything with it at all. It is implemented as a field, just not really being shown or used in the code.

### What potential issues do you see with your API, as implemented?  How would you address them?

Since my time was restricted there was certainly a fair amount of issues that I would have liked to implement. First, the error checking is pretty subpar. While it is implemented on every call, there is still plenty of ways to confuse the end user or person making calls on the API. I would have liked to provide detailed responses with status codes amongst other things if I had more time. I can't assume that everyone will be making calls with postman where these things are shown nicely.

Second, another one of the biggest issues is the lack of input validation. For example, a user could input coordinates that are entirely invalid and would never reach the weather api since there is no checks to ensure that the coordinates entered are actually valid. Having input validation ensures the integrity of data and provides more secure way from breaking the application.


### What security limitations does your API have?

I would say the biggest security exposures in an API come from scripting attacks, ddos or request attacks, and packages. Below I will shortly go over each of these within the API and it's current limitations.

Scripting attacks --> As stated above, no input validation is a pretty big security limitation existing within the API. This leaves the door pretty wide open to some sneaky XSS attacks. The API also does not have an expected API key (unless this is the persona id field to be implemented later). This allows anyone inlcuding those outside of acme corp to have access to the API if it turned into a public facing API.

DDoS Attacks --> The API does not manage requests or has any sort of way/package to detect large volume requests which means it is most likely vulnerable to DDOS attacks and high-request attacks that can be used to take the API offline. Some sort of throttling based on client's requests would be helpful to prevent this.

Package Security --> The API is simple enough that within the backend running `npm audit` provides 0 vulnerabilites to remediate from the packages we are using. I intentionally used the most recent stable version of Node and different packages to try to prevent vulnerabilites within the design. Another reason for using ES6 instead of CommonJS was this allowed the API to use `node-fetch 3.x.x` which is ONLY compatible with ES6 and higher. If I were to use CommonJS, `node-fetch` would have to be downgraded to 2.x.x which contains multiple known vulns.


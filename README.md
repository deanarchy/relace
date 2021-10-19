<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** deanarchy, relace, twitter_handle, email, project_title, project_description
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
 
  <h3 align="center">relace</h3>

  <p align="center">
    🔥 🔥 Virtual marketplace for service, goods, favor and many more! 🔥 🔥
    <br />
    <a href="https://relace.readthedocs.io/en/latest/"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/deanarchy/relace">View Demo</a>
    ·
    <a href="https://github.com/deanarchy/relace/issues">Report Bug</a>
    ·
    <a href="https://github.com/deanarchy/relace/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li><a href="#nerd-zone">Nerd Zone</a></li>
      </ul>
    </li>
    <li><a href="#live-demo">Live Demo</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
    <li><a href="#background">Background</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
Hello world 👋 relace is a virtual marketplace where user can exchange... almost ANYTHING! 🎉. From service, goods, favor, trivial thing, significant thing all you can think of!. This project is aimed to solving a real world problem where user don't know where to sell/buy the **things** that they need (or want or whims 😆). In relace, there are only two: ***Customer*** and ***Provider***. Provider are the one who.. err you know, provides **things** and customer, it goes without saying are the one who buys **things**. Any user registered to relace can assume both roles.

### Nerd Zone 🤓
The relace system architecture is built on the microservice architecture with its common patterns. Although its unit is still comprised of coarse-grained services, it has improved the  scalability, agility, and reliability of the system while overcoming the shortcomings of the monolithic architecture. As the system grows, it may make sense to further break down the services. 

The event-driven microservices paradigm is used in the communication pattern to enable asynchronicity and loose coupling between services. To accomplish this basic pub/sub messaging is needed. AMQP (RabbitMQ) w/ topic exchange type is chosen in this project.

Every service in the system is written on **Typescript - Express.js** with each using **MongoDB** database. All service (excluding display service) serves as a representation of a domain that typically exists in an e-commerce/marketplace business. Only display service exists as a *CQRS* and *BFF*. Due to the infrastructure limitation, new functionalities are to be expected in the future.

When it comes to infrastructure, Docker is used to containerize each service. Each service is designed to run in a Kubernetes cluster to make scaling, replicating, and orchestration easier. Ingress NGINX is utilized as an API gateway for the outside world to communicate with the Kubernetes cluster internals. 

### Built With

* [Typescript](https://www.typescriptlang.org/)
* [Express.js](https://expressjs.com/)
* [Mongoose (w/ Typegoose)](https://mongoosejs.com/)

<!-- LIVE DEMO -->
## Live Demo

[~~relace.dev~~](https://relace.dev)

*Due to a VERY demanding requirement of resources this project has (it's a budget issue actually 😆), deployed app aren't available for the time being.*



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Dean Ramadhan - rmdhndean@gmail.com

Project Link: [https://github.com/deanarchy/relace](https://github.com/deanarchy/relace)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [microservices.io](https://microservices.io/) as a patterns reference.
* [Stephen Grider's course](https://www.udemy.com/course/microservices-with-node-js-and-react/) as my entry to microservices.

<!-- Background -->
## Background




<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/deanarchy/relace.svg?style=for-the-badge
[contributors-url]: https://github.com/deanarchy/relace/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/deanarchy/relace?style=for-the-badge
[forks-url]: https://github.com/deanarchy/relace/network/members
[stars-shield]: https://img.shields.io/github/stars/deanarchy/relace.svg?style=for-the-badge
[stars-url]: https://github.com/denarchy/relace/stargazers
[issues-shield]: https://img.shields.io/github/issues/deanarchy/relace.svg?style=for-the-badge
[issues-url]: https://github.com/deanarchy/relace/issues
[license-shield]: https://img.shields.io/github/license/deanarchy/relace.svg?style=for-the-badge
[license-url]: https://github.com/deanarchy/relace/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/rmdhndean
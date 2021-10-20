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

  <a href="https://github.com/deanarchy/relace">
    <img src="https://i.ibb.co/v4CBYNm/Relace.png"" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">Relace</h3>

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
        <li><a href="#nerd-zone">Nerd Zone</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li><a href="#live-demo">Live Demo</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
    <li><a href="#note">Note</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
Hello world 👋 Relace is a virtual marketplace where user can exchange... almost ANYTHING! 🎉. From service, goods, favor, trivial thing, significant thing all you can think of!. This project is aimed to solving a real world problem where user don't know where to sell/buy the **things** that they need (or want or whims 😆). In Relace, there are only two: ***Customer*** and ***Provider***. Provider are the one who.. err you know, provides **things** and customer, it goes without saying are the one who buys **things**. Any user registered to Relace can assume both roles.

### Nerd Zone
🤓 🤓

*The Relace system architecture is built on the **microservice** architecture with its common patterns. Although its unit is still comprised of coarse-grained services, it has improved the  scalability, agility, and reliability of the system while overcoming the shortcomings of the monolithic architecture. As the system grows, it may make sense to further break down the services.*

*The event-driven microservices paradigm is used in the communication pattern to enable asynchronicity and loose coupling between services. To accomplish this basic pub/sub messaging is needed. AMQP (**RabbitMQ**) w/ topic exchange type is chosen in this project.*

*Every service in the system is written on **Typescript - Express.js** with each using **MongoDB** database. All service (excluding display service) serves as a representation of a domain that typically exists in an e-commerce/marketplace business. Only display service exists as a **CQRS** and **BFF**. Due to the infrastructure limitation, new functionalities are to be expected in the future.*

*When it comes to infrastructure, **Docker** is used to containerize each service. Each service is designed to run in a **Kubernetes** cluster to make scaling, replicating, and orchestration easier. Ingress NGINX is utilized as an API gateway for the outside world to communicate with the Kubernetes cluster internals.*

🤓 🤓

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

<!-- Note -->
## Note
This project is a concrete implementation of my studies into software architecture (and software development in general) while attempting to solve real-world challenges. I acknowledges that many aspects of this project are far from perfect and might be improved further. Futhermore, each service (+ database instance for each service + rabbitmq) in the microservice is deployed independently of the others by definition. While this allows for scalability, agility, resilience, and other benefits, it requires a huge amount of resources to run the entire system. My development environment (minikube w/ gaming PC) aren't able to run the project fully thus only able to test it using unit tests (per service) and integrated tests (per significant features). And, due to budget constraints 😆, the project will not be able to be launched into a cloud cluster anytime soon.


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
# AstralSafeServer

![GitHub](https://img.shields.io/github/license/LuMarans30/AstralSafeServer)
![GitHub repo size](https://img.shields.io/github/repo-size/LuMarans30/AstralSafeServer)
![Lines of code](https://img.shields.io/tokei/lines/github/LuMarans30/AstralSafeServer)
![GitHub issues](https://img.shields.io/github/issues/LuMarans30/AstralSafeServer)
![Website](https://img.shields.io/website?down_message=down&up_message=online&url=https%3A%2F%2Flumarans30.github.io%2FAstralSafeServer%2F)
![GitHub last commit](https://img.shields.io/github/last-commit/LuMarans30/AstralSafeServer)

A basic web server for AstralSafe license generation and validation using Node.js and Express.js.<br />
The license is generated using AES and a quantum random key.

A simple client made with .NET MAUI can be found [here](https://www.github.com/LuMarans30/AstralSafeClient/)

## Docs

A better version of the API documentation using [Swagger](https://swagger.io/) is available at https://lumarans30.github.io/AstralSafeServer/ or at http://localhost:8080/docs.

<br />

By running the server locally, you can test API requests with custom attributes via Swagger.

## Usage

You can send a POST HTTP request to the following endpoints of http://localhost:8080 with the params: <br />
{"uid": ""} or {"uid": "", "license": ""}.

<br />

<ul>
  <li> /api/keygen </li>
  <li> /api/validate-license </li>
</ul>

<br />

## Example

curl -X POST -d '{""uid"": ""xxxx-xxxx-xxxx-xxxx""}' -H "Content-Type: application/json" http://localhost:8080/api/keygen

<br/>

output: {"key": "string", "license":"string"}

<hr />

curl -X POST -d '{""uid"": ""xxxx-xxxx-xxxx-xxxx"", ""license"": ""string""}' -H "Content-Type: application/json" http://localhost:8080/api/validate-license

<br />

if the license is valid, the output will be: {"key": "string"}

else the output will be: {"valid": "false"}

<br />

## Website

To check if the server is running, you can go to http://localhost:8080/.

<br />

## Client generation

Using the OpenApi documents in the swagger.yaml file in the dist directory, it is possible to automatically generate a client or server for different programming languages by importing the file into the [Swagger Editor](https://editor.swagger.io/).

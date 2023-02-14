# AstralSafe
A basic web server for AstralSafe license generation and validation using Node.js and Express.js.<br />
The license is generated using AES and a quantum random key.

## Docs and usage

A better version of the API documentation using [Swagger](https://swagger.io/) is available at https://lumarans30.github.io/AstralSafeServer/ or http://localhost:8080/docs.

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

output: {"license":"xxx"}

<hr />

curl -X POST -d '{""uid"": ""xxxx-xxxx-xxxx-xxxx"", ""license"": ""xxx""}' -H "Content-Type: application/json" http://localhost:8080/api/validate-license

<br />

if the license is valid, the output will be: {"key": "xxx"}

else the output will be: {"valid": "false"}

<br />

## Website

To check if the server is running, you can go to http://localhost:8080/.

<br />

## Client generation

Using the OpenApi documents in the swagger.yaml file in the dist directory, it is possible to automatically generate a client or server for different programming languages by importing the file into the [Swagger Editor](https://editor.swagger.io/).

# AstralSafe
A basic web server for AstralSafe license generation and validation using Node.js and Express.js.
The license is generated using AES and a quantum random key.

# Usage

You can send a POST HTTP request to the following endpoints of http://localhost:8080 with the params: <br />
{"uid": ""} or {"uid": "", "license": ""}.

<br />

<ul>
  <li> /api/keygen </li>
  <li> /api/validate-license </li>
</ul>

<br />

# Example

curl -X POST -d '{""uid"": ""xxxx-xxxx-xxxx-xxxx""}' -H "Content-Type: application/json" http://localhost:8080/api/keygen

<br/>

output: {"license":"xxx"}

<br /><br />

curl -X POST -d '{""uid"": ""xxxx-xxxx-xxxx-xxxx"", ""license"": ""xxx""}' -H "Content-Type: application/json" http://localhost:8080/api/validate-license

<br />

if the license is valid, the output will be: {"key": "xxx"}

else the output will be: {"valid": "false"}

<br />
<br />

# Website

To check if the server is running, you can go to http://localhost:8080/.
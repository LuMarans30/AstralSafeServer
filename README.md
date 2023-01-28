# astralSafe
A  basic webserver that encrypts and decrypts a message using one time pad and a quantum random string as a key.


# usage:

You can send a POST HTTP request to the following endpoints of http://localhost:8080 with the params: {"plaintext": ""} or {"ciphertext": ""}.

<br />

<ul>
  <li> /api/encrypt </li>
  <li> /api/decrypt </li>
</ul>

<br />

# example:

curl -X POST -d '{""plaintext"": ""hello world""}' -H "Content-Type: application/json" http://localhost:8080/api/encrypt

<br/>

output: {"encrypted":"lgjpdqffex"}

<br />

Please note: the encrypted string will be different each time you make a request to the server.

<br /><br />

curl -X POST -d '{""ciphertext"": ""lgjpdqffex""}' -H "Content-Type: application/json" http://localhost:8080/api/decrypt

<br />

output: {"plaintext":"helloworld"}

<br />
<br />

You can also access to a simple web interface by going to http://localhost:8080

<br />

The github page running on this repository is a NON working demo of the project since github allows only static web pages.

To run js outside of browser install node js then use "node <filename>" in terminal of vs code.


What are packages
Packages woh code jo hum ne nahe likha jo kise aur developer ne likha hai aur us ne code publically available kr dia hai tah k aur dev use access kr sakein.

To access code it is available on nmpjs.com website

Search what you want to use package like "cat-me"

How to install packages on our system

copy install command from npmjs.com and run in terminal .
example: npm i cat-me

mean k hum code npmjs ke website se apne system per le kr aate hain.


How to use packages
first of all we have to install package then 
create a js file
require it using require(<package name>)
save it to in a variable so all functionilities are stored in this variable
then call it 


code: 
const catMe = require("cat-me")

console.log(catMe())


What is
package.json
hamara js code jin packages per depend kr ha woh store krti hai ya maintain krti hai.

node_modules
jb hum koi package install krte hain toh npmjs ke website se to code hamare system per aa jata hai ,aa toh jata hai but kaha store hota hai woh store hota hai node_modules folder mein.
example:
we install cat-me package it code go in node_modules
but cat-me also depends on some packages so those packges are also installed and stored in this folder.
and so on one depend on other and at the end there is an package which will be independent so thats it cycle will end there.


package-lock.json
so a package we install it has also dependiencies so another have also dependinces and so on to manage or maintain those packages, package-lock.json is available


What is Server

Server aik mechine hoti hai jis k pass khudd ka operating system,processor,ram/storage hoti hai.

Server aik mechine hai jis ko is trha program kia jata hai k user jo bhi request bhajy ga us ka proper response de sake.


How to create a Server
first run npm init -y (it mean we want to start a node application)
if there is a package.json file in folder it mean k yaha aagy ja kr aik node js application bane ge.
1.Install express package using npm i express
2.require express
3.store it into a variable
4.call express variable which is requireing
server is created
to start server
5.save calling express variable into another variable
6.use .listen(portvalue(ex:3000)) on variable
so server is started

when we call it create server when we listen it start server

code:
const express = require("express")

const app = express() //server created

app.listen(3000) //server started








<!-- Follow instructor rules -->
1.apne man mein aik choota sa bhi doubt nahe rakha ask it to mentors and in class 
(web dev end ho jye ga agar doubt rakha)

2.dont watch any other backend videos accept cohort classes 

3.learn only which is tought in class don't learn extra 

4.dont use ai and will not watch any other creator 


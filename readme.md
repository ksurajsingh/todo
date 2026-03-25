# TODO   
  
## NEED FIX  
[ ] only query db on demand not timely [ why is kafka used ]

## Features  
[ ] maintain order - change in the ui would also change the DB
[ ] CRUD on todo
[ ] categories  
    [ ] add new category  
[ ] parent-child relationship  
[ ] render links to the title of the page
[ ] SAVE EVERYTHING EVERY NIGHT 
[ ] DELETE IS ARCHIEVE
[ ] remove malicious app
[ ] update the category of a given todo
  
## FE  
[ ] add fe support for description in todo modal  
[ ] add fe support for description view in app-main  
  
## DB  
[x] add category and junction table todo_category  
[ ] add category column in todo table  
  
## BE  
[x] support for category   
    [x] mapper  
    [x] dto  
[x] endpoint to add category   
[ ] endpoint to get all category  
  
## FIX   
[ ] avoid duplicate names of todos  
    [ ] should throw error to the user  
    [ ] do not cancel request  
    [ ] keep the name  
  
  
  
  
# FIXED  
[x] todo_category is empty  [using 'category' instead of 'categories']  
[x] there is no category in todo  [ Doesn't have to be]  
[x] category is a 200 in todo/add even tho it doesn't exist  
[x] home page css 
    [x] sidebar
    [x] main content

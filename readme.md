# TODO  
  
## NEED FIX  
[ ] updated at doesn't seem to be changing  
[ ] adapt css for smartphones  

## Features  
[ ] UX for main page  
[ ] UI for main page  
[x] maintain order - change in the ui would also change the DB  
[x] Complete ngRx implementation on existing flow [9:00]  
> [x] read  
> [x] create  
> [x] update  

[ ] CRUD on todo [9:00]  
> [x] read  
> [x] create  
> [x] update  
> [ ] delete  
> [ ] DELETE IS ARCHIEVE  

[ ] categories  [10:00]  
> [ ] add new category  

[ ] parent-child relationship  
[ ] render links to the title of the page  
[ ] SAVE EVERYTHING EVERY NIGHT  
[ ] remove malicious app  
[ ] update the category of a given todo  
  
## FE  
[x] add fe support for description in todo modal  
[x] add fe support for description view in app-main  
  
## DB  
[x] add category and junction table todo_category  
[x] add category column in todo table  
  
## BE  
[x] support for category  
> [x] mapper  
> [x] dto  

[x] endpoint to add category  
[ ] endpoint to get all category  
  
## FIX [1:00]  
[ ] avoid duplicate names of todos  
> [ ] should throw error to the user  
> [ ] do not cancel request  
> [ ] keep the name  

[ ] have response status on apis  
  
  
  
  
# FIXED  
[x] todo_category is empty  [using 'category' instead of 'categories']  
[x] there is no category in todo  [ Doesn't have to be]  
[x] category is a 200 in todo/add even tho it doesn't exist  

[x] home page css  
> [x] sidebar  
> [x] main content  

[x] only query db on demand not timely  [ manually dispatch 'loadTodos' when required ]  

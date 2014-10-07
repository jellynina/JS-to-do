// Problem: user interaction dosen't provide desired result.
// Solution: Add interactivity so the user can manage daily task.



var taskInput = document.getElementById("new-task");
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTasksHolder = document.getElementById("incomplete-tasks"); 
var completedTasksHolder = document.getElementById("completed-tasks");


//New task List item
var createNewTaskElement = function(taskString){
	//create a list item
	var listItem = document.createElement("li");
	//input (checkbox)
	var checkBox =document.createElement("input"); //checkbox
	//label
	var label = document.createElement("label");	
	//input (text)
	var editInput = document.createElement("input"); //text	
	//button.edit
	var editButton = document.createElement("button");	
	//button.delete
	var deleteButton = document.createElement("button");

	//Each elements need modifying
	checkBox.type = "checkbox";
	editInput.type = "text";

	editButton.innerText ="Edit";
	editButton.className = "edit"
	deleteButton.innerText ="Delete";
	deleteButton.className = "delete";

	label.innerText = taskString;


	//Each elemtes need appending 把所有的東西都放到listItem裡面去
	listItem.appendChild(checkBox);
	listItem.appendChild(label);
	listItem.appendChild(editInput);
	listItem.appendChild(editButton);
	listItem.appendChild(deleteButton);
	return listItem;

}


var addTask = function(){
	// Add a new task
	console.log("add task..");

	//Create a new list item with the text from #new-task:
	var listItem = createNewTaskElement(taskInput.value);

	// append listItem to imcompleteTaskHolder
	incompleteTasksHolder.appendChild(listItem);
	bindTaskEvents(listItem, taskCompleted);

	taskInput.value = "";

}

var editTask = function(){

	console.log("edit task...");
	var listItem = this.parentNode;
	var editInput = listItem.querySelector("input[type=text]");
	var label = listItem.querySelector("label");
	var editButton = listItem.querySelector("button");

	var containsClass = listItem.classList.contains("editMode");
	//不使用ClassName, className回傳所有的class陣列，無法100%對比，需要改的時候容易亂


		//if the class of the parent is .editMode
		if(containsClass) {
			//Switch from .editMode
			//label text become the input's value
			label.innerText = editInput.value;
			editButton.innerText = "Edit";
		} else{
			//Switch to .editMode
			//input value becomes the label's text
			editInput.value = label.innerText;
			editButton.innerText = "Done";
		}
			
			
		
		//Toggle .editMode on the list item
		listItem.classList.toggle("editMode");

}

var deleteTask = function(){
	console.log("delete task...");
	//Remove the parent list item from the ul: 先定義list itme, ul
	var listItem = this.parentNode; //this 是deleted btn 
	var ul = listItem.parentNode;
	ul.removeChild(listItem); 
}

var taskCompleted = function(){
	console.log("complete task...");
	var listItem = this.parentNode; //this,點下去的checkbox
  //Append the task list item to the #completed-tasks
   completedTasksHolder.appendChild(listItem);

   //不要合併成 completedTasksHolder.appendChild(this.parentNode); 因為會忘記this.parentNode;是什麼，在前面加個var listItem就很清楚是將完成的清單項目移動

   bindTaskEvents(listItem, taskIncomplete); //reset
}

var taskIncomplete = function(){

	console.log("task incomplete...")
	var listItem = this.parentNode;
  //Append the task list item to the #incompleted-tasks
  incompleteTasksHolder.appendChild(listItem);

  bindTaskEvents(listItem, taskCompleted); //reset
}


//list item 裡面的原件再跟function連結
var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
	//select taskListItem's children
	console.log("bind list item events")
	//每個li裡面有四個元素
	var checkBox = taskListItem.querySelector("input[type=checkbox"); //直接使用css selector
	var editButton = taskListItem.querySelector("button.edit");
	var deleteButton = taskListItem.querySelector("button.delete");
	
	//bind the editTask to edit button
	editButton.onclick = editTask;
	
	//bind the deleteTask to delete button
	deleteButton.onclick = deleteTask;
	
	//bind the checkBoxEventHandler to checkbox
	checkBox.onchange = checkBoxEventHandler;

}

//set the click handler to the addTesk function
//addButton.onclick = addTask;
var ajaxRequest = function() {
  console.log("AJAX request");
}

//Set the click handler to the addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


//cycle over the incompleteTasksHolder ul list items
for (var i =0; i < incompleteTasksHolder.children.length; i++) {//for each list item
	
	//bind events to list item's children (taskCompleted)
	bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
};


//cycle over the completedTasksHolder ul list items
for (var i =0; i < completedTasksHolder.children.length; i++) {//for each list item
	
	//bind events to list item's children (taskIncomplete)
	bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
};




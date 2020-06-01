let completeTask = document.getElementById('task-list');


// event when a task is clicked 
//and makes ajax request to mark it as completed
completeTask.addEventListener('click',clickTask);

function clickTask(obj){
    let targetElem = obj.target.closest('li'); //event delegation
    if(!targetElem){
        // not any list element is clicked
        return;
    }
    
    let xhr = new XMLHttpRequest();
    xhr.open('post',`/act/mark-check/?id=${targetElem.id}`);
    xhr.send();
    
    xhr.onload = function(){
        if(xhr.response=='true'){ // if element was already completed ,mark as incomplete 
            targetElem.style.backgroundColor="transparent";
            targetElem.style.opacity="1";
            let a = document.querySelector('.info span em span').innerHTML;
            document.querySelector('.info span em span').innerHTML = Number(a) + 1; //increasing tasks left
        }
        else{ //mark element as completed
            targetElem.style.backgroundColor="lightgray";
            targetElem.style.opacity="0.4";
            let a = document.querySelector('.info span em span').innerHTML;
            document.querySelector('.info span em span').innerHTML = Number(a)-1; //decreasing tasks left
        }
    };
};

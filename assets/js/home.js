let completeTask = document.getElementById('task-list');

completeTask.addEventListener('click',function(obj){
    let targetElem = obj.target.closest('li');
    if(!targetElem){
        console.log("koi dabba cover ni hua");
        return;
    }
    
    let xhr = new XMLHttpRequest();
    xhr.open('post',`/mark-check/?id=${targetElem.id}`);
    xhr.send();
    
    xhr.onload = function(){
        if(xhr.response=='true'){
            targetElem.style.backgroundColor="white";
        }
        else{
            targetElem.style.backgroundColor="lightgray";
        }
    };

});




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
            targetElem.style.backgroundColor="transparent";
            targetElem.style.opacity="1";
            let a = document.querySelector('.info span em span').innerHTML;
            document.querySelector('.info span em span').innerHTML = Number(a) + 1;
        }
        else{
            targetElem.style.backgroundColor="lightgray";
            targetElem.style.opacity="0.2";

            let a = document.querySelector('.info span em span').innerHTML;
            document.querySelector('.info span em span').innerHTML = Number(a)-1;
        }
    };

});




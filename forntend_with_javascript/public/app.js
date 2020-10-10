function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
// Only to generate csrf toke ^^^
var activeItem = null



buildList()

function buildList(){
var wrapper = document.getElementById('list-wrapper')
wrapper.innerHTML = ''

var url = 'https://smrtodorest.herokuapp.com/api/task-list/'

fetch(url)
.then((resp) => resp.json())
.then(function(data){
console.log('Data:', data)

var list = data

for (var i in list){
var title = `<span class="title">${list[i].title}</span>`
if (list[i].completed == true){
  title = `<strike class="title">${list[i].title}</strike>`
}

var item = `
                <div id="data-row-${i}" class="task-wrapper flex-wrapper">
                    <div style="flex:7">
                        ${title}
                    </div>
                    <div style="flex:1">
                        <button class="btn btn-sm btn-outline-info edit">Edit </button>
                    </div>
                    <div style="flex:1">
                        <button class="btn btn-sm btn-outline-dark delete">-</button>
                    </div>
                </div>
  `
wrapper.innerHTML += item

}

for (var i in list){

var editBtn = document.getElementsByClassName('edit')[i]
var deleteBtn = document.getElementsByClassName('delete')[i]
var title = document.getElementsByClassName('title')[i]

editBtn.addEventListener('click', (function(item){
  return function(){
    editItem(item)
  }
})(list[i]))

deleteBtn.addEventListener('click', (function(item){
  return function(){
    deleteItem(item)
  }
})(list[i]))

title.addEventListener('click', (function(item){
  return function(){
    strikeUnstrike(item)
  }
})(list[i]))

}

})
}


var form = document.getElementById('form-wrapper')
form.addEventListener('submit', function(e){
e.preventDefault()
var url = 'https://smrtodorest.herokuapp.com/api/task-create/'

if (activeItem != null){
var url = `https://smrtodorest.herokuapp.com/api/task-update/${activeItem.id}/`
activeItem = null
}




var title = document.getElementById('title').value

fetch(url, {
method: 'POST',
headers:{
'Content-type':'application/json',
'X-CSRFToken': csrftoken,
},

body:JSON.stringify({'title':title})

} 
).then(function(response){
buildList()
document.getElementById('form').reset()
})


})


function editItem(item){

console.log('Edit item ' , item)
activeItem = item
document.getElementById('title').value = activeItem.title
}

function deleteItem(item){
console.log('delete item', item)
var url = `https://smrtodorest.herokuapp.com/api/task-delete/${item.id}/`
fetch(url, {
method: 'DELETE',
headers:{
'Content-type':'application/json',
'X-CSRFToken': csrftoken,
}
}).then((response) => {
buildList()
})

}

function strikeUnstrike(item){
console.log('strike', item)
item.completed = !item.completed
var url = `https://smrtodorest.herokuapp.com/api/task-update/${item.id}/`
fetch(url, {
method: 'POST',
headers:{
'Content-type':'application/json',
'X-CSRFToken': csrftoken,
},
body:JSON.stringify({'title':item.title, 'completed':item.completed})
}).then((response) => {
buildList()
})

}

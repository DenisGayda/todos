function get_todos() {
    var todos = new Array;
    var todos_str = localStorage.getItem('todo');
    if (todos_str !== null) {
        todos = JSON.parse(todos_str); 
    }
    return todos.sort(sorted);
}
 
function add() {

    var task = document.getElementById('task');
    var todos = get_todos();

    if (task.value === '') {
        alert("You must write something!");
    } else {
        todos.push({task: task.value, done: ''});
        task.value = '';
        localStorage.setItem('todo', JSON.stringify(todos));
        show();
    }
    return false;
}
 
function remove() {
    var id = this.getAttribute('id');
    var todos = get_todos();
    todos.splice(id, 1);
    localStorage.setItem('todo', JSON.stringify(todos));
    
    show();
 
    return false;
}

function change(value, id, chek) {
    var todos = get_todos();
    var todo = {task: value, done: chek}
    todos.splice(id, 1, todo);
    localStorage.setItem('todo', JSON.stringify(todos));
}


var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {

    var value = ev.target.children[0].textContent;
    var id = ev.target.children[1].id;
    var chek = (ev.target.className === '') ? 'checked' : '';
    
    change(value, id, chek)
    show();

  }
}, false);

function sorted(a, b) {
  if (a.done > b.done) return 1;
  if (a.done < b.done) return -1;
}


function show() {
    var todos = get_todos();
    
    console.log(todos)

 
    var html = '<ul>';
    for(var i=0; i<todos.length; i++) {
        html += '<li class=' + todos[i].done + '>' + '<span>' + todos[i].task + '</span>'+ '<button class="remove" id="' + i  + '">x</button></li>';
    };
    html += '</ul>';
 
    document.getElementById('todos').innerHTML = html;
 
    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
}
 
document.getElementById('add').addEventListener('click', add);
show();
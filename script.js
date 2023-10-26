
const toDo_box = document.querySelector('.list');

const create_new_btn = document.querySelector('#addTodo');


let toDo_list = [];

create_new_btn.addEventListener('click', add_todo);

function add_todo() {
    const new_item = {
        id : new Date().getTime(),
        text : "",
        complete : false
    }

    toDo_list.unshift(new_item);

    const newTodo_input = make_input_box(new_item);

    toDo_box.prepend(newTodo_input);

    // 첫 설계 시, 박스를 넘겨받다보니 자식노드를 계속 탐색해야함. 번잡하니 추후 수정
    toDo_box.firstChild.firstChild.childNodes[1].removeAttribute("disabled");
    toDo_box.firstChild.firstChild.childNodes[1].focus();

    toDo_box.focus();

    add_list();

}

function make_input_box(item) {

    let box = document.createElement('div');
    box.setAttribute('class', 'toDo_item');
    // 입력 부분 생성
    const input_box = document.createElement('div');
    const input_check = document.createElement('input');
    const input_text = document.createElement('input');

    // 버튼 부분 생성
    const toDo_btn = document.createElement('div');
    const toDo_btn_edit = document.createElement('button');
    const toDo_btn_disturb = document.createElement('button');

    // 입력 부분 클래스 설정 및 채워넣기
    input_box.setAttribute('class', 'input_box');
    input_check.setAttribute('type', 'checkbox');
    // input_text.setAttribute('type', 'text');
    input_text.value = item.text;
    input_check.checked = item.complete;
    input_text.setAttribute('disabled', "");
    input_text.setAttribute('style', 'color : black;');

    if (item.complete) {
        box.classList.add('complete');
	}

    input_check.setAttribute('class', 'input_checkBox');
    input_text.setAttribute('class', 'input_text');
    input_box.appendChild(input_check);
    input_box.appendChild(input_text);

    // 특정성 부여
    input_text.setAttribute('id', item.id);
    
    // 버튼 부분 클래스 설정 및 채워넣기
    toDo_btn.setAttribute('class', 'Btn_list');
    toDo_btn_edit.setAttribute('class', 'toDoBtn material-symbols-outlined');
    toDo_btn_disturb.setAttribute('class', 'toDoBtn material-symbols-outlined');
    toDo_btn_edit.innerText = 'edit';
    toDo_btn_disturb.innerText = 'do_not_disturb_on';

    toDo_btn.appendChild(toDo_btn_edit);
    toDo_btn.appendChild(toDo_btn_disturb);

    // 리턴할 박스에 추가
    box.appendChild(input_box);
    box.appendChild(toDo_btn);

    // 체크박스
    input_check.addEventListener('change', () => {
        item.complete = input_check.checked;

        if(item.complete) {
            box.classList.add('complete');
        }
        else {
            box.classList.remove('complete');
        }
        add_list();
    });

    input_box.addEventListener('input', () => {
        item.text = input_text.value;
    });

    input_text.addEventListener('blur', () => {
        input_text.setAttribute('disabled', "");
        input_text.setAttribute('style', 'color : black;');
        add_list();

    });

    toDo_btn_edit.addEventListener('click', () => {
        input_text.removeAttribute('disabled');
        input_text.focus();

    })

    toDo_btn_disturb.addEventListener('click', () => {

        toDo_list = toDo_list.filter(t => t.id !== item.id);
        add_list()
        box.remove();

    })

    return box;

}


function display_list () {
    load_list ();


    for(let i = toDo_list.length - 1; i >= 0; i--) {
        const item = toDo_list[i];
        toDo_box.prepend(make_input_box(item));
    }


    
}

display_list();

function add_list() {
    const item_obj = JSON.stringify(toDo_list);
    
    window.localStorage.setItem('list', item_obj);
}

function load_list () {
    const save_list = localStorage.getItem('list');
    if(save_list) {
        toDo_list = JSON.parse(save_list);
    }
}
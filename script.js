const taskIn = document.getElementById("taskIn");
const add = document.getElementById("add");
const list = document.getElementById("list");

let data =
JSON.parse(
localStorage.getItem("todo")
) || [];

function save(){
    localStorage.setItem(
        "todo",
        JSON.stringify(data)
    );
}

function show(){

    list.innerHTML = "";

    data.forEach((x,i)=>{

        const box =
        document.createElement("div");

        box.className = "item";

        box.innerHTML = `
        <span class="txt ${x.done ? "done" : ""}">
            ${x.text}
        </span>

        <div class="opt">
            <input
            type="checkbox"
            ${x.done ? "checked" : ""}>

            <button class="edit">
                ✏️
            </button>

            <button class="del">
                🗑️
            </button>
        </div>
        `;

        const check =
        box.querySelector("input");

        const edit =
        box.querySelector(".edit");

        const del =
        box.querySelector(".del");

        check.onclick = ()=>{

            data[i].done =
            check.checked;

            save();
            show();
        };

        edit.onclick = ()=>{

            const val =
            prompt(
                "Edit Task",
                data[i].text
            );

            if(val){

                data[i].text =
                val.trim();

                save();
                show();
            }
        };

        del.onclick = ()=>{

            data.splice(i,1);

            save();
            show();
        };

        list.appendChild(box);
    });
}

function addTask(){

    const text =
    taskIn.value.trim();

    if(text === ""){
        return;
    }

    data.push({
        text:text,
        done:false
    });

    save();
    show();

    taskIn.value = "";
}

add.onclick = addTask;

taskIn.addEventListener(
    "keydown",
    (e)=>{
        if(e.key==="Enter"){
            addTask();
        }
    }
);

show();

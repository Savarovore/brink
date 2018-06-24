var validInput = document.getElementById('validInput'),
    console_div = document.getElementById('console_div'),
    types = {};
    index = [];

function createBrink (type, childTypes, title){

    // Controls the instanciation of Brinks
    // si child types n´est pas definit... ?

    if (index.includes(title)){
        alert('this title is taken.');
        return;
    }


    if(!(type in types)){
        types[type] = new Brink(type, childTypes);
    }

    const template = types[type];

    if(template.instances_nb === template.max_instances){
        alert('the maximum number of ' + template.type + 'has already been reached.');
        return;
    }

    let brinkInstance = Object.create(template);
    brinkInstance.title = title;
    brinkInstance.father = "";
    brinkInstance.childs = [];

    template.instances_nb ++;
    index.push(title);


    return brinkInstance;
}


function Brink(type, childTypes, max_instances) {

    //mettre des warnings sur la modification des childs types

    // class components
    this.type = type;
    this.childTypes = childTypes;
    this.max_instances = 10;
    this.instances_nb = 0;
}

Brink.prototype.adopt = function(child){
    if(this.childTypes.includes(child.type)){
        child.father = this;
        this.childs.push(child);
    } else {
        alert(child.title + ' of type ' + child.type + ' can´t result from ' + this.type + ' elements.');
    }
};


Brink.prototype.print = function(){
    let text = "";
    let father = this;
    while (father.father){
        father = father.father;
        text = father.type + ' ' + father.title + ' >>> ' + text;
    }

    console_div.innerHTML += text + ' ' + this.type + '<strong>' + this.title + '</strong>';

    for (let child_nb = 0, len = this.childs.length; child_nb<len; child_nb++){
        console_div.innerHTML += '<br/>' + child_nb + ') ';
        this.childs[child_nb].print();
    }
};

Brink.prototype.suggest = function(child){
    alert('You could add a ' + child.childTypes[0]);
};

died = createBrink('Problem:', 'why?', 'I died');
plain = createBrink('why?', 'why?', 'The plain crashed');
motor = createBrink('why?', 'zob', 'The motor broke');
part = createBrink('why?', 'zizi', 'A part was missing');


died.adopt(plain);
died.childs[0].adopt(motor);
died.childs[0].childs[0].adopt(part);
died.print();
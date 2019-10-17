var validInput = document.getElementById('validInput'),
    console_div = document.getElementById('console_div'),
    types = {};
    index = [];



function Framework(name) {

    // A Framework answers a problem

    // class components
    this.name = name;
}



function LogicalElement(type, childTypes, fatherTypes, max_instances) {

    // A LogicalElement is the main type of object in a project
    // In a simple Project with 2 LogicalElements, the first one could be "Problem" 
    // and the 2nd one "Solution"

    // class components
    this.type = type;
    this.childTypes = childTypes;
    this.fatherTypes = fatherTypes;
    this.max_instances = 10;
    this.instances_nb = 0;
}

LogicalElement.prototype.adopt = function(child){

    // A LogicalElement can adopt as a child an other LogicalElement
    // to reflect the logical relation between the 2 elements
    // For example "Problem" could adopt "Solution" as child

    if(this.childTypes.includes(child.type)){
        child.father = this;
        this.childs.push(child);
    } else {
        alert(child.title + ' of type ' + child.type + ' can´t result from ' + this.type + ' elements.');
    }
};


LogicalElement.prototype.print = function(){
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

LogicalElement.prototype.suggest = function(child){
    alert('You could add a ' + child.childTypes[0]);
};


function createLogicalElement (type, childTypes, title){

    // Controls the instanciation of Brinks
    // si child types n´est pas definit... ?

    if (index.includes(title)){
        alert('this title is taken.');
        return;
    }


    if(!(type in types)){
        types[type] = new LogicalElement(type, childTypes);
    }

    const template = types[type];

    if(template.instances_nb === template.max_instances){
        alert('the maximum number of ' + template.type + 'has already been reached.');
        return;
    }

    let LogicalElementInstance = Object.create(template);
    LogicalElementInstance.title = title;
    LogicalElementInstance.father = "";
    LogicalElementInstance.childs = [];

    template.instances_nb ++;
    index.push(title);


    return LogicalElement;
}




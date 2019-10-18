function Framework(name) {

    // A Framework is designed to solve a problem in a structured way
    // Frameworks are used generated and can be stored in public libraries

    // class components
    this.name = name;
    this.logicalElements = {};
}



function LogicalElement(type, creator) {

    // A LogicalElement is the main building block of a Framework
    // A simple Framework might have only 2 LogicalElements:
    // - the 1st one could have the type "Problem" 
    // - the 2nd one could have the type "Solution"
    // A new template is generated using the keyword "new"
    // Once a template generated, multiple instances can be created using the method "Object.create()"
    // These instances are stored within the template

    // parametrized attributes
    this.type = type;
    this.creator = creator;

    // relationship attributes
    this.childTypes = [];
    this.fatherTypes = [];
    this.maxChilds = 100;
    this.maxFathers = 100;

    // control attributes
    this.maxInstances = maxInstances;
    this.instances = {}
}



LogicalElement.prototype.instanciate = function(title){

    this.testMaxInstances();
    this.testTitle(title);

    let instance = Object.create(this);
    instance.title = title;

    this.instances[title] = instance;
};


LogicalElement.prototype.testMaxInstances = function(){

    if (this.instances.length === this.maxInstances){
        alert('the maximum number of ' + this.type + 'has already been reached.');
        return;
    } 

};


LogicalElement.prototype.testTitle = function(title){

    if (title in Object.keys(this.logicalElements)){
        alert('There is already a ' + this.type + ' with the title ' + title + '.');
        return;
    } 

};


LogicalElement.prototype.testMaxChilds = function(){

    if (this.childs.length === this.maxChild){
        alert('This ' + title + ' has reached the maximum number of elements depending on him.');
        return;
    } 

};


LogicalElement.prototype.testMaxFathers = function(){

    if (this.fathers.length === this.maxFathers){
        alert('This ' + title + ' has reached the maximum number of elements it can depend on.');
        return;
    } 

};



LogicalElement.prototype._becomeFather = function(child){

    this.childs.push(child);

};


LogicalElement.prototype._becomeChild = function(father){

    this.fathers.push(father)

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






// MODEL FRAMEWORK METHODS

Framework.prototype.createLogicalElement = function(type){
    if(!(type in Object.keys(this.logicalElements))){
        this.logicalElements[type] = new LogicalElement(type);
    }
};

Framework.prototype.bindLogicalElements = function(father, child){

    // A LogicalElement can become father of an other LogicalElement
    // to reflect a logical relation between the 2 elements
    // For example "Problem" could become the father of a "Solution"
    // It is a reciprocal transasctional process

    if(father.childTypes.includes(child.type) && child.fatherTypes.includes(father.type)){
        father._becomeFather(child)
        child._becomechild(father)
    }
}



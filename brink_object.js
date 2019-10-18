function Element(type) {

    // A LogicalElement is the main building block of a Framework
    // A simple Framework might have only 2 LogicalElements:
    // - the 1st one could have the type "Problem" 
    // - the 2nd one could have the type "Solution"
    // A new template is generated using the keyword "new"
    // Once a template generated, multiple instances can be created using the method "Object.create()"
    // These instances are stored within the template

    // parametrized attributes
    this.type = type;

    // relationship attributes
    this.childTypes = [];
    this.fatherTypes = [];
    this.maxChilds = 100;
    this.maxFathers = 100;

    // control attributes
    this.maxInstances = maxInstances;
    this.instances = {};

    // metadata
    this.metadata = {};

}


Element.prototype.instanciate = function(title){

    testMaxInstances = this.testMaxInstances();
    if (!testMaxInstances) {return;}
    testTitle = this.testTitle(title);
    if (!testTitle) {return;}

    let instance = Object.create(this);
    instance.title = title;

    this.instances[title] = instance;
};


Element.prototype.testMaxInstances = function(){

    if (this.instances.length === this.maxInstances){
        alert('the maximum number of ' + this.type + 'has already been reached.');
        return false;
    } else {
        return true;
    }

};


Element.prototype.testTitle = function(title){

    if (title in Object.keys(this.logicalElements)){
        alert('There is already a ' + this.type + ' with the title ' + title + '.');
        return false;
    } else {
        return true;
    }

};


Element.prototype.testMaxChilds = function(){

    if (this.childs.length === this.maxChild){
        alert('This ' + title + ' has reached the maximum number of elements depending on him.');
        return false;
    } else {
        return true;
    }

};


Element.prototype.testMaxFathers = function(){

    if (this.fathers.length === this.maxFathers){
        alert('This ' + title + ' has reached the maximum number of elements it can depend on.');
        return false;
    } else {
        return true;
    } 

    
};


Element.prototype._becomeFather = function(child){

    this.childs.push(child);

};


Element.prototype._becomeChild = function(father){

    this.fathers.push(father)

};


Element.prototype.getFathers = function(){

    
    
};


Element.prototype.suggest = function(child){

    alert('You could add a ' + child.childTypes[0]);

};



function Connector(fatherType, childType, logicalNature){

    this.fatherType = fatherType;
    this.childType = childType;
    this.logicalNature = logicalNature;

    this.instances = []

    this.fathers = [];
    this.childs = [];
}


Connector.prototype.instanciate = function(fathers, childs){

    let instance = Object.create(this);

    this.fathers.push(fathers);
    this.childs.push(childs);

    this.instances.push(instance);

};



function Framework(name) {

    // A Framework is designed to solve a problem in a structured way
    // Frameworks are used generated and can be stored in public libraries
    // Frameworks are composed of LogicalElements

    // class components
    this.name = name;
    this.elements = {};
    this.connectors = {};

}


Framework.prototype.createElement = function(type){

    if(type in Object.keys(this.elements)){
        alert('This framework already has an element called ' + type + '.');
        return;
    }

    this.elements[type] = new Element(type);

};


Framework.prototype.bindElements = function(father, child){

    // A LogicalElement can become father of an other LogicalElement
    // to reflect a logical relation between the 2 elements
    // For example "Problem" could become the father of a "Solution"
    // It is a reciprocal transasctional process

    if(father.childTypes.includes(child.type) && child.fatherTypes.includes(father.type)){
        father._becomeFather(child)
        child._becomechild(father)
    }

    // 
    connector = new Connector(father, child)
    this.connectors.push(connector)
}



Framework.prototype.getFathers = function(element){

    fathers = [];

    function findFather(connector){
        if (connector.child === element){
            fathers = fathers.concat(connector.fathers)
        }
    }

    connectors.forEach(findFather);

    // would be useful to remove duplicates

    return fathers;

} 



Framework.prototype.getChildren = function(element){

    childs = [];

    function findChildren(connector){
        if (connector.father === element){
            childs = childs.concat(connector.childs)
        }
    }

    connectors.forEach(findFather);

    // would be useful to remove duplicates

    return childs;

} 



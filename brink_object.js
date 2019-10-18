// DEFINTION OF THE FRAMEWORK OBJECT AND OF THE OBJECT COMPOSING A FRAMEWORK 



function Element(type, framework) {

    // An Element is the main building block of a Framework
    // A simple Framework might have only 2 Elements:
    // - the 1st one could have the type "Problem" 
    // - the 2nd one could have the type "Solution"
    // A new Element template is generated using the keyword "new"
    // Once an Element template is generated,
    // multiple instances can be created using the method "Object.create(myElementTemplate)"
    // These instances are stored within the template
    // Several elements can be put in relation through a connector

    // parametrized attributes
    this.type = type;
    this.framework = framework;

    // relationship attributes
    this.childTypes = []; // the autorized child types when including the Element in a connector  
    this.fatherTypes = []; // the autorized father types when including the Element in a connector 
    this.maxChildren = 100;
    this.maxFathers = 100;

    // control attributes
    this.maxInstances = maxInstances;
    this.instances = {};

    // metadata is user defined to build richer frameworks
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

    // test if a

    if (title in Object.keys(this.instances)){
        alert('There is already a ' + this.type + ' with the title ' + title + '.');
        return false;
    } else {
        return true;
    }

};


Element.prototype.testMaxChilds = function(){

    children = this.framework.getchildren(this)
    
    if (children.length === this.maxChild){
        alert('This ' + title + ' has reached the maximum number of elements depending on him.');
        return false;
    } else {
        return true;
    }

};


Element.prototype.testMaxFathers = function(){

    fathers = this.framework.getFathers(this)

    if (fathers.length === this.maxFathers){
        alert('This ' + title + ' has reached the maximum number of elements it can depend on.');
        return false;
    } else {
        return true;
    } 

    
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
    this.children = [];
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
    // Frameworks are composed of Elements which together build a logical chain

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
        connector = new Connector(father, child)
        this.connectors.push(connector)
    } else {
        alert('The relation schema must be updated to allow this type of connection.');
    }

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



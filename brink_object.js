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
    this.framework = framework;
    this.type = type;

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



Element.prototype.suggest = function(child){

    alert('You could add a ' + child.childTypes[0]);

};



function Connector(framework, fathertypes, childTypes, logicalNature){

    // several similar connections between the same objects? how to control?

    // the connector is a connection between fathers and children

    this.framework = framework
    this.fatherTypes = fathertypes; 
    this.childTypes = childTypes; 
    this.logicalNature = logicalNature;

    // the instances created from a given model
    this.instances = []

    // relationship attributes 
    this.fathers = [];
    this.children = [];

    // potential restiction to allow many to one or one to many etc... 
    this.maxFathers = 100
    this.maxChildren = 100
}


Connector.prototype.instanciate = function(fathers, children){

    for (var i=0; i<fathers.length; i++){
        if (!this.fatherTypes.includes(fathers[i].type)){
            alert('Connection impossible to ' + fathers[i]);
            return;
        }
    }
    for (var i=0; i<children.length; i++){
        if (!this.childTypes.includes(children[i].type)){
            alert('Connection impossible to ' + children[i]);
            return;
        }
    }
    if (children.length > this.maxChildren){
        alert('Too many children to establish a connection');
        return false;
    }
    if (this.maxFathers > fathers.length){
        alert('Too many fathers to establish a connection');
        return false;
    }

    let instance = Object.create(this);

    this.fathers = fathers;
    this.children = children;

    this.instances.push(instance);

};

Connector.prototype.edit = function(fathers, children){
    
    // do we edit or recreate?

}

function Framework(name) {

    // A Framework is designed to solve a problem in a structured way
    // Frameworks are used generated and can be stored in public libraries
    // Frameworks are composed of Elements which together build a logical chain

    // class components
    this.name = name;
    this.elementTemplates = {};
    this.connectorTemplates = [];

}


Framework.prototype.createElementTemplate = function(type){

    if(type in Object.keys(this.elements)){
        alert('This framework already has an element called ' + type + '.');
        return;
    }

    // the type info is duplicates...
    this.elementTemplates[type] = new Element(type);

};


Framework.prototype.createConnectorTemplate = function(fathertypes, childTypes, logicalNature, maxFathers, maxChildren){

    // A LogicalElement can become father of an other LogicalElement
    // to reflect a logical relation between the 2 elements
    // For example "Problem" could become the father of a "Solution"
    // It is a reciprocal transasctional process

    connectorTemplate = new Connector(this, fathertypes, childTypes, logicalNature, maxFathers, maxChildren);
    this.connectorTemplates.push(connectorTemplate);

};



Framework.prototype.getFathers = function(element){

    fathers = [];

    function findFathers(instance){
        if (instance.children.includes(element){
            fathers = fathers.concat(connector.fathers)
        }        
    }

    for (var i = 0, iLen=this.connectors.length; i<iLen; i++){
        instances = this.connectors[i].instances;
        instances.forEach(findFathers);
    }

    // would be useful to remove duplicates
    return fathers;

};

Framework.prototype.getChildren = function(element){

    children = [];

    function findChildren(instance){
        if (instance.fathers.includes(element){
            children = children.concat(connector.children)
        }        
    }

    for (var i = 0, iLen=this.connectors.length; i<iLen; i++){
        instances = this.connectors[i].instances;
        instances.forEach(findChildren);
    }

    // would be useful to remove duplicates
    return children;

} 




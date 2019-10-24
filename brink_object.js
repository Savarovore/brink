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
    this.maxInstances = 100;
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




function Connector(framework, fathertypes, childTypes, logicalNature){

    // several similar connections between the same objects? how to control?

    // the connector is a connection between fathers and children

    this.framework = framework
    // fatherTypes and childTypes are own properties of the template object
    // instances created via Object.create() do not have fatherTypes and childTypes as own properties
    // this enables to modify the types for all instances by only changing the template, 
    // exploiting properties prototyp inheritence
    this.fatherTypes = fathertypes; 
    this.childTypes = childTypes; 
    this.logicalNature = logicalNature;

    // the instances created from a given model
    this.instances = [];

    // relationship attributes 
    this.fathers = [];
    this.children = [];

    // potential restiction to allow many to one or one to many etc... 
    this.maxFathers = 100;
    this.maxChildren = 100;
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
        return;
    }
    if (this.maxFathers > fathers.length){
        alert('Too many fathers to establish a connection');
        return;
    }

    let instance = Object.create(this);

    instance.fathers = fathers;
    instance.children = children;

    this.instances.push(instance);

};


Connector.prototype.removeType = function(type){

    for(var i=0; i<this.childTypes.length; i++){ 
        if (this.childTypes[i] === type) {
            this.childTypes.splice(i, 1); 
        }
     }

}



Connector.prototype.removeTypeElements = function(type){
    
    // explain the direction
    for(var i=0; i<this.fathers.length; i++){ 
        if (this.fathers[i] === type) {
            this.fathers.splice(i, 1); 
        }
    }
    
    for(var i=0; i<this.children.length; i++){ 
        if (this.children[i] === type) {
            this.children.splice(i, 1); 
        }
    }

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

    if(type in Object.keys(this.elementTemplates)){
        alert('This framework already has an element called ' + type + '.');
        return;
    }

    // the type info is duplicates...
    this.elementTemplates[type] = new Element(type, this);

};


Framework.prototype.removeElementTemplate = function(type){

    // transform to family mode
    delete this.elementTemplates[type];

    for (var i = 0; i<this.connectorTemplates.length; i++){
        // remove the connection from the connector templates
        connectors[i].removeType(type);
        // remove the connection from the connector instances
        for (var j = 0; j<connectors[i].instances.length; j++){
            connectors[i].instances[j].removeTypeElements(type);
        }          
    }

};


Framework.prototype.createConnectorTemplate = function(fathertypes, childTypes, logicalNature, maxFathers, maxChildren){

    // A LogicalElement can become father of an other LogicalElement
    // to reflect a logical relation between the 2 elements
    // For example "Problem" could become the father of a "Solution"
    // It is a reciprocal transasctional process

    connectorTemplate = new Connector(this, fathertypes, childTypes, logicalNature, maxFathers, maxChildren);
    this.connectorTemplates.push(connectorTemplate);

};


Framework.prototype.getFamilyTypes = function(element, upward){

    types = [];

    for (var i = 0; i<this.connectorTemplates.length; i++){
        connector = this.connectorTemplates[i]
        if (upward){
            additionalTypes = connector.childTypes    
        } else {
            additionalTypes = connector.fatherTypes 
        }
        types = types.concat(additionalTypes);
    }

    // would be useful to remove duplicates
    return types;

};


Framework.prototype.getConnectedElements = function(element, direction){

    elements = [];

    function concatFathers(instance){
        if (instance.children.includes(element)){
            elements = elements.concat(connector.fathers)
        }        
    }
    function concatChildren(instance){
        if (instance.fathers.includes(element)){
            elements = elements.concat(connector.children)
        }        
    }

    for (var i = 0, iLen=this.connectors.length; i<iLen; i++){
        instances = this.connectors[i].instances;
        if (direction === 'father'){
            instances.forEach(concatFathers);
        } else if (direction === 'children'){
            instances.forEach(concatChildren);
        }
        
    }

    // would be useful to remove duplicates
    return elements;

};
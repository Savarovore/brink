// DEFINTION OF THE FRAMEWORK OBJECT AND OF THE OBJECT COMPOSING A FRAMEWORK 



function Element(type, framework) {

    /* An Element is the main building block of a Framework
     A simple Framework might have only 2 Elements:
     - the 1st one could have the type "Problem" 
     - the 2nd one could have the type "Solution"
     A new Element template is generated using the keyword "new"
     Once an Element template is generated,
     multiple instances can be created using the method "Object.create(myElementTemplate)"
     These instances are stored within the template
     Several elements can be put in relation through a connector */

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

    let testMaxInstances = this.testMaxInstances();
    if (!testMaxInstances) {return;}

    let testTitle = this.testTitle(title);
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


Element.prototype.makeDiv = function(upward, logicalNature){

    var elementDiv = document.createElement('div'),
        title = document.createTextNode(this.title),
        link = '';
    
    if (typeof upward === 'undefined'){
        elementDiv.appendChild(title);
    } else if (upward){
        link = ' ' + logicalNature + ' >> ';
        elementDiv.appendChild(title);
        elementDiv.appendChild(document.createTextNode(link));
    } else if (!upward){
        link = ' >> ' + logicalNature + ' ';
        elementDiv.appendChild(document.createTextNode(link));
        elementDiv.appendChild(title);
    }

    return elementDiv;    
}




function Connector(framework, parentTypes, childTypes, logicalNature){

    // several similar connections between the same objects? how to control?

    // the connector is a connection between fathers and children

    this.framework = framework
    // parenttypes and childTypes are own properties of the template object
    // instances created via Object.create() do not have fatherTypes and childTypes as own properties
    // this enables to modify the types for all instances by only changing the template, 
    // exploiting properties prototyp inheritence
    this.parentTypes = parentTypes; 
    this.childTypes = childTypes; 
    this.logicalNature = logicalNature;

    // the instances created from a given model
    this.instances = [];

    // relationship attributes 
    this.parents = [];
    this.children = [];

    // potential restiction to allow many to one or one to many etc... 
    this.maxParents = 100;
    this.maxChildren = 100;
}


Connector.prototype.instanciate = function(parents, children){

    for (var i=0; i<parents.length; i++){
        if (!this.parentTypes.includes(parents[i].type)){
            alert('Connection impossible to ' + parents[i] + ' of type ' + parents[i].type + '. This connector includes ' + this.parentTypes);
            return;
        }
    }
    for (var i=0; i<children.length; i++){
        if (!this.childTypes.includes(children[i].type)){
            alert('Connection impossible to ' + children[i] + ' of type ' + children[i].type + '. This connector includes ' + this.childrenTypes);
            return;
        }
    }
    if (children.length > this.maxChildren){
        alert('Too many children to establish a connection');
        return;
    }
    if (parents.length > this.maxParents){
        alert('Too many parents to establish a connection');
        return;
    }

    let instance = Object.create(this);

    instance.parents = parents;
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
    for(var i=0; i<this.parents.length; i++){ 
        if (this.parents[i] === type) {
            this.parents.splice(i, 1); 
        }
    }
    
    for(var i=0; i<this.children.length; i++){ 
        if (this.children[i] === type) {
            this.children.splice(i, 1); 
        }
    }

}



function Framework(name, session) {

    // A Framework is designed to solve a problem in a structured way
    // Frameworks are used generated and can be stored in public libraries
    // Frameworks are composed of Elements which together build a logical chain

    // class components
    this.session = session;
    this.name = name;
    this.elementTemplates = {};
    this.connectorTemplates = {};

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


Framework.prototype.createConnectorTemplate = function(parenttypes, childTypes, logicalNature, maxParents, maxChildren){

    // A LogicalElement can become parent of an other LogicalElement
    // to reflect a logical relation between the 2 elements
    // For example "Problem" could become the parent of a "Solution"
    // It is a reciprocal transasctional process
    if(logicalNature in Object.keys(this.connectorTemplates)){
        alert('This framework already has a connector called ' + logicalNature + '.');
        return;
    }

    let connectorTemplate = new Connector(this, parenttypes, childTypes, logicalNature, maxParents, maxChildren);
    this.connectorTemplates[logicalNature] = connectorTemplate;

};


Framework.prototype.getFamilyTypes = function(element, upward){

    let types = [];
    
    for (const [_, connectorTemplate] of Object.entries(this.connectorTemplates)){
        if (upward){
            if (connectorTemplate.childTypes.includes(element)){
                var additionalTypes = connectorTemplate.childTypes;
            }
        } else {
            if (connectorTemplate.parentTypes.includes(element)){
                var additionalTypes = connectorTemplate.parentTypes; 
            }
        }
        additionalTypes.forEach(function(type){
            if (!(type in types)){
                types.push(type)
            } 
        });
    }

    return types;

};


Framework.prototype.getConnectedElements = function(element, upward){

    let elements = {};

    function concatConnectedElements(connectorInstance){
        if (upward){
            if (connectorInstance.children.includes(element)){
                parents = connectorInstance.parents;
                for (var i=0; i<parents.length; i++){
                    if (connectorInstance.logicalNature in elements){
                        elements[connectorInstance.logicalNature].concat(parents);
                    }
                    elements[connectorInstance.logicalNature] = parents;
                }
            }                   
        } else {
            if (connectorInstance.parents.includes(element)){
                children = connectorInstance.children;
                for (var i=0; i<children.length; i++){
                    if (connectorInstance.logicalNature in elements){
                        elements[connectorInstance.logicalNature].concat(children);
                    }
                    elements[connectorInstance.logicalNature] = children;
                }
            }        
        }     
    }

    for (const [_, connectorTemplate] of Object.entries(this.connectorTemplates)){
        let connectorInstances = connectorTemplate.instances;
            connectorInstances.forEach(concatConnectedElements);
    }

    // remove duplicates?
    return elements;

};


Framework.prototype.getRoots = function(upward){

    var roots = [];

    for (const [_, elementTemplate] of Object.entries(this.elementTemplates)){
        let elementInstances = elementTemplate.instances;
        for (const [_, elementInstance] of Object.entries(elementInstances)){
            let connectionDict = this.getConnectedElements(elementInstance, upward);
            if (Object.keys(connectionDict).length === 0){
                roots.push(elementInstance);
            }
        }
    }

    return roots;

}


Framework.prototype.makeDiv = function(isActive){

    var frameworkDiv = document.createElement('div'),
        name = document.createTextNode(this.name);
        frameworkDiv.appendChild(name);

    if (isActive){
        frameworkDiv.className = 'active'
    } else {
        frameworkDiv.className = 'inactive'
    }

    var session = this.session,
        framework = this; 
    frameworkDiv.addEventListener('click', function(){
        session.activateFramework(framework);
    });
        
    return frameworkDiv;    

}

Framework.prototype.printTriptic = function(element){

    if (typeof element === 'undefined'){
        roots = this.getRoots(true);
        if (roots.length === 0){
            return;
        } else {
            var element = this.getRoots(true)[0];
        }
    }

    var destination = document.getElementById('tryptic'),
        tripticContainer = document.createElement('div');

    function generateContainer(upward, framework){
        var container = document.createElement('div'),
            connectionDict = framework.getConnectedElements(element, upward);

        for (const [logicalNature, elements] of Object.entries(connectionDict)){
            for (var i=0; i<elements.length; i++){
                var elementDiv = elements[i].makeDiv(upward, logicalNature);
                container.appendChild(elementDiv);
            }
        }

        return container;
    }

    var parentsContainer = generateContainer(true, this),
        childrenContainer = generateContainer(false, this),
        elementContainer = element.makeDiv();

    tripticContainer.appendChild(parentsContainer);
    tripticContainer.appendChild(elementContainer);
    tripticContainer.appendChild(childrenContainer);
    destination.appendChild(tripticContainer);

}



function Session(user){

    this.user = user;
    this.frameworks = [];
    this.activeFramework = "";

}


Session.prototype.generateFramework = function (name){ 

    var framework = new Framework(name, this);
    this.frameworks.push(framework);
    this.printFrameworks();

}


Session.prototype.activateFramework = function(framework){

    // replace by method to avoid multiple references
    this.activeFramework = framework;
    this.activeFramework.printTriptic();
    
}


Session.prototype.printFrameworks = function (){ 

    var frameworks = document.getElementById('frameworks');
    var frameworkContainer = document.createElement('div');

    for(var i=0; i<this.frameworks.length; i++){
        var isActive = false;
        if (this.frameworks[i] === this.activeFramework){
            isActive = true;
        }
        frameworkDiv = this.frameworks[i].makeDiv(isActive);
        frameworkContainer.appendChild(frameworkDiv);
    }
    
    frameworks.innerHTML = "";
    frameworks.appendChild(frameworkContainer);

}

Session.prototype.save = function (){ }





var frameworkName = document.getElementById('frameworkName'),
    newFrameworkValid = document.getElementById('newFrameworkValid');

newFrameworkValid.addEventListener('click', function(){
    s.activeFramework = new Framework(frameworkName.value);
});

var elementName = document.getElementById('elementName'),
    newElementValid = document.getElementById('newElementValid');

newElementValid.addEventListener('click', function(){
    s.activeFramework.createElementTemplate(elementName.value);
});


s = new Session('Julien');

s.generateFramework('Five Whys');
s.activateFramework(s.frameworks[0]);

s.activeFramework.createElementTemplate('why');
s.activeFramework.elementTemplates['why'].instanciate('a');
s.activeFramework.elementTemplates['why'].instanciate('b');
s.activeFramework.elementTemplates['why'].instanciate('c');

a = s.activeFramework.elementTemplates['why'].instances['a'];
b = s.activeFramework.elementTemplates['why'].instances['b'];
c = s.activeFramework.elementTemplates['why'].instances['c'];

s.activeFramework.createConnectorTemplate(['why'], ['why'], 'happened because of', 10, 10);
s.activeFramework.connectorTemplates['happened because of'].instanciate([a], [b]);
s.activeFramework.connectorTemplates['happened because of'].instanciate([b], [c]);



// s.activeFramework.printTriptic(b);
// var roots = fiveWhys.getRoots(true);
// fiveWhys.printTriptic(roots[0]);
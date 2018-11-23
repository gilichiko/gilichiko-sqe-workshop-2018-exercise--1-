import * as esprima from 'esprima';

const parseCode = (codeToParse) => {
    //modelforview(esprima.parseScript(codeToParse,{loc:true}));
    //return createmodel(esprima.parseScript(codeToParse,{loc:true}));
    return esprima.parseScript(codeToParse,{loc:true});
    //return model;
};
const createmodel = (parsedcode) => {
    //.log(model);
    model=[];
    modelforview(parsedcode);
    return model;
};

function perptable(mytable) {
    var result = '<table border=2>';
    result += '<td>' + 'line' +'</td>'+ '<td>' + 'type' +'</td>' +'<td>'+'name'+'</td>'+'<td>'+'condition'+'</td>'+'<td>'+'value'+'</td>';
    for(var i=0; i<mytable.length; i++) {
        result += '<tr>';
        for(var j=0; j<mytable[i].length; j++){
            result += '<td>'+mytable[i][j]+'</td>';
        }
        result += '</tr>';
    }
    result += '</table>';

    return result;
}



const modelforview =(json)=>{
    let type=json.type;
    //model.push(type);
    functions[type](json);
    //return model;
};
const handleProgram = (json)=>{
    let list=json.body;
    list.forEach(function (element) {
        modelforview(element);
    });

};
const handleFor = (json)=>{
    let cond;
    cond=handlecheck(json.test);
    let topush=makeTopush(json.loc.start.line,'for statement','',cond,'');
    model.push(topush);
    modelforview(json.body);
};

const handlecheck = (json)=>{
    let cond;
    if(json.type==='Literal') cond=json.raw;
    else if(json.type==='Identifier') cond=json.name;
    else{
        cond=handleBINexp(json);
    }
    return cond;
};

const handleBINexp = (json)=>{
    //console.log(json.operator);
    let cond;
    let concat1=handlecheck(json.left),concat2=handlecheck(json.right),op;
    op=json.operator;
    cond=concat1.concat(op).concat(concat2);
    return cond;
};

const handleIf = (json)=>{
    let cond=handlecheck(json.test);
    let topush=makeTopush(json.loc.start.line,'if statement','',cond,'');
    model.push(topush);
    modelforview(json.consequent);
    if(json.alternate!=null) handleELse(json.alternate );
};
const handleELse = (json)=>{
    if(json.type==='IfStatement'){
        let cond=handlecheck(json.test);
        let topush=makeTopush(json.loc.start.line,'else if statement','',cond,'');
        model.push(topush);
        modelforview(json.consequent);
        if(json.alternate!=null) modelforview(json.alternate );
    }
    else modelforview(json);
};
const handleWhile = (json)=>{
    let cond=handlecheck(json.test);
    let topush=makeTopush(json.loc.start.line,'while statement','',cond,'');
    model.push(topush);
    let list=json.body;
    modelforview(list);
};
const handleVaribledec = (json)=>{
    //model.push("handle-VARdecs");
    let list=json.declarations ;
    list.forEach(function(element){
        handleVaribledector(element);
    });
};
const handleVaribledector = (json)=>{
    let topush=makeTopush(json.loc.start.line,'variable declaration',json.id.name,'','');
    model.push(topush);
};
const handleVaribledectorasparam = (json)=>{
    let topush=makeTopush(json.loc.start.line,'variable declaration',json.name,'','');
    model.push(topush);
};
const handleVarassign = (json)=>{
    let val=handlecheck(json.right);
    let topush=makeTopush(json.loc.start.line,'assignment expression',json.left.name,'',val);
    model.push(topush);
};
const handleRet = (json)=>{
    let val;
    if(json.argument.type==='BinaryExpression')val=handlecheck(json.argument);
    else {
        if (json.argument.type==='Literal') val=json.argument.raw;
        else {
            if(json.argument.type==='Identifier') val=json.argument.name;
            else val=handleunarrexp(json.argument);
        }
    }
    model.push(makeTopush(json.loc.start.line,'return statement','','',val));
};
const handleunarrexp= (json)=>{
    let val,op;
    if(json.operator==='-') op='-';
    else op='';
    if(json.argument.type==='Literal') val=json.argument.raw;
    else val=json.argument.name;
    return op.concat(val);
};
const handleFuncdec = (json)=>{
    model.push(makeTopush(json.id.loc.start.line,'FunctionDeclaration',json.id.name,'',''));
    let params=json.params;
    params.forEach(function(element){
        handleVaribledectorasparam(element);
    });
    let block=json.body;
    modelforview(block);
};
const handleBlockstatment = (json)=>{
    let list=json.body;
    list.forEach(function(element){
        modelforview(element);
    });
};
const handleExp = (json)=>{
    let type=json.expression.type;
    if(type==='AssignmentExpression') handleVarassign(json.expression);
    if(type==='SequenceExpression') handleSeqEXP(json.expression);
};
const handleSeqEXP = (json)=>{
    let list=json.expressions;
    list.forEach(function(element){
        modelforview(element);
    });
};
const makeTopush = (line,type,name,cond,val) =>{
    let topush={};
    topush['Line']=line;
    topush['Type']=type;
    topush['Name']=name;
    topush['Condition']=cond;
    topush['Value']=val;
    return topush;
};
let model=[];
let functions=[];
functions['ExpressionStatement']= handleExp;
functions['BlockStatement']= handleBlockstatment;
functions['Program']= handleProgram;
functions['FunctionDeclaration']= handleFuncdec;
functions['ForStatement']= handleFor;
functions['WhileStatement']= handleWhile;
functions['ReturnStatement']= handleRet;
functions['IfStatement']= handleIf;
functions['VariableDeclaration']= handleVaribledec;
functions['SequenceExpression']= handleSeqEXP;
functions['AssignmentExpression']= handleVarassign;

export {parseCode};
export {createmodel};
export {perptable};
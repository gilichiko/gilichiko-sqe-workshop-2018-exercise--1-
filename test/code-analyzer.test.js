import assert from 'assert';
import {createmodel, parseCode} from '../src/js/code-analyzer';
const ifout='[{"Line":1,"Type":"if statement","Name":"","Condition":"X<5","Value":""},{"Line":1,"Type":"assignment expression","Name":"high","Condition":"","Value":"1"}]';
const whileout='[{"Line":1,"Type":"while statement","Name":"","Condition":"x>5","Value":""},{"Line":1,"Type":"assignment expression","Name":"z","Condition":"","Value":"1"}]';
const retout='[{"Line":1,"Type":"FunctionDeclaration","Name":"foo","Condition":"","Value":""},{"Line":1,"Type":"return statement","Name":"","Condition":"","Value":"-1"}]';
const retin='function foo(){return -1;}';
const funcout='[{"Line":1,"Type":"FunctionDeclaration","Name":"binarySearch","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"X","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"V","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"n","Condition":"","Value":""}]';
const funcin='function binarySearch(X, V, n){}';
const seqassout='[{"Line":1,"Type":"assignment expression","Name":"a","Condition":"","Value":"1"},{"Line":1,"Type":"assignment expression","Name":"b","Condition":"","Value":"2"}]';
const asmout='[{"Line":1,"Type":"assignment expression","Name":"x","Condition":"","Value":"1"}]';
const letout='[{"Line":1,"Type":"variable declaration","Name":"a","Condition":"","Value":""}]';
const forin='for(i=0;i<10;i++) x++;';
const forout='[{"Line":1,"Type":"for statement","Name":"","Condition":"i<10","Value":""}]';
const com1in='function com1(X, V, n){\n' +
    '    let low, high, mid;\n' +
    '    low = 0;\n' +
    '    high = n - 1;\n' +
    '    while (low <= high) {\n' +
    '        mid = (low + high)/2;\n' +
    '        if (X < 3)\n' +
    '           return n;\n' +
    '        else if (X >5)\n' +
    '            return -2; \n' +
    '        else\n' +
    '            return 1;\n' +
    '    }\n' +
    '    return x+1;\n' +
    '}';
const com1out='[{"Line":1,"Type":"FunctionDeclaration","Name":"com1","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"X","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"V","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"n","Condition":"","Value":""},{"Line":2,"Type":"variable declaration","Name":"low","Condition":"","Value":""},{"Line":2,"Type":"variable declaration","Name":"high","Condition":"","Value":""},{"Line":2,"Type":"variable declaration","Name":"mid","Condition":"","Value":""},{"Line":3,"Type":"assignment expression","Name":"low","Condition":"","Value":"0"},{"Line":4,"Type":"assignment expression","Name":"high","Condition":"","Value":"n-1"},{"Line":5,"Type":"while statement","Name":"","Condition":"low<=high","Value":""},{"Line":6,"Type":"assignment expression","Name":"mid","Condition":"","Value":"low+high/2"},{"Line":7,"Type":"if statement","Name":"","Condition":"X<3","Value":""},{"Line":8,"Type":"return statement","Name":"","Condition":"","Value":"n"},{"Line":9,"Type":"else if statement","Name":"","Condition":"X>5","Value":""},{"Line":10,"Type":"return statement","Name":"","Condition":"","Value":"-2"},{"Line":12,"Type":"return statement","Name":"","Condition":"","Value":"1"},{"Line":14,"Type":"return statement","Name":"","Condition":"","Value":"x+1"}]';
const com2in='function com1(X, V, n){\n' +
    '    let low, high, mid,i;\n' +
    '    low = 0;\n' +
    '    high = n - 1;\n' +
    '    while (low <= high) {\n' +
    '        mid = (low + high)/2;\n' +
    '        if (X < 3)\n' +
    '           return n;\n' +
    '        else if (X >5)\n' +
    '            return -2; \n' +
    '        else\n' +
    '            return 1;\n' +
    '    }\n' +
    'for(i=0;i<10;i++){x=1;}\n' +
    '    return x+1;\n' +
    '}';
const com2out='[{"Line":1,"Type":"FunctionDeclaration","Name":"com1","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"X","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"V","Condition":"","Value":""},{"Line":1,"Type":"variable declaration","Name":"n","Condition":"","Value":""},{"Line":2,"Type":"variable declaration","Name":"low","Condition":"","Value":""},{"Line":2,"Type":"variable declaration","Name":"high","Condition":"","Value":""},{"Line":2,"Type":"variable declaration","Name":"mid","Condition":"","Value":""},{"Line":2,"Type":"variable declaration","Name":"i","Condition":"","Value":""},{"Line":3,"Type":"assignment expression","Name":"low","Condition":"","Value":"0"},{"Line":4,"Type":"assignment expression","Name":"high","Condition":"","Value":"n-1"},{"Line":5,"Type":"while statement","Name":"","Condition":"low<=high","Value":""},{"Line":6,"Type":"assignment expression","Name":"mid","Condition":"","Value":"low+high/2"},{"Line":7,"Type":"if statement","Name":"","Condition":"X<3","Value":""},{"Line":8,"Type":"return statement","Name":"","Condition":"","Value":"n"},{"Line":9,"Type":"else if statement","Name":"","Condition":"X>5","Value":""},{"Line":10,"Type":"return statement","Name":"","Condition":"","Value":"-2"},{"Line":12,"Type":"return statement","Name":"","Condition":"","Value":"1"},{"Line":14,"Type":"for statement","Name":"","Condition":"i<10","Value":""},{"Line":14,"Type":"assignment expression","Name":"x","Condition":"","Value":"1"},{"Line":15,"Type":"return statement","Name":"","Condition":"","Value":"x+1"}]';
describe('The javascript parser', () => {
    it('is parsing a simple var decliration correctly', () => {assert.equal(JSON.stringify(createmodel(parseCode('let a;')),0), letout);});
    it('is parsing assignment correctly',()=>{assert.equal(JSON.stringify(createmodel(parseCode('x=1')),0),asmout);});
    it('is parsing a simple sequence assignment correctly', () => {test3();});
    it('is parsing a simple if statement correctly', () => {test4();});
    it('is parsing a simple while statement correctly', () => {test5();});
    it('is parsing a return statement correctly', () => {test6();});
    it('is parsing a simple function statement correctly', () => {test7();});
    it('is parsing a simple for loop statement correctly', () => {test8();});
    it('is parsing a complex func correctly', () => {test9();});
    it('is parsing a another comlex func statement correctly', () => {test10();});
});
const test3 = ()=>{
    ifout.concat('ee').concat(whileout).concat(retout).concat(funcout).concat(seqassout);
    assert.equal(JSON.stringify(createmodel(parseCode('a = 1,b=2;')),0),
        seqassout
    );
};
const test4 = ()=>{
    //ifout.concat('ee').concat(whileout).concat(retout).concat(funcout).concat(seqassout);
    assert.equal(JSON.stringify(createmodel(parseCode('if (X < 5) high =1;')),0),
        ifout
    );
};
const test5 = ()=>{
    //ifout.concat('ee').concat(whileout).concat(retout).concat(funcout).concat(seqassout);
    assert.equal(JSON.stringify(createmodel(parseCode('while(x>5) z=1;')),0),
        whileout
    );
};
const test6 = ()=>{
    //ifout.concat('ee').concat(whileout).concat(retout).concat(funcout).concat(seqassout);
    assert.equal(JSON.stringify(createmodel(parseCode(retin)),0),
        retout
    );
};
const test7 = ()=>{
    //ifout.concat('ee').concat(whileout).concat(retout).concat(funcout).concat(seqassout);
    assert.equal(JSON.stringify(createmodel(parseCode(funcin)),0),
        funcout
    );
};
const test8 = ()=>{
    //ifout.concat('ee').concat(whileout).concat(retout).concat(funcout).concat(seqassout);
    assert.equal(JSON.stringify(createmodel(parseCode(forin)),0),
        forout
    );
};
const test9 = ()=>{
    //ifout.concat('ee').concat(whileout).concat(retout).concat(funcout).concat(seqassout);
    assert.equal(JSON.stringify(createmodel(parseCode(com1in)),0),
        com1out
    );
};
const test10 = ()=>{
    //ifout.concat('ee').concat(whileout).concat(retout).concat(funcout).concat(seqassout);
    assert.equal(JSON.stringify(createmodel(parseCode(com2in)),0),
        com2out
    );
};

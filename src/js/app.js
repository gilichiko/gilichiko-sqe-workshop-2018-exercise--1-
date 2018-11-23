import $ from 'jquery';
import {parseCode} from './code-analyzer';
import {createmodel} from './code-analyzer';
import {perptable} from './code-analyzer';

$(document).ready(function () {
    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = createmodel(parseCode(codeToParse));
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 0));
    });
    $('#table').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        //console.log('ttt');
        let model4table=createmodel(parsedCode);
        let input4table=[];
        model4table.forEach(element =>{
            input4table.push([element['Line'],element['Type'],element['Name'],element['Condition'],element['Value']]);
        });
        //console.log(input4table);
        $('#mytable').empty();
        $('#mytable').append(perptable(input4table));
    });
});

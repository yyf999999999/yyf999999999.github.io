import data from "./language.JSON" assert {type:"json"};
export default data;
const jnSentence1=document.getElementById("jnSentence1");
const enSentence=document.getElementById("enSentence");
const jnSentence2=document.getElementById("jnSentence2");
const jnContent=document.getElementById("jnContent");
var jn=JSON.parse(data).jn,
    en=JSON.parse(data).en,
    enCharacter=JSON.parse(data).enCharacter,
    jnInput,jnVowel=jn.slice(0,5),enVowel=en.slice(0,5),enInput="",enInputS="";
for (i=0;i<enVowel.length;i++){
    enVowel[i]=enVowel[i][0];
}
function jnToEn(letter){
    var convertText=letter.split("");
    for (i=0;i<convertText.length;i++){
        if (jn.includes(convertText[i]+convertText[i+1])){
            convertText[i]+=convertText[i+1];
            convertText.splice(i+1,1);
        }
        if ((convertText[i]!="っ"||jnVowel.includes(convertText[i+1]))&&jn.includes(convertText[i])){
            convertText[i]=en[jn.indexOf(convertText[i])][0];
        }
        if (convertText[i-1]=="っ"){
            convertText.splice(i-1,1);
            i--;
            convertText[i]=convertText[i].split("")[0].repeat(2)+convertText[i].split("").slice(1).join("");
        }
    }
    return(convertText.join(""));
}
function enToJn(letter){
    var sentence="",sentenceLength=0;
    for (i=0;letter.length!=0;i++){
        var character="",breaker=false;
        while (!breaker){
            if (letter.length!=0){
                character+=letter.split("")[0];
                letter=letter.split("").slice(1).join("");
            }else{
                sentence+=character;
                break;
            }
            if (!enCharacter.includes(character.split("")[0])){
                
                sentence+=character;
                break;
            }
            for (j=0;j<en.length;j++){
                if (en[j].includes(character)&&
                    !(character=="n"&&(enVowel.includes(letter.split("")[0])||letter.split("")[0]=="n"||letter.split("").length==0||letter.split("")[0]=="y"))){
                    sentence+=jn[j];
                    breaker=true;
                    break;
                }else if(character!="n"&&!enVowel.includes(character)&&character==letter.split("")[0]){
                    sentence+="っ";
                    breaker=true;
                    break;
                }
            }
            
        }
    }
    return(sentence);
}
function input(e){
    if (e.key!="Enter"){
        enInput+=e.key;
        var inp=enToJn(enInput).split(""),ans=enToJn(enAnswer).split(""),n=false;
        while (inp[0]==ans[0]/*&&jn.includes(inp[0])*/&&ans.length!=0){
            inp=inp.slice(1);ans=ans.slice(1);
        }
        if (ans.length>=inp.length){
            if (jnVowel.includes(inp.join(""))){
                inp[0]=enVowel[jnVowel.indexOf(inp[0])];
            }
            if (jn.includes(ans[0]+ans[1])){
                var characters=[en[jn.indexOf(ans[0]+ans[1])],en[jn.indexOf(ans[2])]];
            }else if (jn.includes(ans[0])){
                var characters=[en[jn.indexOf(ans[0])],en[jn.indexOf(ans[1])]];
            }else{
                var characters=[[ans[0]],[ans[1]]];
            }
            var character,character2,tfC=false,tfI=false;
            if (/*Array.isArray(characters[0])&&*/characters[0][0]){
                for (i=0;i<characters[0].length;i++){
                    tfI=true;
                    character=characters[0][i].split("");
                    for (j=0;j<inp.length;j++){
                        if (ans[0]=="っ"){
                            for (n=0;n<characters[1].length;n++){
                                character2=characters[1][n].split("");
                                if (inp[0]==character2[0]){
                                    character=character2[0]+character2;
                                    break;
                                }
                            }
                        }
                        tfI=tfI&&character[j]==inp[j];
                    }
                    tfC=tfC||tfI;
                }
                if (!tfC){
                    enInput=enInput.split("").slice(0,-1).join("");
                }
            }
        }else{
            enInput=enInput.split("").slice(0,-1).join("");
        }
        jnSentence2.innerHTML="入力した日本語分 : "+enToJn(enInput);
    }
}
function reflection(e){
    if (e.key=="Enter"){
        jnSentence1.innerHTML="元の日本語文 : "+jnContent.value;
        enSentence.innerHTML="ローマ字に変換した文 : "+jnToEn(jnContent.value);
        jnSentence2.innerHTML="入力した日本語分 : ";
        enAnswer=jnToEn(jnContent.value);
        enInput="";
        jnContent.value="";
    }
}
document.addEventListener("keypress",input,false);
jnContent.addEventListener("keypress",reflection,false);
console.log(JSON.stringify(enCharacter));

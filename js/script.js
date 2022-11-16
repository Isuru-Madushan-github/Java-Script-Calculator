class Calculator{
    constructor( firstBarOutput , secondBarOutput){
        this.firstBarOutput=firstBarOutput;
        this.secondBarOutput=secondBarOutput;
        this.clear();
    }

    clear(){
        this.bottomBarDisplay='';
        this.UpBarDisplay='';
        this.formular=undefined;
    }

    delete(){
        this.bottomBarDisplay=this.bottomBarDisplay.toString().slice(0, -1);
    }

    gettingNumber(number){
        console.log(number);

        if(number=='.' && this.bottomBarDisplay.includes('.')){
            console.log('The number already includes "."!')
        }else{
        this.bottomBarDisplay=this.bottomBarDisplay.toString()+number.toString();
        }
    }

    gettingFormular(formular){
        if(this.bottomBarDisplay=='')return
        if(this.upBarDisplay!==''){
            this.result();
        }
        this.formular=formular;
        this.UpBarDisplay=this.bottomBarDisplay;
        this.bottomBarDisplay='';
    }

    result(){
        let finalResult;
        const up=parseFloat(this.UpBarDisplay);
        const bottom=parseFloat(this.bottomBarDisplay);

        if(isNaN(up)||isNaN(bottom)){
            console.log('Process is cancelled!')
        }else{
            switch (this.formular){
                case '+':
                    finalResult=up+bottom;
                    break;
                case '-':
                    finalResult=up-bottom;
                    break;
                case '*':
                    finalResult=up*bottom;
                    break;
                case '/':
                    finalResult=up/bottom;
                    break;
                default:
                    return
            }
            this.bottomBarDisplay=finalResult;
            this.formular=undefined;
            this.UpBarDisplay='';
            this.formular='';
        }
       
    }

    getDisplayNumber(number){
        const stringNo=number.toString();
        const integerDigits=parseFloat(stringNo.split('.')[0]);
        const decimalDigits=stringNo.split('.')[1];
        let integerDisplay;

        if(isNaN(integerDigits)){
            integerDisplay='';
        }else{
            integerDisplay=integerDigits.toLocaleString('en',{maximumFractionDigits:0})
        }
        if(decimalDigits!=null){
            return `${integerDisplay}.${decimalDigits}`;
        }else{
            return integerDisplay;
        }
    }

    updateDisplayScreen(){
        this.secondBarOutput.innerHTML=this.getDisplayNumber(this.bottomBarDisplay);
        if(this.formular!=null){
            this.firstBarOutput.innerHTML=this.getDisplayNumber(this.UpBarDisplay)+this.formular;
        }
    }
}
const numbersButtons=document.querySelectorAll(".numbers");
console.log(numbersButtons);

const formularsButtons=document.querySelectorAll(".formulars");
console.log(formularsButtons);

const equalButton=document.querySelector(".equal");
console.log(equalButton);

const deleteButton=document.querySelector(".delete");
console.log(deleteButton);

const ac=document.querySelector(".ac");
console.log(ac);

const firstBarOutput=document.querySelector(".firstbar");
console.log(firstBarOutput);

const secondBarOutput=document.querySelector(".secondbar");
console.log(secondBarOutput);

const calculator=new Calculator(firstBarOutput,secondBarOutput);

numbersButtons.forEach(getNumber);

function getNumber(button){
    button.addEventListener('click',()=>{
        calculator.gettingNumber(button.innerHTML);
        calculator.updateDisplayScreen();
        console.log(button);
    });
}

formularsButtons.forEach(getFormular);

function getFormular(button){
    button.addEventListener('click',()=>{
        calculator.gettingFormular(button.innerText);
        calculator.updateDisplayScreen();
        console.log(button);
    });
}

equalButton.addEventListener('click',()=>{
    calculator.result();
    calculator.updateDisplayScreen();
})

ac.addEventListener('click',()=>{
    calculator.clear();
    calculator.updateDisplayScreen();
})
deleteButton.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplayScreen();
})
let calCont = document.getElementsByClassName('calculater-container');
let buttons = document.querySelector("#buttons");
let hstryBtn = document.querySelector(".btnHist");
let title = document.querySelector(".title");
let detail = document.querySelector(".detail");
let closeBtn = document.getElementById('close-Button');
let btnNames = [
    "c", 1, 2, '+',
    3, 4, 5, "-",
    6, 7, 8, "*",
    9, '.','/', "=", 
    "0",
]


let total = document.getElementById('total');
let inpValue = inpValFunc("input");
var inpReservedVal = '';
let CalculatedAndNewNums = [];
let result = '';
let setOperater;
let history = [];
let extraInpValueVar = '';
function inpValFunc(id) {
    return document.getElementById(`${id}`).value;
}
function createBtn(n) {
    for (let i = 0; i < n.length; i++) {
        console.log(n[i] == '=');
        let btnid;
        let btn = document.createElement('button');
        btn.innerHTML = n[i];
        btnid = btn.id = n[i]
        buttons.appendChild(btn)
        showBtnVal(btn)
    }
}

createBtn(btnNames)

function showBtnVal(btn) {
    btn.addEventListener('click', (e) => {
        let btnVal = e.target.innerHTML;
        if (currOperaterIsFunc(btnVal) && !inpValue) {
            alert('first type any number')
        } else {
            let lastValInd = inpValue.length - 1;
            let lastInpVal = inpValue[lastValInd];

            if (inpValue.length && currOperaterIsFunc(btnVal) && isNaN(lastInpVal)) {
                changeOperFunc(btnVal)
                generateArrOfPreviousResult(btnVal)
                setOperater = btnVal;


            } else {
                if (btnVal != "=" || !e.target.innerHTML == 'c') {
                    inpValue = document.getElementById('input').value += btnVal;
                    inpReservedVal += btnVal;
                    extraInpValueVar = inpValue
                }
                if (currOperaterIsFunc(btnVal)) {
                    generateArrOfPreviousResult(btnVal)
                    setOperater = btnVal;
                    history.push(extraInpValueVar + "all Calculations  " + result)
                } else {

                    if (currOperaterIsFunc(setOperater) && e.target.innerHTML != '=') {
                        saveFunc(setOperater)

                    }
                }

                if (e.target.innerHTML == '=') {
                    saveFunc(setOperater);
                    document.getElementById('input').value = result;
                    // inpValue = result;
                    history.push(extraInpValueVar + "  " + result)
                }

                if (e.target.innerHTML == 'c') {
                    clearAll()
                }
            }
        }
    })
}

function generateArrOfPreviousResult() {
    if (result) {
        CalculatedAndNewNums = []
        CalculatedAndNewNums.push(String(result))
        inpReservedVal = '';
    }
}

function saveFunc(op) {
    CalculatedAndNewNums.push(...inpReservedVal.split(op))
    calculate(CalculatedAndNewNums, op);

    if (CalculatedAndNewNums.length) {
        let lastValOfInpVal = CalculatedAndNewNums.pop()
        inpReservedVal = CalculatedAndNewNums[0] + `${op}` + lastValOfInpVal;
        CalculatedAndNewNums = [];
    }
    total.innerHTML = result;
}

function currOperaterIsFunc(ope) {

    let operators = ['-', '+', '*', '/']
    for (const o of operators) {
        if (o == ope) {
            return o
        };
    }
}


function calculate(values, op) {
    console.log(values);
    switch (currOperaterIsFunc(op) == op) {
        case (currOperaterIsFunc(op) == "+"):
            result = addSubstDivMul(values, '+');
            break;
        case currOperaterIsFunc(op) == '-':
            result = addSubstDivMul(values, '-');
            break;
        case currOperaterIsFunc(op) == '*':
            result = addSubstDivMul(values, '*');
            break;
        case currOperaterIsFunc(op) == '/':
            result = addSubstDivMul(values, '/');
            break;

        default: break;
    }
}


function addSubstDivMul(val, op) {
    let total = 0;
    for (const v of val) {
        let n = Number(v)
        switch (Boolean(op)) {
            case op == '+':
                total = total ? total + n : n;
                break;
            case op == '-':
                total = total ? total - n : n;
                break
            case op == '*':
                total = total * n || n;
                break
            case op == '/':
                total = total / n || n;
                break
            default: break;
        }
    }
    return total;
}

function changeOperFunc(btnVal) {
    let x = inpValue.split('')
    x.pop()
    let y = x.join("")
    inpValue = y + btnVal;
    document.getElementById('input').value = inpValue;
    inpReservedVal = inpValue
}
function clearAll() {

    document.getElementById('input').value = '';
    total.innerHTML = 'Total:';
    inpReservedVal = '';
    setOperater = '';
    CalculatedAndNewNums = [];
    inpValue = '';
    result = '';


}






hstryBtn.addEventListener('click', openHistoryPageFunc)
function openHistoryPageFunc() {
    let elemOfCalc = hideOrShowHelper(calCont[0])
    hstryBtn.style.display = 'none'
    closeBtn.style.display = 'inherit'
    elemOfCalc.map((e) => { return e.style.display = 'none'; })
    calCont[0].style.display = 'initial';
    showHistoryFunc()

}

function hideOrShowHelper(element) {
    let result = []
    for (let i = 1; i < element.children.length; i++) {
        result.push(element.children[i]);
    }
    return result;
}

function showHistoryFunc() {
    detail.style.display = 'block';
    title.style.display = 'block'
    history.length ? detail.children[0].style.display = 'none' : 'initial'
    let y = history.map((data) => {
        let li = document.createElement('li');
        li.innerText = data
        return detail.children[1].appendChild(li)
    })

    history = [];
}

closeBtn.addEventListener('click', closeHistoryPageFunc);
function closeHistoryPageFunc() {
    let elemOfCalc = hideOrShowHelper(calCont[0])
    closeBtn.style.display = 'none'
    hstryBtn.style.display = 'initial'
    elemOfCalc.map((e) => { return e.style.display = 'initial'; })
    calCont[0].style.display = 'initial';
    detail.style.display = 'none';
    title.style.display = 'none'
}


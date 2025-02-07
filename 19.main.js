


const containerComponents = document.querySelectorAll(".components-list");
const containerDropArea = document.querySelectorAll(".list-items");
const DefaultLineHeight = 70;
let TotalLines = 6;

let ComponentsDataBase = [
    {
        id: 1,
        image: "https://configurator.lanberg.pl/products/203/Z20389_61895.jpg",
        size: 1,
        name: "",
        category: "",
        position: 0
    },
    {
        id: 2,
        image: "https://configurator.lanberg.pl/products/244/Z24423_92379.jpg",
        size: 1,
        name: "",
        category: "",
        position: 0
    },
    {
        id: 3,
        image: "https://configurator.lanberg.pl/products/286/Z28655_118030.jpg",
        size: 1,
        name: "",
        category: "",
        position: 1
    },
    {
        id: 4,
        image: "https://configurator.lanberg.pl/products/332/Z33287_186036.jpg",
        size: 2,
        name: "",
        category: "",
        position: 0,

    },
];

/** 0 -  Load Lines fro listItems */
function LoadLines() {
    if (containerDropArea.length > 0) {
        for (let i = 0; i < TotalLines; i++) {
            let line = document.createElement("div");
            line.classList.add("line");
            containerDropArea[0].appendChild(line);
        }
        CreatelinesIds();
    }
}


/** 1 - create product elements / components */
function CreateComponentElementsForProduct() {
    if (containerComponents.length > 0) {
        const Box = containerComponents[0];

        // creating components
        for (let i = 0; i < ComponentsDataBase.length; i++) {
            const el = document.createElement("div");
            el.classList.add("box-component");
            el.setAttribute("id", "cp-" + ComponentsDataBase[i].id);
            el.setAttribute("size", "cp-" + ComponentsDataBase[i].size);
            el.setAttribute("position", "cp-" + ComponentsDataBase[i].position);

            let img = document.createElement("img");
            let text = document.createElement("h5");
            text.innerText = el.getAttribute("id");

            img.src = ComponentsDataBase[i].image;
            el.appendChild(img);
            el.appendChild(text);
            Box.appendChild(el);
        }

        const newel = document.createElement("div");
        newel.classList.add("box-component");
        newel.setAttribute("id", "cp-" + 76);
        newel.setAttribute("size", "cp-" + 1);

        Box.appendChild(newel);

    }
}

/** 2 - Drag and drop elements to product container area */
function DragAnDropProductComponents() {
    if (containerDropArea.length > 0) {
        const draggableElements = document.querySelectorAll('.components-list .box-component');
        for (let i = 0; i < draggableElements.length; i++) {
            const draggableElement = draggableElements[i];
            draggableElement.addEventListener("click", (e) => {
                InsertComponentToFrame(draggableElement.getAttribute("id"), true);
            });
        }
    }
}

/**  3 - Create ids for lines  */
function addFakeBox() {
    if (containerDropArea.length > 0) {
        const draggableElements = document.querySelectorAll('.components-list #cp-76');
        const draggableElement = draggableElements[0];
        draggableElement.addEventListener("click", (e) => {
            InsertComponentToFrame(draggableElement.getAttribute("id"), false);
        });
        draggableElement.click();
    }
    return 1;
}

/** 4 -  Create ids for lines  */
function CreatelinesIds() {
    let CurrentLines = containerDropArea[0].querySelectorAll(".line");
    for (let y = 0; y < CurrentLines.length; y++) {
        CurrentLines[y].setAttribute("id", "line-" + y);
        let textTags = CurrentLines[y].querySelectorAll("h3");
        for (let h3 = 0; h3 < textTags.length; h3++) {
            textTags[h3].remove();
        }
        let txt = document.createElement("h3");
        txt.innerText = y;
        CurrentLines[y].appendChild(txt);
    }
    console.log("lines id created...")
}

/**  5 -  Limpar caixas vazias apos mover a caixa para outro lugar ou mudar a posição entre dois elementos */
function FillEmptyBoxes(n) {
    let newLines = containerDropArea[0].querySelectorAll(".line");
    for (let i = 0; i < newLines.length; i++) {
        const newEl = newLines[i];
        if (newEl.querySelectorAll(".box-component").length === 0 && ((newEl.offsetHeight * 1 / n) === DefaultLineHeight)) {
            console.log(newEl, "founded");
            newEl.innerHTML = "";
            for (let k = 0; k < n; k++) {
                let line = document.createElement("div");
                line.classList.add("line");
                newEl.insertAdjacentElement("beforebegin", line);
            }
            newEl.remove();
        }
    }
    CreatelinesIds();
    console.log("Boxes filled succcesfulyy...")
}

/** 6 - clear all configurations setup   */
function clearAllInfo() {
    let newLines = containerDropArea[0].querySelectorAll(".line");
    for (let i = 0; i < newLines.length; i++) {
        let bs = newLines[i].querySelectorAll(".box-component");
        for (let a = 0; a < bs.length; a++) bs[a].remove();
    }
    for (let i = 1; i < 6; i++) FillEmptyBoxes(i + 1);
}


function CheckLength() {
    let n = containerDropArea[0].querySelectorAll(".line")
    let boxes = [];
    for (let i = 0; i < n.length; i++)   if (n[i].querySelectorAll(".box-component").length > 0) boxes.push(n[i]);

    console.log("################################## Available lines ##############################");
    console.log(boxes)
    console.log("#################################################################################");
    return boxes.length === 0;
}

/** 7 - Insert component to frame */
function InsertComponentToFrame(id, addstatus) {
    let Lines = containerDropArea[0].querySelectorAll(".line");
    let el = document.createElement("div")


    if (addstatus === true) el.classList.add("box-component");
    if (addstatus === false) el.classList.add("fake-box");


    const newId = "el-cp-" + Math.floor(Math.random() * 885898598584746) * 2980;
    el.setAttribute("id", newId);
    let removeBtn = document.createElement("button");
    let Switchbuttons = document.createElement("div");
    let Text = document.createElement("h1");
    let size = 0;

    for (let a = 0; a < ComponentsDataBase.length; a++) {
        if (ComponentsDataBase[a].id === (id.split("-")[1] * 1)) {
            size = (DefaultLineHeight * (ComponentsDataBase[a].size * 1));
        }
    }

    el.setAttribute("size", size);
    Text.innerText = id + " / " + size;
    el.style.minHeight = size + "px";
    el.style.height = size + "px";

    let smallTxt = document.createElement("small");
    smallTxt.innerText = newId;

    removeBtn.classList.add("remove")
    removeBtn.innerText = "x";

    const UpButton = document.createElement("button");
    UpButton.innerHTML = "🔼";
    const DownButton = document.createElement("button");
    DownButton.innerHTML = "🔽";

    UpButton.addEventListener("click", MoveCurrentComponentUp);
    DownButton.addEventListener("click", MoveCurrentComponentDown);

    Switchbuttons.classList.add("btns");
    Switchbuttons.appendChild(UpButton);
    Switchbuttons.appendChild(DownButton);
    let EmptyLines = [];


    removeBtn.addEventListener("click", () => {
        let remEl = document.getElementById(`${newId}`);
        // Está função permite limpar as linhas que já conem um ponent com tamanho padrão ou com o dobro ou triplo do tamanho
        function clearAll(n) {
            console.log("Clear = ", n);
            if (n !== 1) {
                let currentParent = remEl.parentNode;
                currentParent.innerHTML = "";
                for (let i = 0; i < n; i++) {
                    let line = document.createElement("div");
                    line.classList.add("line");
                    currentParent.insertAdjacentElement("beforebegin", line);
                }
                currentParent.remove();
            }
            remEl.remove();
            if (n !== null) {
                console.log("we will add some information....")
                CreatelinesIds();
            }
            console.log(id + " - removed from the line", remEl.getAttribute("size") * 1 / 3);
            FillEmptyBoxes(2);
        }

        if ((remEl.getAttribute("size") * 1) / 1 === 70) {
            clearAll(1);
        }

        if ((remEl.getAttribute("size") * 1) / 2 === 70) {
            clearAll(2);
        }

        if ((remEl.getAttribute("size") * 1) / 3 === 70) {
            clearAll(3);
        }

        if (remEl.getAttribute("size") * 1 / 4 === 70) {
            clearAll(4);
        }
    });


    if (addstatus === true) {
        Text.appendChild(document.createElement("br"));
        Text.appendChild(smallTxt);
        el.appendChild(Switchbuttons);
        el.appendChild(Text);
        el.appendChild(removeBtn);
        el.setAttribute("draggable", true);
    }



    /**** 1.1 -  Definir dados ao inciar drag and drop   ****/
    el.addEventListener("dragstart", function (e) {
        let boxes = containerDropArea[0].querySelectorAll(".box-component");
        for (let k = 0; k < boxes.length; k++) {
            if (boxes[k].getAttribute("size") * 1 > DefaultLineHeight) {
                if (addFakeBox() === 1) {
                    document.getElementById(id).classList.add("fake-box");
                    console.log("Add fake item !", id);
                }
            }
        }
        CheckemptyLines();
        console.log("Look...........", boxes.length);
        e.dataTransfer.setData('plain', e.target.id);
    });
    /*****  end *****/



    el.addEventListener("dragend", function () {
        console.log("Job done ....", addstatus);
    });


    function MoveCurrentComponentUp() {
        CreatelinesIds();
        CheckemptyLines();
        if (addstatus === true) {
            let currentParent = el.parentNode;
            let n = currentParent.getAttribute("id").split("-");
            let x = n[1] * 1 - 1;
            if (x > - 1) {
                let upLine = document.querySelector("#line-" + x);
                if (upLine.querySelectorAll(".box-component").length > 0) {
                  
                    newBoxToMoveEl = document.querySelector("#line-" + x + " .box-component");

                    let newBoxElSize = newBoxToMoveEl.getAttribute("size") * 1;
                    let NewtBoxParentEl = newBoxToMoveEl.parentNode;
                    let crBoxSize = NewtBoxParentEl.getAttribute("id").split("-")[1] * 1;
                    let Places = [crBoxSize, crBoxSize + 1];

                    console.log({ currentPlace: n[1], storeIndexes: Places, down: false });
                    console.log(newBoxElSize, el.getAttribute("size") * 1)

                    if (newBoxElSize > el.getAttribute("size") * 1) {
                        if (newBoxElSize === (DefaultLineHeight * 2)) { // 140  
                            console.log("Move up 1 ", true); 
                            CheckBoxesAndClosestBoxesHeigth(NewtBoxParentEl, el, true, { currentPlace: n[1], storeIndexes: Places, down: false, doubble: false });
                            CheckBoxesAndClosestBoxesHeigth(currentParent, newBoxToMoveEl, true, { currentPlace: n[1], storeIndexes: Places, down: false, doubble: false });
                        } else {
                            alert("Not 140");
                        }
                    } else if (newBoxElSize === el.getAttribute("size") * 1) {
                        console.log("Move up 2", true);
                        CheckBoxesAndClosestBoxesHeigth(currentParent, newBoxToMoveEl, true, null);
                        CheckBoxesAndClosestBoxesHeigth(upLine, el, true, null);

                    } else if (el.getAttribute("size") * 1 > newBoxElSize) {
                        console.log("Move up 3", true);
                        console.log({ currentPlace: n[1] * 1 + 1, storeIndexes: Places, down: false, doubble: true });
                        console.log("Current element = ", el);
                        console.log("Element to replace = ", newBoxToMoveEl)
                        CheckBoxesAndClosestBoxesHeigth(
                            currentParent,
                            newBoxToMoveEl, true, 
                            {currentPlace: n[1] * 1, storeIndexes: Places, down: false, doubble: true, elr: el,
                             Elements:{e1:el, e2: newBoxToMoveEl}
                          });
                    }
                } else {
                    console.log("Move up 4", true);
                    CheckBoxesAndClosestBoxesHeigth(upLine, el, true, null);
                }
            }
        }
        setTimeout(() => { CreatelinesIds(); }, 1000);

    }

    function MoveCurrentComponentDown() {
        CreatelinesIds();
        if (addstatus === true) {
            let currentParent = el.parentNode;
            let n = currentParent.getAttribute("id").split("-");
            let x = n[1] * 1 + 1;
            if (x > -1) {
                if (x !== 0 && x <= Lines.length - 1) {
                    let DownLine = document.querySelector("#line-" + x);
                    console.log(DownLine, x);
                    if (DownLine.querySelectorAll(".box-component").length > 0) {
                        console.log("Move down", true);
                        newBoxToMoveEl = document.querySelector("#line-" + x + " .box-component");

                        let newBoxElSize = newBoxToMoveEl.getAttribute("size") * 1;
                        let NewtBoxParentEl = newBoxToMoveEl.parentNode;
                        let crBoxSize = NewtBoxParentEl.getAttribute("id").split("-")[1] * 1;
                        let Places = [crBoxSize, crBoxSize + 1];

                        if (newBoxElSize > el.getAttribute("size") * 1) {
                            if (newBoxElSize === (DefaultLineHeight * 2)) { // 140  
                                console.log("Show off 1");
                                CheckBoxesAndClosestBoxesHeigth(
                                    currentParent, newBoxToMoveEl, true,
                                    {
                                        currentPlace: n[1],
                                        storeIndexes: Places,
                                        down: true,
                                        Elements: { e1: document.getElementById("line-" + n[1]).querySelector(".box-component"), e2: newBoxToMoveEl }
                                    });
                                //CheckBoxesAndClosestBoxesHeigth(DownLine, el, true, { currentPlace: n[1], storeIndexes: Places, down: true });
                            } else {
                                console.log("Show off 2");
                                alert("Not 140");
                            }
                        } else if (newBoxElSize === el.getAttribute("size") * 1) {
                            console.log("Move", 2);
                            CheckBoxesAndClosestBoxesHeigth(currentParent, newBoxToMoveEl, true, null);
                            CheckBoxesAndClosestBoxesHeigth(DownLine, el, true, null);
                        }else {
                            console.log("Show off 3")
                            CheckBoxesAndClosestBoxesHeigth(
                                currentParent, newBoxToMoveEl, true,
                                {
                                    currentPlace: n[1],
                                    storeIndexes: Places,
                                    down: true,
                                    Elements: { e1: document.getElementById("line-" + n[1]).querySelector(".box-component"), e2: newBoxToMoveEl }
                                }); 
                        }
                    } else {
                        console.clear();
                        console.log("Move down", true);
                        console.log("________________________________________________####");
                        console.log(DownLine);
                        console.log(el);

                        CheckBoxesAndClosestBoxesHeigth(DownLine, el, true, null);
                    }
                }
            }
        }
        setTimeout(() => { CreatelinesIds(); }, 1000);
    }

    function MoveItemWhenDrop(area, item) {
        console.log("Just in case sun ...");
        setTimeout(() => {
            const El = document.getElementById(item);
            if (area !== null) {
                CheckBoxesAndClosestBoxesHeigth(document.getElementById(area), El, true, null);
            } else {
                ShowAlert();
            }
        }, 500);
    }

    function ShowAlert() {
        console.log("We found some error on dragging  element !");
    }

    function CheckemptyLines() {
        EmptyLines = [];
        let p = containerDropArea[0].querySelectorAll(".line");
        for (let i = 0; i < p.length; i++) {
            if (p[i].querySelectorAll(".box-component").length <= 0) {
                EmptyLines.push({ n: i, status: true });
            }
        }
        if (EmptyLines.length === 0) return;
    }

    function CheckBoxesAndClosestBoxesHeigth(area, l, move, moveData) {
        let ele = l;
        let StoreEl = ele;
        let Sz = ele.getAttribute("size") * 1;
        let areaId = area.getAttribute("id").split("-")[1] * 1;
        FillEmptyBoxes(2);
        let StoredIndexes = [];
        let Status = CheckLength();


        console.log("1  ________________________________________###");
        console.log(area);
        console.log("2  ________________________________________###");
        console.log(l);
        console.log("3  ________________________________________###");
        console.log(moveData);
        console.log("###________________________________________###");







        if (moveData !== null) {
            if (moveData.storeIndexes.length === 2) {
                let lineToDrop = moveData.storeIndexes[0];
                let EleBox = null;

                for (let p = 0; p < moveData.storeIndexes.length; p++) {
                    let element = document.querySelectorAll(`#line-${moveData.storeIndexes[p]}`);

                    console.log("HERE YOU ARE SUN ...", element.length);
                    for (let j = 0; j < element.length; j++) {
                        console.log(element[j] , "|||||||||||");
                        if (element[j].querySelectorAll(".box-component").length > 0) {
                            if (element[j].offsetHeight * 1 / DefaultLineHeight === 2) {
                                if (moveData.elr !== null && moveData.elr !== undefined) {
                                    lineToDrop = moveData.currentPlace;
                                    document.querySelector("#line-" + moveData.currentPlace).querySelector(".box-component").remove();
                                    document.querySelector("#line-" + moveData.storeIndexes[0]).style.minHeight = (DefaultLineHeight * 2) + "px";
                                    document.querySelector("#line-" + moveData.storeIndexes[0]).style.height = (DefaultLineHeight * 2) + "px";
                                    document.querySelector("#line-" + moveData.storeIndexes[0]).appendChild(moveData.elr)
                                    FillEmptyBoxes(2);
                                    document.querySelector("#line-" + moveData.storeIndexes[1]).remove();
                                    CreatelinesIds();


                                    setTimeout(() => {
                                        document.querySelector("#line-" + lineToDrop).appendChild(l);
                                    }, 10);
                                    return true;


                                } else {
                                    EleBox = element[j].querySelectorAll(".box-component")[0];
                                    setTimeout(() => {
                                        if (element[j].querySelectorAll(".box-component").length > 0) {
                                            if (moveData.down === false) {
                                                StoredIndexes = [moveData.storeIndexes[1], moveData.currentPlace * 1 + 1];
                                                element[j].querySelectorAll(".box-component")[0].remove();
                                                FillEmptyBoxes(2);

                                                //append small element
                                                document.querySelector("#line-" + lineToDrop).appendChild(ele);

                                                // add large element 
                                                document.querySelector("#line-" + StoredIndexes[1]).remove();
                                                document.querySelector("#line-" + StoredIndexes[0]).style.minHeight = (DefaultLineHeight * 2) + "px";
                                                document.querySelector("#line-" + StoredIndexes[0]).style.height = (DefaultLineHeight * 2) + "px";
                                                document.querySelector("#line-" + StoredIndexes[0]).appendChild(EleBox);
                                            } else {
                                                if (moveData.Elements !== undefined && moveData.Elements !== null) {
                                                    if (moveData.Elements.e1.getAttribute("size") * 1 === DefaultLineHeight) {
                                                        StoredIndexes = [moveData.storeIndexes[0], moveData.storeIndexes[1]];

                                                        let e1_copy = moveData.Elements.e1;
                                                        let e2_copy = moveData.Elements.e2;


                                                        moveData.Elements.e1.parentNode.querySelector(".box-component").remove();
                                                        moveData.Elements.e2.parentNode.querySelector(".box-component").remove();
                                                        FillEmptyBoxes(2);

                                                        setTimeout(() => {  
                                                            document.querySelector("#line-" + moveData.currentPlace * 1).style.minHeight = (DefaultLineHeight * 2) + "px";
                                                            document.querySelector("#line-" + moveData.currentPlace * 1).style.height = (DefaultLineHeight * 2) + "px";
                                                            document.querySelector("#line-" + StoredIndexes[0]).appendChild(e1_copy);
                                                            document.querySelector("#line-" + moveData.currentPlace * 1).appendChild(e2_copy);
                                                            document.querySelector("#line-" + StoredIndexes[1]).remove(); 

                                                            console.log("1_____________ line - comp ________________")
                                                            console.log(document.querySelector("#line-" + StoredIndexes[0]));
                                                            console.log(e1_copy);

                                                            console.log("2_____________ line - comp ________________")
                                                            console.log(document.querySelector("#line-" + moveData.currentPlace * 1));
                                                            console.log(e2_copy);
                                                            CreatelinesIds(); 
                                                        }, 50); 
                                                    } else {
                                                        console.log("NO NO NO...");
                                                    }
                                                } else {
                                                    console.log("YOU DO NOT GOT MULTIPLE ELEMENTS");
                                                }
                                            }
                                        }
                                    }, 200);
                                }
                            }else if(element[j].offsetHeight * 1 / DefaultLineHeight === 1){
                                console.log("IT'S NOT MY MAN...");
                               
                                    if (moveData.Elements.e1.getAttribute("size") * 1 === DefaultLineHeight*2){
                                        if (moveData.down === true){
                                            StoredIndexes = [moveData.storeIndexes[0], moveData.storeIndexes[1]];
    
                                        let e1_copy = moveData.Elements.e1;
                                        let e2_copy = moveData.Elements.e2;
    
                                  
                                        moveData.Elements.e1.parentNode.querySelector(".box-component").remove();
                                        moveData.Elements.e2.parentNode.querySelector(".box-component").remove();
                                        FillEmptyBoxes(2);
                                     
    
                                        setTimeout(() => {  
                                            let text1 = document.createElement("h4");
                                            text1.innerText = "GRANDE";
    
                                            let text2 = document.createElement("h4");
                                            text2.innerText = "PEQUENO";
                                          
                                            document.querySelector("#line-" + StoredIndexes[0]).style.minHeight = (DefaultLineHeight * 2) + "px";
                                            document.querySelector("#line-" + StoredIndexes[0]).style.height = (DefaultLineHeight * 2) + "px";
                                            document.querySelector("#line-" + moveData.currentPlace * 1).appendChild(e2_copy);
                                            document.querySelector("#line-" + StoredIndexes[0]).appendChild(e1_copy);
                                            document.querySelector("#line-" + StoredIndexes[1]).remove(); 
                                         
    
                                            console.log("1_____________ line - comp ________________");
                                            console.log(document.querySelector("#line-" + StoredIndexes[0]));
                                            console.log(e1_copy, text1);
    
                                            console.log("2_____________ line - comp ________________");
                                            console.log(document.querySelector("#line-" + moveData.currentPlace * 1));
                                            console.log(e2_copy, text2);
    
                                            console.log("Lines_____________________________###");
                                            console.log(StoredIndexes);
    
    
                                           CreatelinesIds(); 
                                        }, 50); 
                                        } else {

                                              console.log("NICE JOB ........")
                                               console.log(moveData);

                                            
                                        }
                                    } else {
                                        console.log("GOOD ...");
                                        console.log(moveData);
                                    }  
                            }
                        }
                    }
                }
                return;
            }
        }


        if (Sz === DefaultLineHeight) {
            if (addstatus === false) { area.appendChild(ele) } else { area.appendChild(ele) };
            CreatelinesIds();
            return;
        }

        CheckemptyLines();
        function TryUnorderedSolution(comp, n) {
            const StoredIndexes = [];
            if (n === 2) {
                /// when moving from top to bottom
                for (let i = 0; i < EmptyLines.length; i++) {
                    if (i + 1 <= (EmptyLines.length - 1)) {
                        console.log("ok making test ###");
                        if (EmptyLines[i].status === EmptyLines[i + 1].status) {
                            console.log(("result  ||  n2 = " + (EmptyLines[i + 1].n) + " - " + "n1 = " + EmptyLines[i].n + " === " + (EmptyLines[i + 1].n - EmptyLines[i].n)));
                            if (StoredIndexes.length <= 1 && (EmptyLines[i + 1].n - EmptyLines[i].n) === 1) {
                                if (!StoredIndexes.includes(i + 1)) StoredIndexes.push(EmptyLines[i + 1].n);
                                if (!StoredIndexes.includes(i)) StoredIndexes.push(EmptyLines[i].n);
                            }
                        }
                    }
                }
                if (StoredIndexes.length > 0) {
                    if (move === true) console.log("Area to move = " + area);
                    let remEl = document.querySelector("#line-" + StoredIndexes[1])

                    console.log(remEl);
                    setTimeout(() => {
                        remEl.remove();
                        document.querySelector("#line-" + StoredIndexes[0]).style.minHeight = (DefaultLineHeight * 2) + "px";
                        document.querySelector("#line-" + StoredIndexes[0]).style.height = (DefaultLineHeight * 2) + "px";
                        document.querySelector("#line-" + StoredIndexes[0]).appendChild(comp);
                    }, 100);
                    setTimeout(() => {
                        CreatelinesIds();
                    }, 1000);

                } else {
                    ShowAlert();
                }
            } else if (n === 3) {

            }
        }

        // está função permite mover caixas com o dobro do tamanho ou mais ex: box-component size = 70px *2 = boxsize = 2 ... */
        if (Sz / DefaultLineHeight === 2) {
            if (move === false) {
                TryUnorderedSolution(ele, 2);
            } else {

                if (EmptyLines.length !== 0) {

                    CheckemptyLines();
                    // alert("Good....."); 
                    console.log("Show where we want to drop !", areaId);
                    let newLines = containerDropArea[0].querySelectorAll(".line");

                    console.log("Parent element information ...");
                    console.log(ele.parentNode);

                    // teste para o sentido positivo (de cima para baixo)
                    let x = areaId + 1;
                    if (x !== 0 && x <= newLines.length - 1) {
                        let DownLine = document.querySelector("#line-" + x);
                        if (DownLine.querySelectorAll(".box-component").length === 0) {

                            console.log("teste 1 ", x);
                            StoredIndexes.push(x);
                            StoredIndexes.push(areaId);

                            console.log("Current X = " + x, " Total = " + newLines.length);
                            console.log("zones to drop = ", StoredIndexes);
                        }
                    }

                    console.log(newLines.length, "#");
                    if (StoredIndexes.length === 0) {
                        if (x === newLines.length - 1) {
                            let DownLine = document.querySelector("#line-" + x);
                            console.log(newLines.length, x + " ****");
                            if (DownLine.querySelectorAll(".box-component").length === 0) {
                                console.log("teste 2 ", x);
                                StoredIndexes.push(x);
                                StoredIndexes.push(areaId);

                                console.log("Current X = " + x, " Total = " + newLines.length);
                                console.log("zones to drop = ", StoredIndexes);
                            }
                        }
                    }

                    /* Teste para o sentido negativo (de baixo para cima);  */

                    if (StoredIndexes.length === 0) {
                        x = areaId - 1;
                        if (x >= 0 && x <= newLines.length - 1) {
                            let DownLine = document.querySelector("#line-" + x);
                            if (DownLine.querySelectorAll(".box-component").length === 0) {

                                console.log("************ 1 *************");
                                console.log("X = " + x, " /  AreaId = " + areaId);

                                StoredIndexes.push(x);
                                StoredIndexes.push(areaId);

                                console.log("Current X = " + x, " Total = " + newLines.length);
                                console.log("Zones to drop = ", StoredIndexes);

                            }
                        }
                    }

                    if (StoredIndexes.length === 0) {
                        if (areaId * 1 === (newLines.length - 1)) {
                            ele.parentNode.innerHTML = "";
                            let DownLine = document.querySelector("#line-" + x);
                            console.log(DownLine)
                            if (DownLine.querySelectorAll(".box-component").length === 0) {
                                if (areaId * 1 + 1 <= newLines.length) {
                                    FillEmptyBoxes(2);
                                    StoredIndexes.push(areaId * 1 + 1);
                                    StoredIndexes.push(areaId);
                                    console.log("************ 2 *************");
                                    console.log(x, areaId);
                                    console.log(StoreEl);
                                    ele = StoreEl;
                                    console.log(StoredIndexes);
                                    return false;
                                }
                            }
                        }
                    }

                    if (StoredIndexes.length === 2) {
                        console.log(containerDropArea[0].querySelectorAll(".line"));
                        console.log(StoredIndexes);


                        let remEl = document.querySelector("#line-" + StoredIndexes[1]);
                        remEl.remove();
                        document.querySelector("#line-" + StoredIndexes[0]).style.minHeight = (DefaultLineHeight * 2) + "px";
                        document.querySelector("#line-" + StoredIndexes[0]).style.height = (DefaultLineHeight * 2) + "px";
                        document.querySelector("#line-" + StoredIndexes[0]).appendChild(ele);

                        setTimeout(() => {
                            setTimeout(() => {
                                FillEmptyBoxes(2);
                                Lines = containerDropArea[0].querySelectorAll(".line");
                                console.log("Count ...");
                            }, 150);
                            setTimeout(() => {
                                console.log("Updated", Lines.length);
                            }, 100);
                        }, 10);
                    }

                    if (StoredIndexes.length <= 1) {
                        console.log("x = " + x, "Line = " + newLines.length + " / area = " + areaId);
                        alert("empty bucket !");
                        ShowAlert();
                    }
                } else {

                    alert("No movement !");
                    console.log(EmptyLines);

                }
            }
        } else if (Sz / DefaultLineHeight === 3) {
            if (move === true) {
                alert("here we are ...");
            } else {

            }
        } else if (Sz / DefaultLineHeight === 4) {
        }
        // CheckemptyLines();
    }


    /*
        function RunLoop() {
            console.log("Current lines = ",Lines.length);
            */

    for (let i = 0; i < Lines.length; i++) {
        let txt = document.createElement("h3");
        txt.innerText = i;
        Lines[i].appendChild(txt);
        Lines[i].setAttribute("id", "line-" + i);

        if (Lines[i].querySelectorAll(".box-component").length === 0) {
            CheckBoxesAndClosestBoxesHeigth(Lines[i], el, false, null);
        } else {
            console.log("Line container " + i + " is not empty try other !");
        }

        Lines[i].addEventListener("dragenter", function (e) {
            e.preventDefault();
            console.log("Total empty lines = ", EmptyLines.length);
            console.log(EmptyLines);
        });

        Lines[i].addEventListener("dragover", function (e) {
            e.preventDefault();
            console.log("Total empty lines = ", EmptyLines.length);
            console.log(EmptyLines);
        });


        Lines[i].addEventListener("drop", function (e) {
            console.log(e.target);
            console.log("Start new dropping ...");

            e.preventDefault()
            const draggedElementId = e.target.id;
            const draggedElementClass = Object.values(e.target.classList);
            let DropItem = e.dataTransfer.getData("plain");

            if (draggedElementClass.length <= 0) {
                console.log("Not available choose another spot...", 1);
            } else {
                if (draggedElementId !== undefined && draggedElementClass[0] === "line") {
                    console.log("we are about to drop the itemm ####");


                    MoveItemWhenDrop(draggedElementId, DropItem);

                    console.log("Lines got updated !");
                    setTimeout(() => {
                        Lines = containerDropArea[0].querySelectorAll(".line");
                        console.log(Lines);
                        console.log("Total lines = ", Lines.length);
                    }, 2000);

                } else {
                    console.log("Not available choose another spot...", 2);
                }
            }



        });


    }
    /* }
     RunLoop()*/
}


/** 8 - Load functions  */
document.addEventListener('DOMContentLoaded', () => {
    LoadLines();
    CreateComponentElementsForProduct();
    DragAnDropProductComponents();
});



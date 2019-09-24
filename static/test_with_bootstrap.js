
 console.log('Yo Javascript working bootstrap!!!!!!!!!')
// console.log('Not again')
// function myFunction() {
//   var table = document.getElementById("myTable");
//   var row = table.insertRow(-1);
//   var cell1 = row.insertCell(0);
//   var cell2 = row.insertCell(1);
//   var cell3 = row.insertCell(2)
//   cell1.innerHTML = "  ";
// //  cell2.innerHTML = " ";
// //  cell3.innerHTML = " "
//     console.log('Adding row')
// }

// function addRow(){
// console.log('in add Row !')
// //var table = document.getElementById("myTable");
// //table.appendChild( '  <tr> <td contenteditable="true" >Centro comercial Moctezuma</td><td contenteditable="true" >Francisco Chang</td><td contenteditable="true" >Mexico</td></tr>' );
// $('#myTable').append( 
//   `<tr> 
//     <td contenteditable="true" >Dummy</td>
//     <td contenteditable="true" ></td>
//     <td contenteditable="true" ></td>
//   </tr>`);

// }

function round(number){

  var result = Math.round(number * (100)) / (100)
  return result
}

function addRowVanilla(btn) {
  
  console.log('Adding Row using vanilla js')
  console.log(btn.parentNode.parentNode.parentNode)
  masterList = btn.parentNode.parentNode.parentNode.parentNode.querySelector('#tableBody')
  // let masterList = document.getElementById('tableBody')
  // console.log(masterList)
  let row = document.createElement('tr');
  let html = `<tr> 
    <td contenteditable="true" >-</td>
    <td contenteditable="true"  class = "amountInfluencer" >-</td>
    <td contenteditable="true"  class = "amountInfluencer">-</td>
    <td  class="itemAmount">0</td>
    <td contenteditable="true" ></td>
    <td> <i class="far fa-trash-alt" onclick="deleteRow(this)"></i></td>
  </tr>`
  row.innerHTML = html;
  masterList.appendChild(row);
}


function deleteRow(btn){
  console.log('Deleting Row')
  let row = btn.parentNode.parentNode;
  let parentNode = row.parentNode.parentNode;
  row.parentNode.removeChild(row);

  parentNode.querySelector(".categoryAmount").innerText = totalTableAmount(parentNode)

  updateTotalAmount()
}


function exportData() {

  dtData = {}
  

  console.log('Exporting Data')


  let categories = document.getElementsByClassName('category')
  var garment_description = document.getElementById('garment').innerText
  var total_garment_cost = document.getElementById('total_cost').innerText
  var buyer = document.getElementById('buyer').innerText

  for ( category of categories) {
     
    categoryName = category.querySelector('.categoryName').innerText
    console.log
    if (categoryName=="description"||categoryName=="Total cost")
    { 
      continue;
    }
    categoryAmount = category.querySelector('.categoryAmount').innerText

    dtData[categoryName] = {}
    dtData[categoryName]['total_cost'] = categoryAmount



    dtData[categoryName]['items'] = extractTableData(category)

  }
  dtData["description"]=garment_description
  dtData["buyer"]=buyer
  dtData["Total cost"]=total_garment_cost
  quotation = {dtData}
  console.log(quotation)

  // axios.post('/improved', quotation)
  // .then(function (response) {
  //   console.log(response);
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });

  fetch('/improved', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(quotation), // body data type must match "Content-Type" header
})
.then(response => {window.location ="/"; console.log('Data Sent')}); // parses JSON response into native JavaScript objects 
    
}

function extractTableData(node){
  items = []
  theaders = node.querySelectorAll('thead th')
  headers = []
  theaders.forEach( (header) => {
    if (header.innerText.length > 0 ){
      headers.push(header.innerText)
    } 
  })

  console.log(headers)

  trows = node.querySelectorAll('tbody tr')

  trows.forEach((trow)=>{
    tdArray = trow.children

    item = {}
    for ( let i =0 ; i < headers.length ; ++i) {
      item[headers[i]] = tdArray[i].innerText
    }

    items.push(item)
  });

  console.log(items)
  return items 

  
}


// document.getElementById('average').addEventListener("input",function(e){

//   e.target.parentNode.cells[3].innerText = parseFloat(e.target.innerText)*2
//   console.log(e)
// });


// let tdCells = document.getElementsByClassName('amountInfluencer')


// for(let i = 0 ; i<tdCells.length; ++i){
//   tdCells[i].addEventListener("input",function(e){

//     tableRow = e.target.parentNode
//     result =  parseFloat(tableRow.cells[1].innerText) * parseFloat(tableRow.cells[2].innerText)

//     if(isNaN(result)) {
//       tableRow.cells[3].innerText = 0 
//     } else {
//       tableRow.cells[3].innerText = result
//     }
//   });
// }


let tables = document.querySelectorAll('.amountTable')
console.log('Tables list',document.querySelectorAll('.amountTable'))

for(let i=0;i<tables.length;++i){
    console.log('Attatching listeners')
  tables[i].addEventListener('input',function(e){

     console.log(e)
    if( e.target && (e.target.className == 'amountInfluencer')) {
      console.log("its here")
      tableRow = e.target.parentNode
      result =  round(parseFloat(tableRow.cells[1].innerText) * parseFloat(tableRow.cells[2].innerText))
  
      if(isNaN(result)) {
        tableRow.cells[3].innerText = 0 
      } else {
        tableRow.cells[3].innerText = result
      }

      let parentTable = e.target.parentNode.parentNode.parentNode
      console.log(parentTable.querySelector(".categoryAmount").innerText)
      console.log(parentTable.querySelectorAll('.itemAmount'))

      parentTable.querySelector(".categoryAmount").innerText = totalTableAmount(parentTable)
      
      updateTotalAmount()

    }

    
  
  });

}

function updateTotalAmount(){
  categoryAmounts = document.querySelectorAll("table .categoryAmount");

  totalAmount = 0
  categoryAmounts.forEach((amount)=>{
    totalAmount += round(parseFloat(amount.innerText))
  })

  document.getElementById('totalProductAmount').innerText = totalAmount
  console.log("TOTAL PRODUCT AMOUNT",totalAmount)
}


function totalTableAmount(table){
  let amounts = table.querySelectorAll('.itemAmount');
  total = 0;
  for(let i=0; i<amounts.length;++i) {
    total += round( parseFloat(amounts[i].innerText))
  }

  return total;
}

// document.querySelectorAll('[contenteditable="true"]').forEach(function(element){

//   element.addEventListener('focus',function(e){

//     console.log('Element Focused',e)
//     selectElementContents(e.target)
    
//   })

// });

let currentElement=null;

let allTables = document.querySelectorAll('table');
for(let i = 0; i<allTables.length;++i) {
  console.log('Attaching listners to table')
    allTables[i].addEventListener('click',function(e){
      console.log('From all table listner',e);
      if(e.target && e.target.contentEditable == "true" && (e.target != currentElement)){
        console.log('Element Focused',e.target)
        currentElement=e.target
        selectElementContents(e.target)
      }
    });
}



function selectElementContents(el) {
  var range = document.createRange();
  range.selectNodeContents(el);
  var sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

document.querySelectorAll("[contenteditable='true']").forEach((element)=>{

  element.addEventListener('focus',(e)=>{
    console.log('Element Clicked');
    e.target.click();
  });
});

// var el = document.getElementById("foo");
// selectElementContents(el);



// 
// tdCells.forEach(function(cell){
//   cell.addEventListener("input",function(e){

//     tableRow = e.target.parentNode
//     result =  parseFloat(tableRow[1].innerText) * parseFloat(tableRow[2].innerText)

//     if(isNaN(result)) {
//       tableRow[3].innerText = 0 
//     } else {
//       tableRow[3].innerText = result
//     }
//   });
// });
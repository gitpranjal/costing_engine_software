

// console.log('Yo Javascript working !!!!!!!!!')
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
function GenerateTable() {
        //Build an array containing Customer records.
        let table= document.createElement('table')
        let html =`<table>
			<thead>
				<tr>
					<th>name</th>
					<th>avg</th>
					<th>rate</th>
					<th>amount</th>
				</tr>
			</thead>
			<tbody id="tableBody">
				<tr>
					<td contenteditable="true" >-</td>
					<td contenteditable="true" >-</td>
					<td contenteditable="true" >-</td>
					<td contenteditable="true" >-</td>
					<td><input type="button" value="Delete" onclick="deleteRow(this)"/></td>
				</tr>

			</tbody>	
		</table>
        <button type="button"  onclick="GenerateTable()" >Generate Table</button>`
        table.innerHTML=html;
        var categories = document.getElementById("category");
        categories.appendChild(table);
    }

function addRowVanilla(btn) {
  
  console.log('Adding Row using vanilla js')
  masterList = btn.parentNode.querySelector('#tableBody')
  // let masterList = document.getElementById('tableBody')
  // console.log(masterList)
  let row = document.createElement('tr');
  let html = `<tr> 
    <td contenteditable="true" >Dummy</td>
    <td contenteditable="true" ></td>
    <td contenteditable="true" ></td>
    
    <td><input type="button" value="Delete" onclick="deleteRow(this)"/></td>
  </tr>`
  row.innerHTML = html;
  masterList.appendChild(row);
}


function deleteRow(btn){
  console.log('Deleting Row')
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

function addRowVanilla(btn) {
  
  console.log('Adding Row using vanilla js')
  masterList = btn.parentNode.querySelector('#tableBody')
  // let masterList = document.getElementById('tableBody')
  // console.log(masterList)
  let row = document.createElement('tr');
  let html = `<tr> 
    <td contenteditable="true" >Dummy</td>
    <td contenteditable="true" ></td>
    <td contenteditable="true" ></td>
    
    <td><input type="button" value="Delete" onclick="deleteRow(this)"/></td>
  </tr>`
  row.innerHTML = html;
  masterList.appendChild(row);
}


function deleteRow(btn){
  console.log('Deleting Row')
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}


function exportData() {

  dtData = {}
  

  console.log('Exporting Data')


  let categories = document.getElementsByClassName('category')
  var garment_description = document.getElementById('garment').innerText
  var total_garment_cost = document.getElementById('total_cost').innerText

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
.then(response => {window.location ="/";console.log('Data Sent')}); // parses JSON response into native JavaScript objects 
    
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
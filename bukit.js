var inquirer = require("inquirer")
var mysql = require("mysql")

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "testpass",
    database: "bukit_db"
  });

connection.connect(function(err) {
    if (err) throw err;
    displayBukit();
})

function displayBukit() {
    connection.query("SELECT * FROM products" , function(err , res) {
        if (err) throw err;
        var resArray = resultDisplay(res)
        resArray.forEach(function(element) {
            console.log(element)  
        })
        runBukit();
    })
}

function resultDisplay(result) {
    var resultArray = []
    for (var i in result) {
       var productObj = {
           productID: result[i].id,
           productName: result[i].product_name,
           deptName: result[i].department_name,
           productPrice: result[i].price,
           stockQty: result[i].stock_quantity
       }
       resultArray.push(productObj)
    }
    return resultArray
} 

function runBukit() {
    inquirer.prompt([
        {
            type: "input",
            name: "itemID",
            message: "WELCOME TO BUKITJS! ENTER THE ITEM ID YOU WOULD LIKE TO PURCHASE",
        }
    ]).then(function(answers){
        var itemInt = parseInt(answers.itemID)
        var intBool = intChecker(itemInt);
        if (intBool) {
            console.log(`LOADING ITEM ${itemInt}`)
            qtyReturn(itemInt , shopBukit)
        } else {
            console.log(`${answers.itemID} IS NOT A VALID BUKIT PRODUCT`)
            runBukit();
        }
    })
}

function intChecker(ID) {
    return Number.isInteger(ID);
}

function shopBukit(obj) {
    inquirer.prompt([
        {
            type: "input",
            name: "qtyBuy",
            message: "How many would you like to purchase?"
        }
    ]).then(function(answer) {
        var qtySold = parseInt(answer.qtyBuy)
        var copyChecked = copyChecker(qtySold)
        var newQty = (obj.stockQty - qtySold)
        var saleTotal = (obj.productPrice * qtySold)
        if (qtySold > obj.stockQty) {
            console.log(`${qtySold} ${copyChecked} OF ${obj.productName} NOT AVAILABLE`)
            runBukit();
        } else {
            console.log(`SOLD ${qtySold} ${copyChecked} OF ${obj.productName} FOR ${saleTotal}! UPDATING INVENTORY! NEW QTY ${newQty}`)
            connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: newQty
              },
              {
                id: obj.productID
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("INVENTORY SUCCESSFULLY UPDATED");
              runBukit();
            }
          );
        }
    })
}

function copyChecker(QTY) {
    if (QTY === 1) {
        return "COPY"
    } else {
        return "COPIES"
    }
}

function quickQuery(ID) {
    connection.query(`SELECT * FROM products WHERE id = ${ID}` , function(err , res) {
        if (err) throw err;
        var productObj = {
            productID: res[0].id,
            productName: res[0].product_name,
            deptName: res[0].department_name,
            productPrice: res[0].price,
            stockQty: res[0].stock_quantity
        }
        console.log(`
        ID: ${productObj.productID}
        NAME: ${productObj.productName}
        CATEGORY: ${productObj.deptName}
        PRICE: ${productObj.productPrice}
        IN STOCK: ${productObj.stockQty}
        `)
    })
}

function qtyReturn(ID , nextFunc) {
    connection.query(`SELECT * FROM products WHERE id = ${ID}` , function(err , res) {
        if (err) throw err;
        var productObj = {
            productID: res[0].id,
            productName: res[0].product_name,
            deptName: res[0].department_name,
            productPrice: res[0].price,
            stockQty: res[0].stock_quantity
        }
        console.log(`IN STOCK: ${productObj.stockQty}`)
        if (productObj.stockQty === 0) {
            console.log(`NONE IN STOCK. PLEASE CHECK BACK LATER`)
            runBukit();
        } else {
            nextFunc(productObj);
        }
    })
}
let outPutData = [];

function getData() {
    $.ajax({
        url: "http://localhost:5000/employe",
        type: "GET",
        contentType: "application/json",
        success: function(data) {
            outPutData = data;
            console.log(outPutData);
            let tableData = "";
            let count = 0;
            outPutData.map(emp => {
                count++;
                tableData += `
                    <tr>
                        <th scope="row">${count}</th>
                        <td>${emp.Name}</td>
                        <td>${emp.Email}</td>
                        <td>${emp.Designation}</td>
                        <td><button class="btn btn-primary" onclick="updateRecord('${emp.id.toString()}')">Update</button></td>
                        <td><button class="btn btn-danger" onclick="deleteRecord('${emp.id.toString()}')">Delete</button></td>
                    </tr>`;
            });
            document.getElementById("table-body").innerHTML = tableData;
        },
        error: function (error) {
            console.error('Error:', error);
        }
    });
}






function add() {
    let name = $("#name").val();
    let email = $("#email").val();
    let desg = $("#designation").val();


    
    const postData = {
        Name: name,
        Email: email,
        Designation: desg,
    };

    $.ajax({
        url: "http://localhost:5000/employe",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(postData),
        success: function (response) {
            console.log("response", response);
            
        },
        error: function(error) {
            console.log('Error:', error);
        }
    });
}




function deleteRecord(id) {
    const url = `http://localhost:5000/employe/${id}`;

    $.ajax({
        url: url,
        type: 'DELETE',
        success: function(response) {
            console.log("response", response);
        },
        error: function(error) {
            console.error('Error:', error);
        }
    });
}



function updateRecord(id){

    let url = `http://localhost:5000/employe/${id}`;
    let update = outPutData.find(value => value.id === id)

    console.log(update)
    $("#ubtn").css("display", "block");

    $("#name").val(update.Name);
    $("#email").val(update.Email);
    $("#designation").val(update.Designation);

    let updateBut = $("#ubtn");

    updateBut.on("click", function(event) {
        let name = $("#name").val();
        let email = $("#email").val();
        let desg = $("#designation").val();

        const updateData = {
            Name: name,
            Email: email,
            Designation: desg,
        };

        $.ajax({
            url: url,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updateData), // Convert data to JSON string
            success: function(response) {
                console.log("response", response);
            },
            error: function(error) {
                console.error('Error:', error);
            }
        });
    });
}



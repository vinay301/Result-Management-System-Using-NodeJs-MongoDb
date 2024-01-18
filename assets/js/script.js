$("#addStudent").submit(function(event){
    alert("Student Inserted Successfully!");
})

//Update Student Information
$("#updateStudent").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
         data[n['name']] = n['value']
     })
   
    console.log(data);
     var request = {
        "url" : `http://localhost:3000/api/students/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Student Updated Successfully!");
    })

})


//Delete a particular student
if(window.location.pathname == "/teacher"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/students/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}

//Search Result
$("#searchStudent").submit(ev=>{
   
    ev.preventDefault();
    var unindexed_array = $("#searchStudent").serializeArray();

    var data = {}
    
    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })
   
    var request = {
        "url" : `http://localhost:3000/api/students/searchResult?rollNo=${data.rollNo}&studentName=${data.studentName}`,
        "method" : "GET",
        "success":(response)=>{
            alert("Got the Result");
            window.location.href=`/result?id=${response._id}`;
        },
        "error": (xhr, status, error)=>{
             msg=JSON.parse(xhr.responseText);
            alert(msg.message);
        }
    }
    $.ajax(request);
})

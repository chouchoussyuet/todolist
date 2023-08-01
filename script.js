const tasklist = document.getElementById("taskList");
let editor; // Biến lưu trình soạn thảo CKEditor

// Khởi tạo CKEditor 
ClassicEditor
  .create(document.getElementById('input'))
  .then(ckeditor=>{
    editor = ckeditor;
  })
  .catch(error=>{
    console.error(error);
  });

    function addTask() {
      if ( editor ) {
        const taskContent = editor.getData(); // Lấy nội dung từ CKEditor'

        if ( !taskContent.trim() ) {
          alert("You must write something");
          return;
        }

            // thêm 
            let li = document.createElement('div'); 
            li.classList.add('list');
            li.innerHTML = taskContent; 
            li.setAttribute('draggable', 'true'); // Thêm thuộc tính draggable="true" vào các phần tử li
            tasklist.appendChild(li);
            updateTaskCount();

            // xóa 
            let deleteButton = document.createElement('span');
            deleteButton.innerHTML = "\uD83D\uDDD1";
            li.insertBefore(deleteButton, li.firstChild);
            deleteButton.classList.add("deleteButton");
          
        
        editor.setData("");
        saveData();
      }
  }


  // HÀM CÁC SỰ KIỆN 
  tasklist.addEventListener("click", function(event) {

      if ( event.target.classList.contains('list')) {
          event.target.classList.toggle("completed");
          updateCompletedTaskCount();
          saveData();
      } 

      else if ( event.target.classList.contains('deleteButton')) {
          event.target.parentElement.remove(); 
          updateTaskCount();
          updateCompletedTaskCount();
          saveData();
      }

  }) 

  new Sortable(tasklist, {
  animation: 150,
  onUpdate: function (event) {
    // Tự xử lý khi có sự thay đổi vị trí các phần tử
    saveData();
  },
});


  function clearAll() {
      var taskList = document.getElementById("taskList");
      taskList.innerHTML = ""; // Xóa nội dung của taskList
      updateTaskCount();
      updateCompletedTaskCount();
  }

  function updateTaskCount() {
      var taskCountElement = document.getElementById('taskCount');
      var taskCount = tasklist.children.length;
      taskCountElement.textContent = taskCount;
      saveData();
  }

  function updateCompletedTaskCount() {
      var completedTaskCountElement = document.getElementById('completedTaskCount');
      var completedTaskList = document.getElementsByClassName('completed');
      var completedTaskCount = completedTaskList.length;
      completedTaskCountElement.textContent = completedTaskCount;
      saveData();
  }

    
     function saveData() {
      var data = {
        count1 : document.getElementById("taskCount").textContent,
        count2 : document.getElementById("completedTaskCount").textContent,
        task : tasklist.innerHTML
      };

      localStorage.setItem("data", JSON.stringify(data));
    }

    
    function showTask() {
        var gdata = JSON.parse( localStorage.getItem("data") );

        if ( gdata ) {
          tasklist.innerHTML = gdata.task;
          updateTaskCount();
          updateCompletedTaskCount();
        }
      }


    showTask();

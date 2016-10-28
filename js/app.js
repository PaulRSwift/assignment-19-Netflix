

var forEach = function(arr, cb){
   for(var i = 0 ; i < arr.length; i+=1){
      cb(arr[i], i, arr)
   }
}

var router = function(){
   var selectedUser = window.location.hash.slice(1)
   // console.log(selectedUser);


   if(selectedUser.length === 0){
      showHomePage()
      return
   }

   console.log( selectedUser )
   showUserShowsPage(selectedUser)
}

var showHomePage = function(){
   var bigStr = '<div class="row container-fluid users-container">'
       bigStr += "<h1>Who's watching?</h1>"
       for(var propp in userList ){

          console.log()
          bigStr += '<div class="col-xs-6 col-sm-3">'
          bigStr +=     '<a href="#'+propp+'">'
          bigStr +=        '<img src="https://flathash.com/' + propp +'" alt="">'
          bigStr +=        '<h3>'+ userList[propp].username +'</h3>'
          bigStr +=     '</a>'
          bigStr += '</div>'
       }

       bigStr +='</div>'
       appContainer.innerHTML = bigStr
}

var showUserShowsPage = function(usr){
   var userObj = userList[usr]

   var bigHTMLStr = '<h2>All <span class="bg-primary"> '+ userObj.username + '\'s </span> Shows </h2>'
       bigHTMLStr = '<div class="row shows-list"> </div>'

       appContainer.innerHTML = bigHTMLStr

       var showUserEl = document.querySelector('.shows-list')

          userStr = '<h2> <span class="userNameBack">' + userObj.username + '\'s</span> List </h2>'

          showUserEl.innerHTML = userStr

   forEach(userObj.showIds, function(elementIdNum){
      // console.log(elementIdNum)

      $.getJSON("http://api.tvmaze.com/shows/" + elementIdNum ).then(function(dataResponse){
         console.log(dataResponse);


            var showsListContainerEl = document.querySelector('.shows-list')


                showStr = '<div class="col-sm-3 thumbsize">'
                showStr +=    "<img src='" + dataResponse.image.medium  + "'>"
                showStr +=    "<h4>" + dataResponse.name  + "</h4>"
                showStr += '</div>'

               showsListContainerEl.innerHTML += showStr

      })

   })

}



var userList = {
   matt: {username: "Matt", showIds: [170,169,175,318,76,270, 255]},
   ed: {username: "Ed", showIds: [5853,431,80,279,570,76,73,20540,83,17119]},
   michelle: {username: "Michelle", showIds: [83,576,735,73,749,170,112,80]},
   justin: {username: "Justin", showIds: [551,169,490,530,73,302, 547, 532]},
}

var appContainer = document.querySelector('#app-container')




window.addEventListener('hashchange', router )
router()

var users=["a","b","c","d","e","f","g","h"];

var async_request=[];
var responses=[];
for(i in users)
{
    // you can push  any aysnc method handler
    async_request.push($.ajax({
        url:'', // your url
        method:'post', // method GET or POST
        data:{user_name: users[i]},
        success: function(data){
            console.log('success of ajax response')
            responses.push(data);
        }
    }));
}


$.when.apply(null, async_request).done( function(){
    // all done
    console.log('all request completed')
    console.log(responses);
});
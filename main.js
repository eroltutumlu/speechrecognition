$(document).ready( function(){

    var ref = new Firebase("https://annyang.firebaseio.com/");
    var messagesRef = ref.child("messages");
    
    var loadMessagesOnServer = function(messagesRef){
        
        messagesRef.on("child_added", function(snap) {
            
              snap.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();                  
                  $("ul").append('<li class="list-group-item list-group-item-danger">' + childData + '</li><br>');
              });
                 
        });
        
    };
    
    loadMessagesOnServer(messagesRef);
    
     //its okay for speech recog.
    if(annyang){
         //define a command
        var commands = {
               'hello *tag' : function(message){
                 messagesRef.push({
                        msg: message

                 });
            },
            
            'Who am I' : function(){
                $("#pWhoAmI").html('<h4><em>'+ 
                                   "A human is an animal (genus) that is rational (species). <br>" +
                                   "Humans are rational animals. <br>" +
                                   "A human is an animal that laughs. <br>" +
                                   "Humans belong to the small group of self-aware social mammals that includes chimps and dolphins. " +
                                   '</em></h4>');
            }
        }
    };
    
     //add commands to annyang
    annyang.addCommands(commands);
     //Start listening
    annyang.start();
        
});
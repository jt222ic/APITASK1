"use strict";


var Googlemail = 
{
     loadGmailApi:function() {
        gapi.client.load('gmail', 'v1', Googlemail.getLabels);
      },
       getLabels:function(label)
      {
          var request = gapi.client.gmail.users.labels.list({
          'userId': 'me',
          
            // labels to count the objects in the category
          });
          
          request.execute(function(resp){
              if(resp.labels.length > 0)
              {
                  for (var i = 0; i < resp.labels.length; i++)
                  {
                      if(resp.labels[i].name.indexOf("Location/") > -1)
                      {
                         Googlemail.GetMailFromLabel(resp.labels[i]);
                      }
                  }
              }
        });
      },
      
      GetMailFromLabel:function(label)
      {     
    var request = gapi.client.gmail.users.messages.list(
        {
    'userId': 'me', 
    'labelIds': label.id});
    request.execute(function(resp) {
        
        if(resp.messages != null)   // to check if the location map is not empty, because if it is empty, the resp.message.length wont work it out, and it will blame on property length, for people trying to make message work
        {
        for (var i = 0; i < resp.messages.length; i++) {
          var message = resp.messages[i];
          var request = gapi.client.gmail.users.messages.get({ //get message from messageid
            'userId': 'me',
            'id': message.id
            });
        }
            request.execute(function(respond) {

                var message = respond.payload.parts[0].body.data;
                
                if (message == undefined) {
                    message = respond.payload.parts[0].parts[1].body.data;               // read element data from the PUT-request message content
                }
                //atob to decode the text, got that info from a friend that have worked with api before me
                message = window.atob(message.replace(/-/g, '+').replace(/_/g, '/'));
                var labelname = label.name;
                var item = {
                    subject: respond.payload.headers[16].value,         // split up on snippet header 
                    snippet: respond.snippet,
                    message: message,
                };
                googleMaps.CreateGeolocation(label,item); 
                

            });


        }


    });
    }
    }
    






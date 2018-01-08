/**
 * Notifications Library
 * @param  Env window 
 * @return object
 */
(function(window){

    'use strict';
    
    function define_library(){
        var Notifications = {};
        var name = "notifications";

        Notifications.show = function(options){

        //status: info, success, error, warning
        toastr[ options.status ]( options.message || '', options.title || '', { timeout : options.timeout || 5000 } ); 
        //toastr.info( options.message || '' , );

        //toastr.warning('My name is Inigo Montoya. You killed my father, prepare to die!')
        // Display a success toast, with a title
        //toastr.success('Have fun storming the castle!', 'Miracle Max Says');
        // Display an error toast, with a title
        //toastr.error('I do not think that word means what you think it means.', 'Inconceivable!');
        // Immediately remove current toasts without using animation
        //toastr.remove();
        // Remove current toasts using animation
        //toastr.clear();
        // Override global options
        //toastr.success('We do have the Kapua suite available.', 'Turtle Bay Resort', {timeOut: 5000});

       //    UIkit.notify({
	      //   	message: options.message ? options.message : '',
	      //   	status: options.status ? options.status : 'info', //info, success, warning, danger
	      //   	timeout: options.timeout ? options.timeout : 5000,
	      //   	group:  null,
	      //   	pos:  options.pos ? options.pos : 'top-right',

	      //   	onClose: function(){
	      //   		if( options.callback ){
	      //   			options.callback();
	      //   		}
	      //   		clearTimeout(thisNotify.timeout);
	      //   	}
    			// });
        }

        return Notifications;
    }
    //define globally if it doesn't already exist
    if( typeof(Notifications) === 'undefined'){
        window.Notifications = define_library();
    }
    else{
        console.log("Library already defined.");
    }
})(window);


//Usage
// Notifications.show({
//   'message': 'Sample Message 2',
//   'callback' : function(){ alert('this is a function callback');}
// });
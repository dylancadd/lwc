import { LightningElement, track } from 'lwc';
import getContactListCulversForDelete from '@salesforce/apex/ContactController.getContactListCulversForDelete';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DisplaySocial extends LightningElement {
    @track contacts;
    @track ssn = 'xxx-xx-xxx';

    @track clickedButtonLabel = 'Show';  
    @track boolVisible = false; 

    handleClick(event) {


        // this.template.querySelector('lightning-formatted-text').classList.remove('masked');

        console.log(event.target.value);


        var node = this.template.querySelector('[title="' + event.target.value + '"]');

        if(node.classList.contains("masked")) {
            node.classList.remove('masked');
        } else {
            node.classList.add('masked');
        }


        
    }

    // call apex method on button click 
    connectedCallback() {
        this.callApexClass()


      
    }

    callApexClass() {

        getContactListCulversForDelete({}).then(result => {
            // set @track contacts variable with return contact list from server  
            this.contacts = result;
        })
        .catch(error => {
            // display server exception in toast msg 
            const event = new ShowToastEvent({
                title: 'Error',
                variant: 'error',
                message: error.body.message,
            });
            this.dispatchEvent(event);
            // reset contacts var with null   
            this.contacts = null;
        });
    }
}
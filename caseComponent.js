import { LightningElement, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CaseComponent extends LightningElement {
    @api recordId;

    handleSuccess(event) {
        const savedRecordId = event.detail.id;
        console.log('Record saved with ID:', savedRecordId);

        const toastEvent = new ShowToastEvent({
            title: 'Success',
            message: 'Query Raised Successfully!',
            variant: 'success',
        });
        this.dispatchEvent(toastEvent);

        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
    }
    handleReset(){
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
    }
}
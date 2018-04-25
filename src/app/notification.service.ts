import {Injectable} from '@angular/core';

import {ToastyService} from 'ng2-toasty';

@Injectable()
export class NotificationService {
    constructor(private toast: ToastyService) {}

    public notify(msg){
        if (typeof msg == 'object' && msg.hasOwnProperty('status')) {
            switch (msg.status) {
                case "error": {
                    this.notifyError(msg.message);
                    break;
                }
                case "success": {
                    this.notifySuccess(msg.message);
                    break;
                }
                case "wait": {
                    this.notifyWait(msg.message);
                    break;
                }
                case "warning": {
                    this.notifyWarning(msg.message);
                    break;
                }
                default: {
                    this.notfyInfo(msg.message);
                    break;
                }
            }
        }
    }
	
    public notifySuccess(msg = "Operiation successful.", title = "Success"){
        this.toast.success(this.notifyMessage(this.prepareMessage(msg), title));
    }
    public notifyError(msg = "Operiation failed.", title = "Error"){
        this.toast.error(this.notifyMessage(this.prepareMessage(msg), title));
    }
    
    public notfyInfo(msg, title = "Info"){
        this.toast.info(this.notifyMessage(this.prepareMessage(msg), title));
    }
    
    public notifyWait(msg = "Wait!, operation being processing..", title = "Processing.."){
        this.toast.wait(this.notifyMessage(this.prepareMessage(msg), title));
    }
    
    public notifyWarning(msg, title = "Warning!"){
        this.toast.warning(this.notifyMessage(this.prepareMessage(msg), title));
    }
    
    private notifyMessage(msg, title){
        return {
            title: title,
            msg: msg,
            showClose: true,
            timeout: 5000,
            theme: "bootstrap"
        };
    }
    private parseMessage(msg){
        let m = "";
        if (typeof msg == 'object') {
            for (let i in msg) {
                m += this.parseMessage(msg[i]);
            }
        } else if (typeof msg == 'string') {
            m += msg + '<br/>';
        }
        return m;
    }
    
    private prepareMessage(msg){
        let newMessage = this.parseMessage(msg).trim();
        return newMessage.slice(0, -5);
    }
}
import { Subject }  from 'rxjs';


class NotificationService{

    constructor(){

        if(!NotificationService.instance){

            this.dispatchErrorStatus = new Subject();
            this.dispatchError$ = this.dispatchErrorStatus.asObservable();
            NotificationService.instance = this;
        }

        return NotificationService.instance;
    }

    dispatchError(error){
        this.dispatchErrorStatus.next(error);
    }
};

const notificationService = new NotificationService();
Object.freeze(notificationService);
export default notificationService;

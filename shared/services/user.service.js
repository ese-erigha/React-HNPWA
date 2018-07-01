import apiService from './api.service';

let userService = {

    getUser: (id)=>{
        return apiService.getUser(id);
    }
};

export default userService;
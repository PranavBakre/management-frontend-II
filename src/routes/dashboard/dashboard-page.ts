import { dispatchify } from "@aurelia/store-v1";
import { inject } from "aurelia";
import { logout, Action } from "store/actions";
import { IRouter } from "aurelia-direct-router"
@inject(IRouter)
export class DashboardPage {
    logoutAction = dispatchify(logout);
    router:IRouter;
    constructor(router: IRouter) {
        this.router= router;
    }
    logout = () => {
        this.logoutAction();
        this.router.load("/", {
            replace: true
        });
    }
}
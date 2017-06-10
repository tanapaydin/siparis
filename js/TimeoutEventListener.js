import AppEventRegistery from './components/utility/AppEventRegistery';
import Utility from './components/utility/index';
import { logout } from "./actions/user";
import { resetRoute } from "./actions/route";
import { closeMarketModal } from './actions/market';


class TimeoutEventListener {
    constructor() {
        this.inactiveSeconds = 0;
        this.inactiveEventFired = false;
        this.lastTickTimestamp;

        this.onAppEvent = this.onAppEvent.bind(this);
        this.tick = this.tick.bind(this);
    }

    onAppEvent(event) {
        this.inactiveSeconds = 0;
    }

    tick() {
        let now = new Date().getTime();

        if ( Utility.getReduxState().user.isLoggedIn ) {
            if ( this.inactiveEventFired ) {
                this.inactiveEventFired = false;
                this.inactiveSeconds = 0;
            } else {
                let increment = 1; //Burayi 1 yerine 0.5 yapabiliriz eger her 500 ms'de bir tick function call olacaksa.
                let elapsedSeconds = (now - this.lastTickTimestamp) / 1000;
                if ( elapsedSeconds >= 2 ) {
                    increment = elapsedSeconds;
                }
                this.inactiveSeconds += increment;
            }
        } else {
            this.inactiveSeconds = 0;
        }

        this.lastTickTimestamp = now;

        //3 dakikalik timeout sonunda kullaniciyi logout ediyoruz.
        if ( this.inactiveEventFired == false && this.inactiveSeconds > 180 ) {
            this.inactiveEventFired = true;
            let token = Utility.getReduxState().user ? Utility.getReduxState().user.token : '';
            Utility.dispatch(logout(token));
            Utility.dispatch(resetRoute()); //Login'e gider.
        }

        setTimeout(this.tick, 1000); //Burayi 1000 yerine 500ms yapabiliriz daha SIK call olsun istersek.
    }
}

var timeoutEventListener = new TimeoutEventListener();

setTimeout(function(){
    AppEventRegistery.addEventListener(timeoutEventListener);
    timeoutEventListener.lastTickTimestamp = new Date().getTime();
    timeoutEventListener.tick();
}, 2000);
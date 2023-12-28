// We don't export this class, as we want to have only one instance of it, it is exported on the bottom of this file
class Player {
    credit: number;
    bet: number;
    sound: boolean;

    constructor() {
        this.credit = 5000;
        this.bet = 0.5;
        this.sound = true;
    }

    getCredit = () => {
        return this.credit.toFixed(2);
    }

    setCredit(updatedCredit: number) {
        this.credit = updatedCredit;
    }

    getBet = () => {
        return this.bet;
    }

    setBet(updatedBet: number) {
        this.bet = updatedBet;
    }

    updateCredit() {
        if (this.credit > 0 && this.bet <= this.credit) {
            this.credit -= this.bet;

            return true;
        } else {
            // add notification error
            return false;
        }
    }

    winningPrize(winningAmount: number) {
        this.credit += winningAmount;
    }
}

const player = new Player();
export default player;
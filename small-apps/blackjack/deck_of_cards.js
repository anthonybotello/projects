class Card{
    constructor(suit,type,val){
        this.suit = suit;
        this.type = type;
        this.value = val;
    }
    show() {
        console.log(`${this.type} of ${this.suit}`);
    }
}

class Deck{
    constructor(){
        this._cards = Deck.init();
    }
    get cards(){
        return this._cards;
    }
    set cards(cards){
        this._cards = cards;
    }

    static init(){
        var cards = [];
        const suits = ["Hearts","Clubs","Diamonds","Spades"];
        const values = {"Ace":1,"Two":2,"Three":3,"Four":4,"Five":5,"Six":6,"Seven":7,"Eight":8,"Nine":9,"Ten":10,"Jack":11,"Queen":12,"King":13};
        suits.forEach(suit => {
            for (const key in values){
                cards.push(new Card(suit, key, values[key]));
            }
        });
        return cards;
    }

    shuffle() {
        let array = this.cards;
        var m = array.length, t, i;
        
        // While there remain elements to shuffle…
        while (m) {
        
            // Pick a remaining element…
            i = Math.floor(Math.random() * m--);
        
            // And swap it with the current element.
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        this.cards = array;
    }

    reset() {
        this.cards = Deck.init();
        return this;
    }

    deal() {
        return this.cards.pop();
    }
}

class Player{
    constructor(name){
        this.name = name;
        this._hand = [];
    }
    get hand(){
        return this._hand;
    }
    set hand(hand){
        this._hand = hand;
    }
    takeCard(deck){
        this.hand.push(deck.deal());
        return this;
    }
    discard(index){
        this.hand.splice(index,1);
        return this;
    }
}
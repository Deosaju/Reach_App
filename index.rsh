'reach 0.1'

const Player = {
    // Player's interface
    getHand: Fun([], UInt),
    seeOutCome: Fun([UInt], Null),
}
export const main = Reach.App(()=>{
    const Alice = Participant('Alice', {
        // specify Alices interface
        ...Player,
        
    })
    const Bob = Participant('Bob', {
        // specify Bobs interface
        ...Player,
    })
    init()
    // Write your program here
    Alice.only(() => {
        const handAlice = declassify(interact.getHand())
    })
    Alice.publish(handAlice);
    commit();
    Bob.only(() => {
        const handBob = declassify(interact.getHand())
    })
    Bob.publish(handBob);
    const outCome = (handAlice + (4 - handBob ) )% 3
    commit();

    each([Alice, Bob], () => {
        interact.seeOutCome(outCome);
    })
})
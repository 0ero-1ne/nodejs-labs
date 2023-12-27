function firstJob() {
    return new Promise((resolve, _) => {
        resolve('firstJob: Hello, World!');
    });
}

// try {
//     setTimeout(() => {
//        firstJob()
//            .then(response => console.log(response));
//     }, 2000);
// } catch(err) {
//     console.log(err);
// }

// let firstJobAsync = async () => {
//     let firstJobAwait = await firstJob()
//         .then(resolve => console.log(resolve))
//         .catch(reject => console.log(reject));
// };
// firstJobAsync();

//--------------------------------------------------------

function secondJob() {
    return new Promise((_, reject) => {
        reject('secondJob: Denied');
    })
}

// try {
//     setTimeout(() => {
//         secondJob()
//             .then(resolve => console.log(resolve));
//     }, 3000);
// } catch(err) {
//     console.log(err);
// }

// let secondJobAsync = async () => {
//     let secondJobAwait = await secondJob()
//         .then(resolve => console.log(resolve))
//         .catch(reject => console.log(reject));
// };
// secondJobAsync();

//--------------------------------------------------------

function thirdJob(data) {
    if (typeof data === 'number') {
        if (data % 2 !== 0) {
            return new Promise((resolve, _) => {
                setTimeout(() => {
                    resolve('thirdJob::resolve - data is odd');
                }, 1000);
            });
        }

        return new Promise((_, reject) => {
            setTimeout(() => {
                reject('thirdJob::reject - data is even');
            }, 2000);
        });

    }
    return new Promise((_, reject) => {
        setTimeout(() => {
            reject('thirdJob::reject - data is not number');
        }, 0);
    });

}

// try {
//     thirdJob(1)
//         .then(resolve => console.log(resolve))
//         .catch(reject => console.log(reject));
// } catch (error) {
//     console.log(error);
// }

// let thirdJobAsync = async (param) => {
//     let thirdJobAwait = await thirdJob(param)
//         .then(resolve => console.log(resolve))
//         .catch(reject => console.log(reject));
// };
// thirdJobAsync(2);


//--------------------------------------------------------

function validateCard(cardNumber) {
    console.log('Card number: ' + cardNumber);
    
    if (Math.random() > 0.5) {
        return true;
    }

    return false;
}

function proceedToPayment(orderId) {
    console.log('Order ID: ' + orderId);

    if (Math.random() > 0.5) {
        return new Promise((resolve, _) => {
            resolve('Payment Successfull');
        }); 
    }    

    return new Promise((_, reject) => {
        reject('Payment Failed');
    });
}

function createOrderTry(cardNumber) {
    let isCardValidated = validateCard(cardNumber);
    let orderId = 'id-387458375';

    try {
        if (isCardValidated) {
            proceedToPayment(orderId)
                .then(resolve => console.log(resolve));
        } else {
            console.log('Card is not valid');
        }
    }
    catch(error)
    {
        console.log(error);
    }
}

async function createOrderAsync(cardNumber) {
    let isCardValidated = validateCard(cardNumber);
    let orderId = 'id-387458375';

    let result = await proceedToPayment(orderId)
        .then(resolve => console.log(resolve))
        .catch(reject => console.log(reject));
}

// createOrderTry('1234 5678 9012 3456');
// createOrderAsync('1234 5678 9012 3456');

//--------------------------------------------------------

function squareNumber(number) {
    if (typeof number !== 'number') {
        return new Promise((_, reject) => reject('squareNumber: Wrong type'));
    }
    
    return new Promise((resolve, _) => setTimeout(resolve, 2500, number ** 2));
}

function cubeNumber(number) {
    if (typeof number !== 'number') {
        return new Promise((_, reject) => reject('cubeNumber: Wrong type'));
    }
    
    return new Promise((resolve, _) => setTimeout(resolve, 2500, number ** 3));
}

function fourthNumber(number) {
    if (typeof number !== 'number') {
        return new Promise((_, reject) => reject('fourthNumber: Wrong type'));
    }
    
    return new Promise((resolve, _) => setTimeout(resolve, 2000, number ** 4));
}

// Promise.all([squareNumber(2), cubeNumber(2), fourthNumber(3)])
//     .then(values => console.log(values))
//     .catch(error => console.log(error));

// Promise.race([squareNumber(2), cubeNumber(2), fourthNumber(3)])
//     .then(value => console.log(value))
//     .catch(error => console.log(error));

// Promise.any([squareNumber(''), cubeNumber(2), fourthNumber('g')])
//     .then(value => console.log(value))
//     .catch(error => console.log(error));

//--------------------------------------------------------

function f1() {
    console.log('f1');
}

function f2() {
    console.log('f2');
}

function f3() {
    console.log('f3');
}

function main() {
    console.log('main');

    setTimeout(f1, 50);
    setTimeout(f3, 30);

    new Promise((resolve, _) => {
        resolve('I am a Promise, rigth after f1 and f3! Really?');
    }).then(resolve => console.log(resolve));

    new Promise((resolve, _) => {
        resolve('I am a Promise after Promise!')
    }).then(resolve => console.log(resolve));

    f2();
}

main();
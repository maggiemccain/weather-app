var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Arguements must be numbers');
            }
        }, 1000);
    })
};

asyncAdd(2, '5').then((res) => {
    console.log(`Result: ${res}`)
    return asyncAdd(res, 10);
}).then((res) => {
    console.log('Should be 17! ', res)
}).catch((errorMessage) => { //use catch as one error handler for all potential errors
    console.log(errorMessage);
});

var somePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Hey. It worked.');
        // reject('Unable to fullfill promise');
    }, 1500);
});

somePromise.then((msg) => { //callback for both success and failure
    console.log(`Succcess! ${msg}`);
}, (errorMessage) => { //handles error
    console.log(`Error! ${errorMessage}`);
}) 
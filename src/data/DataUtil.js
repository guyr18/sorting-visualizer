
// GenerateRandomNumberSet(n, m) returns an array A of n numbers 
// from [1..m] where x is an element of A. Each element x is
// unique. 
//
// Time complexity: O(n)
// Space complexity: O(n)
const generateRandomNumberSet = (n, m) => 
{

    let dataMap = {};
    let A = [];
    let i = 0;

    // Iterate until we fill A with n random numbers.
    while(i < n)
    {

        let prevNum = i > 0 ? A[i - 1] : undefined; // Check if a previous number exists.
        let temp = Math.ceil(Math.random() * m); // Generate random number from [1..m].

        // If prevNum is undefined, this is the first number generated, so any number is fine.
        if(prevNum == undefined)
        {

            A.push(temp); // Add to array.
            dataMap[temp] = true; // Add a key for this number so we can check for uniqueness as we build the array.
            i++;
            continue;

        }

        // If an identical number is generated or this number is not unique, we just re-run the loop.
        if(temp == prevNum || dataMap[temp] != undefined) { continue; }

        A.push(temp); // Add to array.
        dataMap[temp] = true; // Add a key for this number so we can check for uniqueness as we build the array.
        i++;

    }

    let isSorted = true;

    // Verify that this array is not sorted; it is not likely, however the possibility exists.
    for(let j = 1; j < A.length; j++)
    {

        if(A[j] < A[j - 1])
        {

            isSorted = false;
            break;

        }

    }

    // Generate another number set if this one is sorted otherwise take our valid number set.
    return isSorted ? generateRandomNumberSet(n, m) : A;

}

// GetDeepCopy(source) creates a deep copy by copying the contents of array source and returning an array target.
const getDeepCopy = (source) =>
{

    let target = [];

    for(let i = 0; i < source.length; i++)
    {

        target.push(source[i]);

    }

    return target;

}

// SleepFunc(ms) blocks the current thread for ms milliseconds.
const sleepFunc = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

// NAMED EXPORTS
export const randomNumbers = generateRandomNumberSet;
export const deepCopy = getDeepCopy;
export const sleep = sleepFunc;
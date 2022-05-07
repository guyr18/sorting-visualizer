// SelectCorrectAlgorithm(sortMethod, data) takes a string sortMethod and invokes the corresponding
// sorting algorithm function by passing it an array of integers, data.
function selectCorrectAlgorithm(sortMethod, data)
{

    let firstChar = sortMethod.charAt(0).toLowerCase();

    if(firstChar == "b")
    {

        return bubblesort(data);

    }
    else if(firstChar == "s")
    {

        return selectionsort(data);

    }
    else if(firstChar == "i")
    {

        return insertionsort(data);

    }
}

// BubbleSort(A) performs the bubble sort algorithm on an array A.
// It returns a two-element array containing [A', S] where A'
// is the sorted array and S is a list of re-traceable steps
// that are used to visualize the array sorting process.
function bubblesort(A)
{

    let S = [];
    let n = A.length;

    for(let i = 0; i < n - 1; i++)
    {

        for(let j = 0; j < n - i - 1; j++)
        {

            let obj = {left: j, right: j + 1, swapped: A[j] > A[j + 1]};

            if(A[j] > A[j + 1])
            {

                let temp = A[j];
                A[j] = A[j + 1];
                A[j + 1] = temp;

            }

            S.push(obj);

        }

        S.push({markStep: true, index: n - i - 1});

    }

    S.push({markStep: true, index: 0});
    return [A, S];

}

// SelectionSort(A) performs the selection sort algorithm on an array A.
// It returns a two-element array containing [A', S] where A'
// is the sorted array and S is a list of re-traceable steps
// that are used to visualize the array sorting process.
function selectionsort(A)
{

    let S = [];
    let n = A.length;

    for(let i = 0; i < n - 1; i++)
    {

        let minIndex = i;

        for(let j = i + 1; j < n; j++)
        {

            S.push({left: j, right: minIndex, swapped: false});

            if(A[j] < A[minIndex])
            {

                minIndex = j;

            }
        }

        let temp = A[minIndex];
        A[minIndex] = A[i];
        A[i] = temp;
        S.push({left: i, right: minIndex, swapped: true});
        S.push({markStep: true, index: i});

    }

    S.push({markStep: true, index: n - 1});
    return [A, S];
}

// SelectionSort(A) performs the selection sort algorithm on an array A.
// It returns a two-element array containing [A', S] where A'
// is the sorted array and S is a list of re-traceable steps
// that are used to visualize the array sorting process.
function insertionsort(A)
{

    let S = [];
    let n = A.length;

    for(let i = 1; i < n; i++)
    {

        let key = A[i];
        let j = i - 1;

        while(j >= 0 && A[j] > key)
        {

            S.push({left: j + 1, right: j, swapped: true});
            A[j + 1] = A[j];
            j = j - 1;

        }

        A[j + 1] = key;

    }


    for(let k = 0; k < n; k++)
    {

        S.push({markStep: true, index: k});

    }

    return [A, S];

}

export const SelectCorrectAlgorithm = selectCorrectAlgorithm;
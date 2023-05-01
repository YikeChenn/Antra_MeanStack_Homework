// Q1
const Q1 = x => {
    return +((x * Math.sign(x)).toString().split('').reverse().join('')) * Math.sign(x)
}

// Q2
const Q2 = str => {
    return str.trim() == str.trim().split('').reverse().join('')
}

// Q3
const Q3 = str => {
    const length = str.length
    let ans = ''
    for(let i = 0; i < length - 1; ++i){
        for(let j = i + 1; j <= length; ++j){
            ans += str.slice(i, j) + ', '
        }
    }
    return ans += str[length - 1]
}

// Q4
const Q4 = str => {
    return str.split('').sort(
        (a, b) => {
            if(a.toUpperCase() < b.toUpperCase()) return -1
            else if(a.toUpperCase() > b.toUpperCase()) return 1
            else{
                if(a < b) return -1
                else if(a > b) return 1
                else return 0
            }
        }
    ).join('')
}

// Q5
const Q5 = str => {
    const arr = str.split(' ')
    arr.forEach((ele, index, arr) => {
        arr[index] = ele.replace(ele[0], ele[0].toUpperCase())
    })
    return arr.join(' ')
}

// Q6
const Q6 = str => {
    const arr = str.split(' ')
    arr.sort((a, b) => {
        return b.length - a.length
    })
    return arr[0]
}

// Q7
const Q7 = str => {
    str.trim()
    let ans = 0
    for(let i of str){
        if(i == 'a' || i == 'e' || i == 'i' || i == 'o' || i == 'u' ||i == 'A' || i == 'E' || i == 'I' || i == 'O' || i == 'U') ++ans
    }
    return ans
}

// Q8
const Q8 = num => {
    if(num == 2 || num == 3) return true
    else if(num > 0 && (num % 6 == 1 || num % 6 == 5)){
        let sqr = Math.sqrt(num)
        for(let i = 2; i <= sqr; ++i){
            if(num % i == 0) return false
        }
        return true
    }
    else return false
}

// Q9
const Q9 = arg => typeof(arg)

// Q10
const Q10 = n => {
    const ans = []
    if(n < 1) return ans
    for(let i = 0; i < n; i++){
        const sub = []
        for(let j = 0; j < n; j++){
            sub.push(1)
        }
        ans.push(sub)
    }
    return ans
}

// Q11
const Q11 = arr => {
    arr.sort((a, b) => a - b)
    return [arr[1], arr[arr.length - 2]]
}

// Q12
const Q12 = num => {
    if(num <= 1) return false
    let sqrt = Math.sqrt(num)
    let per = 1
    for(let i = 2; i <= sqrt; ++i){
        if(i == sqrt) per += i
        else if(num % i == 0) per += i + num / i
    }
    return per == num
}

// Q13
const Q13 = num => {
    let sqrt = Math.sqrt(num)
    const ans = []
    for(let i = 1; i <= sqrt; ++i){
        if(num % i == 0){
            ans.push(i)
            if(i != sqrt) ans.push(num / i)
        }
    }
    return ans.sort((a, b) => a - b)
}

// Q14
const Q14 = (amount, coins) => {
    coins.sort((a, b) => b - a)
    const ans = []
    for(let i = 0; i < coins.length; ++i){
        while(amount - coins[i] >= 0){
            ans.push(coins[i])
            amount -= coins[i]
        }
    }
    return ans
}

// Q15
const Q15 = (b, n) => b ** n

// Q16
const Q16 = str => {
    const set_str = new Set(str.split(''))
    return [...set_str].join('')
}

// Q17
const Q17 = str => {
    const obj = {}
    for(let letter of str){
        if(letter.match(/^[A-Za-z]+$/)){
            if(obj[letter]) obj[letter]++
            else obj[letter] = 1
        }
    }
    return obj
}

// Q18
const Q18 = (arr, num) => {
    arr.sort((a, b) => a - b)
    let left = 0, right = arr.length - 1
    while(left < right){
        let mid = Math.floor((left + right) / 2)
        if(num > arr[mid]) left = mid + 1
        else if (num < arr[mid]) right = mid - 1
        else return true
    }
    return false
}

// Q19
const Q19 = (arr, num) => {
    return arr.filter(ele => ele > num)
}

// Q20
const Q20 = (char_list, length) => {
    const char_arr = char_list.split('')
    char_arr.push('')
    let char_length = char_arr.length
    let ans = ''
    for(let i = 0; i < length; ++i){
        ans += char_arr[Math.floor(char_length * Math.random())]
    }
    return ans
}

// Q21
const Q21 = (arr, length) => {
    const ans = []
    function Q21_DFS (array, len, index, sub){
        if(sub.length == len){
            ans.push([...sub])
            return
        }
        for(let i = index; i < array.length; ++i){
            sub.push(array[i])
            Q21_DFS(array, len, i + 1, sub)
            sub.pop()
        }
    }
    Q21_DFS(arr, length, 0, [])
    return ans
}

// Q22
const Q22 = (str, letter) => {
    let ans = 0
    for(let i of str){
        if (i == letter) ans++
    }
    return ans
}

// Q23
const Q23 = str => {
    const arr = str.split('')
    const length = arr.length
    for(let ele1 of arr){
        let count = 0
        for(let ele2 of arr){
            if(ele1 == ele2) count++
        }
        if(count < 2){
            return ele1
        }
    }
    return 'There is no non-repeated character.'
}

// Q24
const Q24 = arr => {
    let length = arr.length
    for(let i = 0; i < length; ++i){
        for(let j = 0; j < length - i - 1; j++){
            if(arr[j] < arr[j + 1]){
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            }
        }
    }
    return arr
}

// Q25
const Q25 = arr => {
    arr.sort((a, b) => {
        if(a.length > b.length) return -1
        else if(a.length < b.length) return 1
        else return 0
    })
    return arr[0]
}

// Q26
const Q26 = str => {
    return [...new Set(str.split(''))].join('')
}

// Q27
const Q27 = str => {
    const isPalindrome = string => string == string.split('').reverse().join('')
    let max_length = 0
    ans = ''
    for(let i = 0; i < str.length; ++i){
        let substring = str.substr(i, str.length)
        for(let j = substring.length; j >= 0; j--){
            let sub = substring.substr(0, j)
            if(sub.length <= 1) continue
            if(isPalindrome(sub) && sub.length > max_length){
                max_length = sub.length
                ans = sub
            }
        }
    }
    return ans
}

// Q28
const Q28 = callback_func => 'The function is ' + callback_func.name

// Q29
const Q29 = func => func.name
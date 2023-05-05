// set url
const Api = (() => {
    const url = "https://random-word-api.herokuapp.com/word"
    return{
        url
    }
})()

const View = (() => {
    let domSelector = {
        guessCount: '#flexbox_guessCount_text',
        guessWord: '#flexbox_guessWord_text',
        input: '#flexbox_input_box',
        newGameButton: '#flexbox_newGame_button'
    }

    // Create new word and return an array of each character
    const createWord = str => {
        let word = str
        let array = word.split('')
        let _count = 0
        array.forEach((ele, index, Arr) => {
            if(_count < Math.floor(word.length * 0.5) && Math.random() - 0.5 > 0){
                Arr[index] = '_'
                _count++
            }
        })
        return array
    }

    // Change the element in HTML
    const render = (ele, temp) => {
        ele.innerHTML = temp
    }

    return{
        domSelector,
        createWord,
        render
    }
})()

const Model = ((api, view) => {
    const {domSelector, createWord, render} = view
    const {url} = api

    // Class
    class GuessGame{
        constructor(){
            this.chanceCount = 0
            this.word = []
            this.displayWord = []
            this.guessSuccess = 0
        }

        // Get success time
        get getSuccess(){
            return this.guessSuccess
        }

        // Set new word
        set setWord(newWord){
            this.word = newWord[0].split('')
            let wordContainer = document.querySelector(domSelector.guessWord)
            this.displayWord = createWord(newWord[0])
            render(wordContainer, this.displayWord.join(' '))
            console.log(this.word)
        }

        // Change guess word if guess right
        guessWord(input){
            let changed = false
            let wordContainer = document.querySelector(domSelector.guessWord)
            this.displayWord.forEach((ele, index, arr) => {
                if(ele == '_' && input == this.word[index]){
                    arr[index] = this.word[index]
                    changed = true
                }
            })
            render(wordContainer, this.displayWord.join(' '))
            return changed
        }

        // Change guess chance if guess right
        set setChance(changed){
            if(!changed){
                this.chanceCount++
                let chanceContainer = document.querySelector(domSelector.guessCount)
                render(chanceContainer, `${this.chanceCount} / 10`)
            }
        }
    }

    return{
        GuessGame,
        url
    }
})(Api, View)

const Controller = ((view, model) => {
    const {domSelector, createWord, render} = view
    const {GuessGame, url} = model

    const newGame = new GuessGame()
    // Initialize
    const init = () => {
        let response = fetch(url)
        response.then((res) => res.json()).catch().then((data) => {
            newGame.setWord = data
        })        
        newGame.chanceCount = 0
        render(document.querySelector(domSelector.guessCount), newGame.chanceCount + ' / 10')
        document.querySelector(domSelector.input).value = ''
    }

    // Judge if the input is right and if there is chance to guess
    const answer_guess = () => {
        const userInput = document.querySelector(domSelector.input)
        addEventListener('keydown', (event) => {
            if(event.key == "Enter"){
                if(userInput != ''){
                    let changed = newGame.guessWord(userInput.value)
                    newGame.setChance = changed
                    userInput.value = ''
                }
                if(newGame.word.join('') == newGame.displayWord.join('')){
                    fetch(url).then((res) => res.json()).catch().then((data) => {
                        newGame.setWord = data
                    })
                    newGame.guessSuccess++
                }
                if(newGame.chanceCount >= 10){
                    window.alert('Game Over! You have guessed ' + newGame.getSuccess + ' words!')
                    init()
                }
            }
        })
    }

    // Set new game
    const renewGame = () => {
        const btn = document.querySelector(domSelector.newGameButton)
        btn.addEventListener('click', () => {
            fetch(url).then((res) => res.json()).catch().then((data) => {
                newGame.setWord = data
            })
            newGame.chanceCount = 0
            render(document.querySelector(domSelector.guessCount), newGame.chanceCount + ' / 10')
            document.querySelector(domSelector.input).value = ''
        })
    }



    const bootstrap = () => {
        init()
        answer_guess()
        renewGame()
    }

    return{
        bootstrap
    }

})(View, Model)

Controller.bootstrap()
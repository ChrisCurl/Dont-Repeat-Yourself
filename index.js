//fade in body
document.body.classList.remove('fade-out');

let list = document.querySelector('ul'), bookSelected, top10 = [], top10NumArr = [], top10WordsArr = [], bookText, wordObject = {}, lowestVal = 1, min, minPos = 0, counter = 0;

// hide site description
toggleDescription();

// hide book header
    let wordsHeader  = document.querySelector('.wordsHeader');
    wordsHeader.classList.add('noDisplay');
// generate book grid
books.forEach(function(item){
    let title = item['name'];
    let div = document.createElement('div');
    div['className'] = "book";
    div.setAttribute('id', title);
    div['innerHTML'] = '<p>'+ title +'</p>'+ '<img src ="'+item.image+'">';
    list.append(div);

// begin back end logic
    div.addEventListener('click', function(){
        resetAll();
        bookSelected = this['id'];
        bookSelect();
        countWords(bookText);
        top10func();
        top10sort();
        top10Display();
        console.log(top10);
    });
});

//reset function
function resetAll(){
    if (top10.length == 10) {
        top10 = [];
        top10NumArr = [];
        top10WordsArr = [];
        bookText = '';
        wordObject = {};
        lowestVal = 1;
        min;
        minPos = 0;
        counter = 0;
    }
}

//word counting logic
function countWords(){
          let wordsArr = bookText.split(' ');
          wordsArr.forEach(function(word){
             if (word.length >4){
                 if (!wordObject.hasOwnProperty(word) && (word.length>1)){
                 wordObject[word] = 1;
             } else {
                 wordObject[word] ++;
             } 
             }
          });
}

//top 10 word logic
function top10func(){        
    Object.keys(wordObject).forEach(function(word){
        if (top10.length<10){
            top10Generate()
            top10NumsGenerate(word);
            setMin();
            getPos();
            top10WordsSet();
        } else {
            top10Update(word);
            setMin();
            getPos();
            top10WordsSet();
            bookHeaderDisplay();
        }
    });
    //iterate over 10 number arrary , find lowest number , find position in array of lowest number , compare new item number with lowest value
    // if new item is greate than lowest value then replace array.[lowe value] with new item
}

//top 10 order by function
function top10sort(){
    top10.sort(function(a, b){
        return b.count - a.count
    });
}


//get text from selected book
function bookSelect(){
    books.forEach(function(book){
     if (book['name'] == bookSelected) {
         bookText = book['textURL'];
         quoteFilter(bookText);
     }
 });
}

//filter out ' and " from book string
function quoteFilter(string){
    string.replace(/['"]+/g, '');
}

// pull text from fake api
// This will be used in a future release pull data from a books API
function getText(bookURL){
    fetch(bookURL, {
        method: 'GET'
    }).then(function(response){
        return response.json();
    }).then(function(responseAsJson){
        console.log(responseAsJson.text_out);
    })
}

//generate first 10 words aray of objects
function top10Generate(){
    let tempArr = Object.keys(wordObject);
            for(let i=0;i<10;i++){
            top10.push({word: tempArr[i], count: wordObject[tempArr[i]]});
        }
}

//generate first 10 in Nums array
function top10NumsGenerate(){
    top10.forEach(function(word){
            top10NumArr.push(word['count']);
    });
}

//generate top10 words only array 
function top10WordsSet(){
    top10.forEach(function(item){
        top10WordsArr.push(item['word']);
    })
}

//top10 Update function
function top10Update(word){
    if (wordObject[word] > min && (top10WordsArr.indexOf(word) == -1)) {
        top10[minPos] = {
          word: word,
          count: wordObject[word]
          }
          top10NumArr[minPos] = wordObject[word];
    } else {
        // console.log(word + ' is less than min of ' + min);
        }
}

// set min number
function setMin(){
    min = Math.min(...top10NumArr);
}

// get position of min number
function getPos(){
    minPos = top10NumArr.indexOf(min);
}

//display top 10 words
function top10Display(){
    let ol = document.querySelector('.top10');
    ol.innerHTML = '';
    top10.forEach(function(item){
        let li = document.createElement('li');
        li.innerHTML = item['word'] + " " + item['count'];
        li.classList.add('centerLi');
        // add li at interval
        setTimeout(function(){
           ol.append(li);
        fadeIn(li) 
        }, 100)
        
    });

}

//fade in ol function
function fadeIn(thing){
    setTimeout(function(){
        thing.classList.add('show');
    }, 100);
}

//display book header
function bookHeaderDisplay(){
    document.querySelector('.bookName').textContent = bookSelected;
    document.querySelector('.wordsNum').textContent = Object.keys(wordObject).length;
    wordsHeader.classList.remove('noDisplay');
    wordsHeader.classList.add('display');
}

// toggle description function
function toggleDescription(){
    let description = document.querySelector('.description');
    let flag = false;
    document.querySelector('.mainHeader').addEventListener('click', function(){
    if (flag == false) {
        description.classList.remove('fadeOut');
        description.classList.add('fadeIn');
        flag = true;
    } else {
        description.classList.remove('fadeIn');
        description.classList.add('fadeOut');
        flag = false;
    }
    console.log(flag);
});
}


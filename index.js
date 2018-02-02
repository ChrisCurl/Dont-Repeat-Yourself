let books =  [{
    name: 'don quixote',
    image: "https://images-na.ssl-images-amazon.com/images/I/41d-rugLMRL._SL160_.jpg",
    text: dqText
}, {
    name: 'lost time',
    image: "https://images-na.ssl-images-amazon.com/images/I/51me-a8zgcL._SL160_.jpg",
    text:  'sample text'

}, {
    name: 'ulysses',
    image: "https://images-na.ssl-images-amazon.com/images/I/51h6FygcbxL._SL160_.jpg",
    text: 'sample text'
}, {
    name: 'odyssey',
    image: "https://images-na.ssl-images-amazon.com/images/I/51cUwb0DUPL._SL160_.jpg",
    text: 'sample text'
},  {    
    name: 'lolita',
    image: "https://images-na.ssl-images-amazon.com/images/I/510UE7bvHoL._SL160_.jpg",
    text: 'sample text'
}, {
    name: 'iliad',
    image: "http://ecx.images-amazon.com/images/I/512j6byhjvL._SL160_.jpg",
    text: 'sample text'
}];

let list = document.querySelector('ul');
let bookSelected;
let top10 = Array(10);

// generate book grid
books.map(function(item){
    let title = item['name'];
    let div = document.createElement('div');
    div['className'] = "book";
    div.setAttribute('id', title);
    div['innerHTML'] = '<p>'+ title +'</p>'+ '<img src ="'+item.image+'">';
    list.append(div);
    div.addEventListener('click', function(){
        bookSelected = this['id'];
//callback for word counting function
        countWords();
    });

});

//word counting logic
function countWords(){
    books.map(function(item){
        if (item['name'] === bookSelected) {
          let words = item.text.split(' ');
          let wordObject = {};
          words.forEach(function(word){
             if (!wordObject.hasOwnProperty(word)){
                 wordObject[word] = 1;
             } else {
                 wordObject[word] ++;
             }
          });
          console.log(wordObject);
          
        } 
    });
}

let dqText = fetch()
